import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'
import Program from 'App/Models/Program'
import Task from 'App/Models/Task'
import TaskReport from 'App/Models/TaskReport'
import User from 'App/Models/User'

export default class DashboardController {
  public async index({ auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const currentDate = new Date().toISOString()

    try {
      const activePrograms = (await Program.query().where('is_archive', false)).length
      const programList = await Program.query().where('is_archive', false).limit(3)
      const mentors = (await User.query().where('role_id', Roles.MENTOR)).length
      const mentorManagers = (await User.query().where('role_id', Roles.MENTOR_MANAGER)).length
      const tasks = (await Task.query()).length
      const reports = (await TaskReport.query()).length
      const reportList = await TaskReport.query().limit(3)
      const completedTaskList = await Task.query().where('end_date', '<', currentDate).limit(3)
      const inprogressTaskList = await Task.query().where('end_date', '>', currentDate).limit(3)
      response.ok({
        active_programs: activePrograms,
        program_list: programList,
        mentor_managers: mentorManagers,
        mentors,
        tasks,
        completed_task_list: completedTaskList,
        inprogress_task_list: inprogressTaskList,
        reports,
        report_list: reportList,
      })
    } catch (error) {
      return response.badRequest({ message: `server issue`, status: "error" })
    }
  }
}
