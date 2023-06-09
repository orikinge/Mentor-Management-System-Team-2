import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Program from 'App/Models/Program'

export default class RequestController {
  async getPendingRequest({ auth, response }: HttpContextContract) {
    const user = auth.user!

    if (!user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const mentorManagers = await User.query()
        .where('role_id', 3)
        .where('is_approved', false)
        .exec()

      const mentorManagersCount = mentorManagers.length

      const mentors = await User.query().where('role_id', 2).where('is_approved', false).exec()

      const mentorsCount = mentors.length

      const programs = await Program.query().where('is_approved', false).exec()

      const programsCount = programs.length

      const recentRequests = await User.query()
        .orWhere('roleId', 2)
        .orWhere('roleId', 3)
        .where('is_approved', false)
        .orderBy('updated_at', 'desc')
        .limit(6)
        .exec()

      return response.ok({
        mentorManagers,
        mentorManagersCount,
        mentors,
        mentorsCount,
        programs,
        programsCount,
        recentRequests,
      })
    } catch (error) {
      return response.badRequest({
        message: `Error fetching Request`,
        status: 'error',
      })
    }
  }
}
