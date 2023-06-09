import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Program from 'App/Models/Program'
import ProgramReport from 'App/Models/ProgramReport'
import Task from 'App/Models/Task'
import TaskReport from 'App/Models/TaskReport'
import ProgramCertificate from 'App/Models/ProgramsCertificate'
import Database from '@ioc:Adonis/Lucid/Database'
export default class SearchController {
  async search({ auth, response, request }: HttpContextContract) {
    const user = auth.user!
    if (!user.isAdmin) {
      return response.unauthorized({ message: 'You are not authorized to access this resource.' })
    }
    const { page = 1, limit = 10, query } = request.qs()
    try {
      const programsQuery = await Program.query()
        .where('name', 'ilike', `%${query}%`)
        .orWhere('description', 'ilike', `%${query}%`)
        .where('is_archive', false)
        .select(Database.raw("'Program' as table_name"), '*')

      const programReportsQuery = await ProgramReport.query()
        .where('achievement', 'ilike', `%${query}%`)
        .orWhere('blocker', 'ilike', `%${query}%`)
        .orWhere('recommendation', 'ilike', `%${query}%`)
        .select(Database.raw("'ProgramReport' as table_name"), '*')

      const tasksQuery = await Task.query()
        .where('title', 'ilike', `%${query}%`)
        .orWhere('description', 'ilike', `%${query}%`)
        .select(Database.raw("'Task' as table_name"), '*')

      const taskReportsQuery = await TaskReport.query()
        .where('achievement', 'ilike', `%${query}%`)
        .orWhere('blocker', 'ilike', `%${query}%`)
        .orWhere('recommendation', 'ilike', `%${query}%`)
        .select(Database.raw("'TaskReport' as table_name"), '*')

      const programCertificatesQuery = await ProgramCertificate.query()
        .where('programNameUrl', 'ilike', `%${query}%`)
        .orWhere('certification', 'ilike', `%${query}%`)
        .select(Database.raw("'ProgramCertificate' as table_name"), '*')

      const [
        programResults,
        programReportResults,
        taskResults,
        taskReportResults,
        programCertificateResults,
      ] = await Promise.all([
        programsQuery,
        programReportsQuery,
        tasksQuery,
        taskReportsQuery,
        programCertificatesQuery,
      ])

      const searchResults = [
        ...programResults.map((result) => ({ ...result.$attributes, table_name: 'Program' })),
        ...programReportResults.map((result) => ({
          ...result.$attributes,
          table_name: 'ProgramReport',
        })),
        ...taskResults.map((result) => ({ ...result.$attributes, table_name: 'Task' })),
        ...taskReportResults.map((result) => ({ ...result.$attributes, table_name: 'TaskReport' })),
        ...programCertificateResults.map((result) => ({
          ...result.$attributes,
          table_name: 'ProgramCertificate',
        })),
      ]

      const paginatedResults = searchResults.slice((page - 1) * limit, page * limit)

      return {
        total: searchResults.length,
        perPage: limit,
        currentPage: page,
        lastPage: Math.ceil(searchResults.length / limit),
        data: paginatedResults,
      }
    } catch (error) {
      return response.badRequest({
        message: `No search found`,
        status: 'error',
        error,
      })
    }
  }
}
