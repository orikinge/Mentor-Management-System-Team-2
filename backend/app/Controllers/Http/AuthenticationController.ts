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
      const url = `${Env.get("FRONTEND_URL")}?token=${token.toJSON().code}`
      await Mail.send((message) => {
        message
          .from('MMM2@example.com')
          .to(email)
          .subject('Welcome Onboard!')
          .html(`Hello ${user?.name}\n
          Use the link below to reset your password ${url}`)
      })
      return token
    } catch (error) {}
    return { message: 'Password reset token as been sent to your email' }
  }
}
