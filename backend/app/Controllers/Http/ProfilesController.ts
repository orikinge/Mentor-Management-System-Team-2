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
        delete updateProfile['email']
        delete updateProfile['roleId']
        profile.merge(updateProfile)

        profile.save()

        return profile
      }
    } catch (error) {
      response.badRequest({ message: `invalid user`, status: 'Error' })
    }
  }

  async delete({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if(!user || !user.isAdmin) {
      response.unauthorized({message: 'You are not authorized to access this resource.'})
      return
    }
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
    .where((queryBuilder) => {
      queryBuilder
        .whereRaw('lower(first_name) like ?', [`%${query.toLowerCase()}%`])
        .orWhereRaw('lower(last_name) like ?', [`%${query.toLowerCase()}%`])
    })

    return response.ok(res)
  }
}
