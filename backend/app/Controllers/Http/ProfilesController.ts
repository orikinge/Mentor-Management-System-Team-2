import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { schema } from '@ioc:Adonis/Core/Validator'

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
        const payload = await request.validate({
          schema: schema.create({
            profileImagePath: schema.file.optional({
              size: '2mb',
              extnames: ['jpg', 'png'],
            }),
            bio: schema.string.optional(),
            website: schema.string.optional(),
            city: schema.string.optional(),
            country: schema.string.optional(),
            socialMediaLinks: schema.string.optional(),
          }),
        })

        profile.bio = payload.bio ?? profile.bio
        profile.website = payload.website ?? profile.website
        profile.city = payload.city ?? profile.city
        profile.country = payload.country ?? profile.country
        profile.socialMediaLinks = payload.socialMediaLinks ?? profile.socialMediaLinks

        if(payload.profileImagePath){
          const profileImage = request.file('profileImagePath')
          await profileImage?.moveToDisk('upload_file')
          profile.profileImagePath = profileImage?.fileName ?? profile.profileImagePath
        }

        await profile.save()

        return response.ok({ status: 'success', message: 'Profile successfully updated', profile })
      }
    } catch (error) {
      response.badRequest({ message: `invalid user`, status: `${error}` })
    }
  }

  async delete({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
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

    const res = await User.query().where((queryBuilder) => {
      queryBuilder
        .whereRaw('lower(first_name) like ?', [`%${query.toLowerCase()}%`])
        .orWhereRaw('lower(last_name) like ?', [`%${query.toLowerCase()}%`])
    })

    return response.ok(res)
  }
}
