import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import User from 'App/Models/User'
import TaskMentor from 'App/Models/TaskMentor'
import Roles from 'App/Enums/Roles'

export default class MentorController {
  async getAllMentors({ auth, response, request }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const { page, limit, query } = request.qs()
    try{
    const mentors = await User.query()
      .where((queryBuilder) => {
        queryBuilder
          .whereRaw('lower(first_name) like ?', [`%${query?.toLowerCase() || ''}%`])
          .orWhereRaw('lower(last_name) like ?', [`%${query?.toLowerCase() || ''}%`])
      })
      .where('role_id', Roles.MENTOR)
      .whereNull('deleted_at')
      .paginate(page || 1, limit || 10)
    return { status: 'success', message: 'Fetched all mentors successful', mentors }
    }catch (error) {
      return response.status(500).send({ message: 'Error fetching mentors.' })
    }
  }

  async getMentorTask({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const { search } = request.all()
      const tasks = await Task.query()
        .whereHas('mentors', (builder) => {
          builder.where('mentor_id', params.mentorId)
        })
        .where((query) => {
          if (search) {
            query
              .whereRaw('LOWER(title) LIKE ?', [`%${search.toLowerCase()}%`])
              .orWhereRaw('LOWER(description) LIKE ?', [`%${search.toLowerCase()}%`])
          }
        })
        .preload('mentors')
        .preload('taskReports')
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .exec()

      const tasksWithCounts = tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          meta: task.meta,
          creatorUserId: task.userId,
          createdBy: `${task.user.firstName} ${task.user.lastName}`,
          startDate: task.startDate,
          endDate: task.endDate,
          typeOfReport: task.typeOfReport,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          reports: task.taskReports?.map((report) => ({
            id: report.id,
            achievement: report.achievement,
            blocker: report.blocker,
            recommendation: report.recommendation,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
          })),
          taskReportCount: task.taskReports.length,
        }
      })

      return response
        .status(200)
        .json({ status: 'success', message: 'Tasks fetched successfully', data: tasksWithCounts })
    } catch (error) {
      return response.status(500).send({ message: 'Error fetching task.' })
    }
  }

  async removeMentorFromTask({ auth, params, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }
    try {
      const { taskId, mentorId } = params

      const taskMentor = await TaskMentor.query()
        .where('taskId', taskId)
        .where('mentorId', mentorId)
        .first()

      if (!taskMentor) {
        return response.badRequest({ message: 'Mentor not found for this task' })
      }

      await taskMentor.delete()

      return response.ok({ status: 'success', message: 'Mentor removed from task' })
    } catch (error) {
      return response.status(500).send({ message: 'Error removing mentor from task.' })
    }
  }
}
