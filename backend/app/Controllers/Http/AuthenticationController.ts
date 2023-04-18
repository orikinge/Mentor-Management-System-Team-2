import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail'
import Token from 'App/Models/Token'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthenticationController {
  async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.body()
      const token = await auth.attempt(email, password)
      return { token, user: await auth.user }
    } catch (error) {
      response.unauthorized({ message: 'Invalid Credentials', status: 'Error', error })
    }
  }

  async forgetPassword({ request }: HttpContextContract) {
    try {
      const { email } = request.body()
      const user = await User.findByOrFail('email', email)
      const token = await Token.updateOrCreate(
        { userId: user?.id, type: 'forget_password' },
        {
          userId: user?.id,
          type: 'forget_password',
          expiresAt: DateTime.now().plus({ hour: 1 }),
          code: nanoid(),
        }
      )
      const url = `${Env.get('FRONTEND_URL')}?token=${token.toJSON().code}`
      await Mail.send((message) => {
        message.from('MMM2@example.com').to(email).subject('Welcome Onboard!')
          .html(`Hello ${user?.name}\n
          Use the link below to reset your password ${url}`)
      })
      return token
    } catch (error) {}
    return { message: 'Password reset token as been sent to your email' }
  }

  async resetPassword({ request, response }: HttpContextContract) {
    try {
      const token = request.qs().token
      const { password } = request.only(['password'])

      const tokenRes = await Token.findByOrFail('code', token)
      if (tokenRes.type !== 'forget_password') {
        throw new Error('Invalid token')
      }
      if (tokenRes.expiresAt < DateTime.now()) {
        throw new Error('Token is expired')
      }

      const user = await User.findOrFail(tokenRes.userId)
      user.password = password
      await user.save()

      await tokenRes.delete()

      return { message: 'Password reset successful' }
    } catch (error) {
      return response.status(400).send({ message: error.message })
    }
  }

  async redirectToGoogle({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  async googleLogin({ auth, ally, response }: HttpContextContract) {
    try {
      const google = ally.use('google')
      if (google.accessDenied()) {
        return 'Access was denied'
      }

      if (google.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      if (google.hasError()) {
        return google.getError()
      }

      const googleUser = await google.user()
      const user = await User.findByOrFail('email', googleUser.email)
      const token = await auth.use('api').generate(user, {
        expiresIn: '30 days',
      })

      return { token, user: await auth.user }
    } catch (error) {
      response.unauthorized({ message: 'Invalid Credentials', status: 'Error', error })
    }
  }
}
