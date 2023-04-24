import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class AuthenticationController {
  public async getAllMentors({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const mentors = await User.query()
      .where('roleId', Roles.MENTOR)
      .select(['id', 'firstName', 'lastName'])
    return mentors
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
    return mentorManagers
  }
}
