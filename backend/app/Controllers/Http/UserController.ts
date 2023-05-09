import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { nanoid } from 'nanoid'
import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'

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

  async inviteUser({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }

    try {
      const { email, firstName, lastName, roleId } = request.only([
        'email',
        'firstName',
        'lastName',
        'roleId',
      ])
      const password = 's'
      const inviteCode = nanoid()
      const user = await User.findBy('email', email)

      if (user) throw new Error('User already exist')

      const newUser = new User()
      newUser.fill({ email, firstName, lastName, roleId, inviteCode, password })
      newUser.save()

      const url = `${Env.get('FRONTEND_URL_INVITATION')}?invitation=${inviteCode}`

      await Mail.send((message) => {
        message
          .from('MMM2@example.com')
          .to(email)
          .subject(`You've been invited to mentor aspiring professionals`)
          .html(
            `Hello ${firstName},\n I hope this email finds you well. We are excited to invite you to join our mentorship program. \n \n  If you're interested in becoming a mentor, please click on the following link to accept the invitation: ${url}`
          )
      })

      response.accepted({ message: 'invitation link successfully send' })
    } catch (error) {
      response.badRequest({ message: `${error}` })
    }
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
