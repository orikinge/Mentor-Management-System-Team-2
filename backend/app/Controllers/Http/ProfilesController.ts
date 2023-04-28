import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class ProfilesController {
  async getByUserId({ auth, response }: HttpContextContract) {
    try {
      if (auth.user?.id) {
        const userId = auth.user?.id
        const profile = await User.query().where('id', userId).whereNull('deleted_at').firstOrFail()

        return profile
      }
    } catch (error) {
      response.badRequest({ message: `invalid user`, status: 'Error' })
    }
  }

  async update({ auth, request, response }: HttpContextContract) {
    try {
      if (auth.user?.id) {
        const userId = auth.user?.id
        const profile = await User.findOrFail(userId)
        const updateProfile = request.body()
        profile.merge(updateProfile)

        profile.save()

        return profile
      }
    } catch (error) {
      response.badRequest({ message: `invalid user`, status: 'Error' })
    }
  }

  async delete({ params, response }: HttpContextContract) {
    try {
      const profile = await User.findOrFail(params.userId)
      profile.deletedAt = DateTime.local()

      profile.save()
    } catch (error) {
      response.badRequest({ message: `invalid userId: ${params.userId}`, status: 'Error' })
    }
  }

  async search({ request, response }: HttpContextContract) {
    const query = request.input('query')

    const res = await User.query()
      .whereLike('first_name', `%${query.replaceAll("'", '')}%`)
      .orWhereLike('last_name', `%${query.replaceAll("'", '')}%`)
      .select('*')

    return response.ok(res)
  }
}
