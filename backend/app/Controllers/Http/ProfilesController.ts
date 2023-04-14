import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class ProfilesController {
  async getByUserId({ params, response }: HttpContextContract) {
    try {
      const profile = await User.query()
        .where('id', params.userId)
        .whereNull('deleted_at')
        .firstOrFail()

      return profile
    } catch (error) {
      response.badRequest({ message: `invalid userId: ${params.userId}`, status: 'Error' })
    }
  }

  async update({ params, request, response }: HttpContextContract) {
    try {
      const profile = await User.findOrFail(params.userId)
      const updateProfile = request.body()
      profile.merge(updateProfile)

      profile.save()

      return profile
    } catch (error) {
      console.log(error)
      response.badRequest({ message: `invalid userId: ${params.userId}`, status: 'Error' })
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
}
