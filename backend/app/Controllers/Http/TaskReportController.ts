import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TaskReport from 'App/Models/TaskReport'
import Task from 'App/Models/Task'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail'
import generatePdfFile from 'Helpers/index'
import stream from 'stream'

export default class TaskReportController {
  public async createTaskReport({ auth, params, request, response }: HttpContextContract) {
    try {
      const { achievement, blocker, recommendation } = request.only([
        'achievement',
        'blocker',
        'recommendation',
      ])

      const user = auth.user
      if (!user) {
        return response.unauthorized({ error: 'You must be logged in to create a report' })
      }

      const taskId = params.taskId
      const task = await Task.query()
        .where('id', taskId)
        .preload('mentorManagers')
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .first()
      if (!task) {
        return response.notFound({ message: 'Task not found', status: 'Error' })
      }

      const isMentorManager = task.mentorManagers.some(
        (mentorManager) => mentorManager.id === user?.id
      )
      if (!isMentorManager) {
        return response.unauthorized({ message: 'You are not authorized to perform this action' })
      }

      const taskReport = await Database.transaction(async (trx) => {
        const newReport = new TaskReport()
        newReport.fill({
          taskId,
          mentorId: user.id,
          achievement,
          blocker,
          recommendation,
        })

        await newReport.useTransaction(trx).save()
        return newReport
      })

      const responseData = {
        report: taskReport,
        task: {
          id: task.id,
          title: task.title,
          creatorUserId: task.userId,
          createdBy: `${task.user?.firstName} ${task.user?.lastName}`,
          startDate: task.startDate,
          endDate: task.endDate,
        },
      }
      return response
        .status(201)
        .json({ status: 'success', message: 'Tasks report successfully created', responseData })
    } catch (error) {
      response.badRequest({ message: 'Error Creating Report', status: 'Error' })
    }
  }

  async getAllReports({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view task reports' })
      }
      const { page, limit, search } = request.qs()
      const taskReports = await TaskReport.query()
        .orderBy('created_at', 'desc')
        .if(search, (q) => {
          q.whereHas('task', (taskQuery) => {
            taskQuery
              .whereRaw('LOWER(title) like ?', [`%${search.toLowerCase()}%`])
              .orWhereRaw('LOWER(description) like ?', [`%${search.toLowerCase()}%`])
          })
        })
        .paginate(page || 1, limit || 10)

      const responseData = await Promise.all(
        taskReports.all().map(async (report) => {
          const task = await Task.query()
            .where('id', report.taskId)
            .preload('user', (query) => {
              query.select(['firstName', 'lastName'])
            })
            .firstOrFail()

          const mentorManager = await User.findOrFail(report.mentorId)

          return {
            id: report.id,
            achievement: report.achievement,
            blocker: report.blocker,
            recommendation: report.recommendation,
            task: {
              id: task.id,
              title: task.title,
              creatorUserId: task.userId,
              createdBy: `${task.user?.firstName} ${task.user?.lastName}`,
              startDate: task.startDate,
              endDate: task.endDate,
            },
            mentorManager: {
              id: mentorManager.id,
              firstName: mentorManager.firstName,
              lastName: mentorManager.lastName,
            },
          }
        })
      )

      return response.ok({
        status: 'success',
        message: 'All Task reports fetched successfully',
        responseData,
      })
    } catch (error) {
      response.badRequest({ message: 'Error getting report', status: 'Error' })
    }
  }

  async getReport({ auth, params, response }: HttpContextContract) {
    const trx = await Database.transaction()
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        await trx.rollback()
        return response.unauthorized({
          error: 'You must be an admin to view task reports',
        })
      }

      const report = await TaskReport.query(trx).where('id', params.reportId).firstOrFail()
      const task = await Task.query(trx)
        .where('id', report.taskId)
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .firstOrFail()
      const mentorManager = await User.findOrFail(report.mentorId)
      const result = {
        id: report.id,
        achievement: report.achievement,
        blocker: report.blocker,
        recommendation: report.recommendation,
        task: {
          id: task.id,
          title: task.title,
          creatorUserId: task.userId,
          createdBy: `${task.user?.firstName} ${task.user?.lastName}`,
          startDate: task.startDate,
          endDate: task.endDate,
        },
        mentorManager: {
          id: mentorManager.id,
          firstName: mentorManager.firstName,
          lastName: mentorManager.lastName,
        },
      }
      await trx.commit()
      return response.ok({ status: 'success', message: 'Report fetched successfully', result })
    } catch (error) {
      await trx.rollback()
      response.badRequest({ message: 'Error getting request', status: 'Error' })
    }
  }

  async downloadReportPDF({ auth, params, response }: HttpContextContract) {
    const trx = await Database.transaction()
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        await trx.rollback()
        return response.unauthorized({
          error: 'You must be an admin to view task reports',
        })
      }

      const report = await TaskReport.query(trx).where('id', params.reportId).firstOrFail()
      const task = await Task.query(trx)
        .where('id', report.taskId)
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .firstOrFail()
      const mentor = await User.findOrFail(report.mentorId)

      await trx.commit()
      return generatePdfFile(response, report, task, mentor)
    } catch (error) {
      await trx.rollback()
      response.badRequest({ message: 'Error getting request', status: 'Error' })
    }
  }

  async shareReport({ auth, params, request, response }: HttpContextContract) {
    const trx = await Database.transaction()
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        await trx.rollback()
        return response.unauthorized({
          error: 'You must be an admin to share task reports',
        })
      }
      const { name, email } = request.only(['name', 'email'])

      const report = await TaskReport.query(trx).where('id', params.reportId).firstOrFail()
      const task = await Task.query(trx)
        .where('id', report.taskId)
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .firstOrFail()
      const mentor = await User.findOrFail(report.mentorId)
      const writable = new stream.Duplex()

      await generatePdfFile({ response: writable }, report, task, mentor)
      const readable = new stream.Readable()
      readable.pipe(writable)

      await Mail.send((message) => {
        message
          .from('MMM2@example.com')
          .to(email)
          .subject(`Task: ${task.title} Report`)
          .html(
            `Hi ${name}\n
          Find the attached report for your perusal\n
          Kind regards,\n
          ${user.firstName}`
          )
          .attachData(readable, { filename: 'report.pdf' })
      })
    } catch (error) {
      console.log(error)
      await trx.rollback()
      response.badRequest({ message: 'Error getting request', status: 'Error' })
    }
  }

  async deleteReport({ auth, params, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to delete reports' })
      }

      const report = await TaskReport.findOrFail(params.reportId)

      await report.delete()

      return response.ok({ message: 'Task Report deleted successfully' })
    } catch (error) {
      response.badRequest({ message: 'Error deleting report', status: 'Error' })
    }
  }
}
