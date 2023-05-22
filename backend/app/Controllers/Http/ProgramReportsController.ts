import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProgramReport from 'App/Models/ProgramReport'
import Program from 'App/Models/Program'
import UserProgram from 'App/Models/UserProgram'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class ProgramReportsController {
  public async createProgramReport({ auth, params, request, response }: HttpContextContract) {
    try {
      if (auth.user?.id) {
        const userId = auth.user?.id
        const { programId } = params
        const { achievement, blocker, recommendation } = request.only([
          'achievement',
          'blocker',
          'recommendation',
        ])

        const isMentorManager = await UserProgram.query()
          .where('user_id', userId)
          .where('program_id', programId)
          .whereHas('user', (query) => {
            query.where('role_id', Roles.MENTOR_MANAGER)
          })
          .first()
        console.log('Mentor Managers', isMentorManager)

        if (!isMentorManager) {
          return response.unauthorized({
            message: 'You are not authorized to create a program report for this program.',
          })
        }

        const programReport = new ProgramReport()
        programReport.fill({
          programId,
          mentorManagerId: userId,
          achievement,
          blocker,
          recommendation,
        })
        await programReport.save()

        const program = await Program.query().where('id', programId).firstOrFail()
        const creator = await User.query().where('id', program.userId).firstOrFail()

        return response.created({
          message: 'Program report created',
          programId: program.id,
          programTitle: program.name,
          programCreator: `${creator.firstName} ${creator.lastName}`,
          achievement: programReport.achievement,
          blocker: programReport.blocker,
          recommendation: programReport.recommendation,
        })
      }
    } catch (error) {
      return response.badRequest({ message: 'Server issue', status: 'Error' })
    }
  }

  async getAllReports({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view program reports' })
      }
      const { page, limit, search } = request.qs()
      const programReports = await ProgramReport.query()
        .orderBy('created_at', 'desc')
        .if(search, (q) => {
          q.whereHas('program', (programQuery) => {
            programQuery
              .whereRaw('LOWER(title) like ?', [`%${search.toLowerCase()}%`])
              .orWhereRaw('LOWER(description) like ?', [`%${search.toLowerCase()}%`])
          })
        })
        .paginate(page || 1, limit || 10)

      const responseData = await Promise.all(
        programReports.all().map(async (report) => {
          const program = await Program.query()
            .where('id', report.programId)
            .preload('user', (query) => {
              query.select(['firstName', 'lastName'])
            })
            .firstOrFail()

          const mentorManager = await User.findOrFail(report.mentorManagerId)

          return {
            id: report.id,
            achievement: report.achievement,
            blocker: report.blocker,
            recommendation: report.recommendation,
            program: {
              id: program.id,
              title: program.name,
              creatorUserId: program.userId,
              createdBy: `${program.user?.firstName} ${program.user?.lastName}`,
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
        message: 'All Program reports fetched successfully',
        responseData,
      })
    } catch (error) {
      response.badRequest({ message: 'Error getting report', status: 'Error' })
    }
  }

  async getReport({ auth, params, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        return response.unauthorized({
          error: 'You must be an admin to view program reports',
        })
      }

      const report = await ProgramReport.query().where('id', params.reportId).firstOrFail()
      const program = await Program.query()
        .where('id', report.programId)
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .firstOrFail()
      const mentorManager = await User.findOrFail(report.mentorManagerId)
      const result = {
        id: report.id,
        achievement: report.achievement,
        blocker: report.blocker,
        recommendation: report.recommendation,
        program: {
          id: program.id,
          title: program.name,
          creatorUserId: program.userId,
          createdBy: `${program.user?.firstName} ${program.user?.lastName}`,
        },
        mentorManager: {
          id: mentorManager.id,
          firstName: mentorManager.firstName,
          lastName: mentorManager.lastName,
        },
      }
      return response.ok({ status: 'success', message: 'Report fetched successfully', result })
    } catch (error) {
      response.badRequest({ message: 'Error getting request', status: 'Error' })
    }
  }

  async deleteReport({ auth, params, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to delete reports' })
      }

      const report = await ProgramReport.findOrFail(params.reportId)

      await report.delete()

      return response.ok({ message: 'Program Report deleted successfully' })
    } catch (error) {
      response.badRequest({ message: 'Error deleting report', status: 'Error' })
    }
  }
}
