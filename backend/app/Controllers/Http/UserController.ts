import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class AuthenticationController {
  public async getAllUsers({ auth, request, response }: HttpContextContract) {
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

  public async getAllMentors({ auth, response }: HttpContextContract) {
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

  public async getAllMentorManagers({ auth, response }: HttpContextContract) {
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
}
