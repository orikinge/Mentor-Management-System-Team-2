import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import Roles from 'App/Enums/Roles'
import TaskMentor from 'App/Models/TaskMentor'
import TaskMentorManager from 'App/Models/TaskMentorManager'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TaskController {
  async create({ auth, request, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const { title, description, meta, startDate, endDate, typeOfReport, mentors, mentorManagers } =
      request.only([
        'title',
        'description',
        'meta',
        'startDate',
        'endDate',
        'typeOfReport',
        'mentors',
        'mentorManagers',
      ])

    try {
      const task = await Database.transaction(async (trx) => {
        const task = new Task()

        task.fill({
          title,
          description,
          meta,
          userId: adminUser.id,
          startDate,
          endDate,
          typeOfReport,
        })

        await task.useTransaction(trx).save()

        if (mentors && mentors.length > 0) {
          for (const mentorId of mentors) {
            const taskMentor = new TaskMentor()

            taskMentor.fill({
              taskId: task.id,
              mentorId,
            })

            await taskMentor.useTransaction(trx).save()
          }
        }

        if (mentorManagers && mentorManagers.length > 0) {
          for (const mentorManagerId of mentorManagers) {
            const taskMentorManager = new TaskMentorManager()

            taskMentorManager.fill({
              taskId: task.id,
              mentorManagerId,
            })

            await taskMentorManager.useTransaction(trx).save()
          }
        }

        return task
      })

      return response.created({ status: 'success', message: 'Task Created', task })
    } catch (error) {
      return response.status(500).send({ message: 'Error creating task.' })
    }
  }

  async update({ auth, params, request, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const { title, description, meta, startDate, endDate, typeOfReport, mentors, mentorManagers } =
      request.only([
        'title',
        'description',
        'meta',
        'startDate',
        'endDate',
        'typeOfReport',
        'mentors',
        'mentorManagers',
      ])

    const taskId = params.taskId

    try {
      const task = await Database.transaction(async (trx) => {
        const task = await Task.findOrFail(taskId)

        task.merge({
          title,
          description,
          meta,
          startDate,
          endDate,
          typeOfReport,
        })

        await task.useTransaction(trx).save()

        if (mentors && mentors.length > 0) {
          const taskMentors = mentors.map((mentorId: number) => ({
            taskId,
            mentorId,
          }))

          await TaskMentor.query().useTransaction(trx).where('taskId', taskId).delete()

          await TaskMentor.createMany(taskMentors)
        }

        if (mentorManagers && mentorManagers.length > 0) {
          const taskMentorManagers = mentorManagers.map((mentorManagerId: number) => ({
            taskId,
            mentorManagerId,
          }))

          await TaskMentorManager.query().useTransaction(trx).where('taskId', taskId).delete()

          await TaskMentorManager.createMany(taskMentorManagers)
        }

        return task
      })

      return response
        .status(200)
        .json({ status: 'success', message: 'Task Updated Successfully', task })
    } catch (error) {
      console.log(error)
      return response.status(500).send({ message: 'Error updating task.' })
    }
  }

  async show({ auth, params, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const taskId = params.taskId

    const task = await Task.query()
      .where('id', taskId)
      .preload('mentors')
      .preload('mentorManagers')
      .preload('taskReports')
      .preload('user', (query) => {
        query.select(['firstName', 'lastName'])
      })
      .first()

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    const result = {
      id: task.id,
      title: task.title,
      description: task.description,
      meta: task.meta,
      creatorUserId: task.userId,
      createdBy: `${task.user?.firstName} ${task.user?.lastName}`,
      startDate: task.startDate,
      endDate: task.endDate,
      typeOfReport: task.typeOfReport,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      mentors: task.mentors?.map((mentor) => ({
        id: mentor.id,
        firstName: mentor.firstName,
        lastName: mentor.lastName,
      })),
      mentorManagers: task.mentorManagers?.map((mentorManager) => ({
        id: mentorManager.id,
        firstName: mentorManager.firstName,
        lastName: mentorManager.lastName,
      })),
      reports: task.taskReports?.map((report) => ({
        id: report.id,
        achievement: report.achievement,
        blocker: report.blocker,
        recommendation: report.recommendation,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      })),
      mentorCount: task.mentors.length,
      mentorManagerCount: task.mentorManagers.length,
    }

    return response.ok({ status: 'success', message: 'Task fetched Successfully', result })
  }
  async index({ auth, response, request }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const { page, limit, search } = request.qs()

    try {
      const tasks = await Task.query()
        .where((query) => {
          if (search) {
            query
              .whereRaw('LOWER(title) LIKE ?', [`%${search.toLowerCase()}%`])
              .orWhereRaw('LOWER(description) LIKE ?', [`%${search.toLowerCase()}%`])
          }
        })
        .preload('user')
        .preload('mentors')
        .preload('mentorManagers')
        .preload('taskReports')
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .paginate(page || 1, limit || 10)

      const tasksWithCounts = tasks.toJSON().data.map((task) => {
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
          mentors: task.mentors?.map((mentor) => ({
            id: mentor.id,
            firstName: mentor.firstName,
            lastName: mentor.lastName,
          })),
          mentorManagers: task.mentorManagers?.map((mentorManager) => ({
            id: mentorManager.id,
            firstName: mentorManager.firstName,
            lastName: mentorManager.lastName,
          })),
          reports: task.taskReports?.map((report) => ({
            id: report.id,
            title: report.title,
            achievement: report.achievement,
            blocker: report.blocker,
            recommendation: report.recommendation,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
          })),
          mentorCount: task.mentors.length,
          mentorManagerCount: task.mentorManagers.length,
          taskReportCount: task.taskReports.length,
        }
      })

      return response
        .status(200)
        .json({ status: 'success', message: 'Tasks fetched successfully', data: tasksWithCounts })
    } catch (error) {
      return response.status(500).send({ message: 'Error retrieving tasks.' })
    }
  }

  async delete({ auth, params, response }: HttpContextContract) {
    const adminUser = await auth.authenticate()

    if (!adminUser || adminUser.roleId !== Roles.ADMIN) {
      return response.unauthorized({ message: 'You are not authorized to perform this action' })
    }

    const taskId = params.taskId

    const task = await Task.query().where('id', taskId).first()

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    try {
      await Database.transaction(async (trx) => {
        await TaskMentor.query().where('taskId', taskId).useTransaction(trx).delete()
        await TaskMentorManager.query().where('taskId', taskId).useTransaction(trx).delete()
        await task.useTransaction(trx).delete()
      })

      return response.ok({ message: 'Task deleted successfully' })
    } catch (error) {
      return response.status(500).send({ message: 'Error deleting task' })
    }
  }

  async getMentorsByTask({ params, response }: HttpContextContract) {
    const { taskId } = params

    try {
      const task = await Task.query().where('id', taskId).preload('mentors').first()

      if (!task) {
        return response.notFound({ message: 'Task not found' })
      }

      const mentors = task.mentors.map((mentor) => ({
        mentor,
      }))

      return response.ok({
        status: 'success',
        message: 'Mentors fetched successfully',
        data: mentors,
      })
    } catch (error) {
      return response.status(500).send({ message: 'Error retrieving mentors.' })
    }
  }

  async getMentorManagersByTask({ params, response }: HttpContextContract) {
    const { taskId } = params

    try {
      const task = await Task.query().where('id', taskId).preload('mentorManagers').first()

      if (!task) {
        return response.notFound({ message: 'Task not found' })
      }

      const mentorManagers = task.mentorManagers.map((mentorManager) => ({
        mentorManager,
      }))

      return response.ok({
        status: 'success',
        message: 'Mentor Managers fetched successfully',
        data: mentorManagers,
      })
    } catch (error) {
      return response.status(500).send({ message: 'Error retrieving mentor managers.' })
    }
  }

  public async getReportsByTask({ params, response }: HttpContextContract) {
    const { taskId } = params

    try {
      const task = await Task.query().where('id', taskId).preload('taskReports').first()

      if (!task) {
        return response.notFound({ message: 'Task not found' })
      }

      const reports = task.taskReports.map((report) => ({
        id: report.id,
        taskId: report.taskId,
        mentorId: report.mentorId,
        achievement: report.achievement,
        blocker: report.blocker,
        recommendation: report.recommendation,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      }))

      return response.ok({
        status: 'success',
        message: 'Reports fetched successfully',
        data: reports,
      })
    } catch (error) {
      return response.status(500).send({ message: 'Error retrieving reports.' })
    }
  }

  async searchTask({ request, response }: HttpContextContract) {
    const query = request.input('search')

    const res = await Task.query()
      .whereLike('title', `%${query.replaceAll("'", '')}%`)
      .orWhereLike('description', `%${query.replaceAll("'", '')}%`)
      .select('*')

    return response.ok(res)
  }
}
