import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'
import { schema } from '@ioc:Adonis/Core/Validator'
import Document from 'App/Models/Document'

export default class AuthenticationController {
  async getAllUsers({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }

    const { page, limit, search } = request.qs()

    let query = User.query()

    if (search) {
      query = query.where((builder) => {
        builder.where('firstName', 'like', `%${search}%`).orWhere('lastName', 'like', `%${search}%`)
      })
    }

    const users = await query.paginate(page, limit)

    return { status: 'success', message: 'Fetched all user successful', users }
  }

  async getAllMentors({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const mentors = await User.query()
      .where('roleId', Roles.MENTOR)
      .select(['id', 'firstName', 'lastName'])
    return { status: 'success', message: 'Fetched all mentors successful', mentors }
  }

  async getAllMentorManagers({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const mentorManagers = await User.query()
      .where('roleId', Roles.MENTOR_MANAGER)
      .select(['id', 'firstName', 'lastName'])
    return { status: 'success', message: 'Fetched all mentor mangers successful', mentorManagers }
  }

  async getAboutUser({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const users = await User.query()
        .where('id', params.userId)
        .preload('technicalProficiencies')
        .preload('previousPrograms')
        .preload('previousRoles')
        .preload('documents')
        .exec()

      const result = users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        meta: user.meta,
        bio: user.bio,
        profileImagePath: user.profileImagePath,
        socialMediaLink: user.socialMediaLinks,
        roleId: user.roleId,
        website: user.website,
        country: user.country,
        programOfInterest: user.programOfInterest,
        beenAMentor: user.beenAMentor,
        technicalProficiencies: user.technicalProficiencies?.map((proficiency) => ({
          id: proficiency.id,
          stack: proficiency.proficiency,
        })),
        previousPrograms: user.previousPrograms?.map((program) => ({
          id: program.id,
          program: program.previousProgram,
        })),
        previousRoles: user.previousRoles?.map((role) => ({
          id: role.id,
          role: role.previousRole,
        })),
        documents: user.documents?.map((document) => ({
          id: document.id,
          document: document.imageUrl,
        })),
      }))

      return response.status(200).json({
        status: 'success',
        message: 'About user fetched successfully',
        result,
      })
    } catch (error) {
      return response.status(500).send({ message: 'Error fetching user.' })
    }
  }
}
