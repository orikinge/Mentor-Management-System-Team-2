import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'
import Program from 'App/Models/Program'
import ProgramReport from 'App/Models/ProgramReport'
import UserProgram from 'App/Models/UserProgram'

export default class ProgramsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page, limit, search } = request.qs()
      const programs = await Program.query()
        .where('is_archive', false)
        .andWhere('name', 'like', `%${search || ''}%`)
        .orderBy('id', 'desc')
        .paginate(page || 1, limit || 10)

      response.ok(programs)
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      if (auth.user?.id) {
        const userId = auth.user?.id
        const { name, description, mentors, mentorManagers } = request.only([
          'name',
          'description',
          'mentors',
          'mentorManagers',
        ])
        const program = new Program()
        program.fill({ userId, name, description })

        await program.save()

        const users = [...mentors, ...mentorManagers]

        if (users && users.length > 0) {
          const usersData = users.map((userId) => ({
            programId: program.id,
            userId,
          }))

          await UserProgram.createMany(usersData)
        }
        response.created({ message: 'Program created', ...program.$attributes })
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }

  public async show({ auth, params, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || !user.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view program reports' })
      }

      const { id } = params

      const program = await Program.query().where('id', id).firstOrFail()
      const reports = await ProgramReport.query().where('program_id', id).exec()
      const mentors = await UserProgram.query()
        .where('program_id', id)
        .whereHas('user', (query) => {
          query.where('role_id', Roles.MENTOR)
        })
        .preload('user')
        .exec()
      const mentorManagers = await UserProgram.query()
        .where('program_id', id)
        .whereHas('user', (query) => {
          query.where('role_id', Roles.MENTOR_MANAGER)
        })
        .preload('user')
        .exec()

      return response.ok({
        program,
        reportCount: reports.length,
        reports,
        mentorCount: mentors.length,
        mentors,
        mentorManagerCount: mentorManagers.length,
        mentorManagers,
      })
    } catch (error) {
      return response.badRequest({ message: 'Server issue', status: 'Error' })
    }
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    try {
      const userId = await auth.user?.id
      const program = await Program.findByOrFail('id', params.id)
      const { name, description, mentors, mentorManagers } = request.only([
        'name',
        'description',
        'mentors',
        'mentorManagers',
      ])

      if (!program) return response.status(404).send({ message: 'Program not Found' })

      program.merge({ name, description, userId })
      await program.save()

      await UserProgram.query().where('programId', program.id).delete()

      const users = [...mentors, ...mentorManagers]

      if (users && users.length > 0) {
        const usersData = users.map((userId) => ({
          programId: program.id,
          userId,
        }))

        await UserProgram.createMany(usersData)
      }

      response.status(200).json({ message: 'Program updated', ...program.$attributes })
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const program = await Program.findOrFail(params.id)
    if (!program) return response.status(404).send({ message: 'Program not found' })

    await program.delete()
    response.status(204)
  }

  public async archive({ params, response }) {
    const program = await Program.findOrFail(params.id)

    if (!program) return response.status(404).send({ message: 'Program not found' })

    program.isArchive = true

    await program.save()

    response.status(200).send({ message: 'Program archived successfully' })
  }

  public async allArchive({ request, response }: HttpContextContract) {
    try {
      const { page, limit, search } = request.qs()
      const programs = await Program.query()
        .where('is_archive', true)
        .andWhereRaw('name like ?', [`%${search || ''}%`])
        .orderBy('id', 'desc')
        .paginate(page || 1, limit || 10)

      response.ok(programs)
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }

  public async assignUser({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const { userId, programId } = request.only(['userId', 'programId'])
      const user = await UserProgram.query()
        .where('user_id', userId)
        .andWhere('program_id', programId)
        .first()

      if (user) {
        return response.status(404).send({ message: 'User already assigned to this program' })
      }

      const userProgram = new UserProgram()
      userProgram.fill({ userId, programId })
      userProgram.save()
      response.created({ message: 'User assigned' })
    } catch (error) {
      response.badRequest({ message: `server issue ${error}`, status: 'Error' })
    }
  }

  public async unassignUser({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const { userId, programId } = request.only(['userId', 'programId'])
    const userProgram = await UserProgram.query()
      .where('user_id', userId)
      .andWhere('program_id', programId)
      .first()

    if (!userProgram)
      return response.status(404).send({ message: 'User not assigned to this program' })

    await userProgram.delete()
    response.status(204)
  }

  public async userPrograms({ auth, request, response, params }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }

    const { page, limit, search } = request.qs()
    const userPrograms = await UserProgram.query()
      .preload('user')
      .preload('program')
      .whereHas('program', (query) => {
        query
          .where('is_archive', false)
          .where('name', 'like', `%${search || ''}%`)
          .orderBy('id', 'desc')
      })
      .where('user_id', params.id)
      .paginate(page || 1, limit || 10)

    response.ok(userPrograms)
  }

  public async programMentor({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const program = await Program.query().where('id', params.id).firstOrFail()
    const { page, limit } = request.qs()
    const users = await UserProgram.query()
      .whereHas('user', (query) => {
        query.where('role_id', Roles.MENTOR)
      })
      .where('program_id', params.id)
      .preload('user')
      .paginate(page || 1, limit || 10)

    if (!program) return response.status(404).send({ message: 'Program not found' })

    program.users = users

    return response.ok(program)
  }

  public async programMentorManager({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const program = await Program.query().where('id', params.id).firstOrFail()
    const { page, limit } = request.qs()
    const users = await UserProgram.query()
      .whereHas('user', (query) => {
        query.where('role_id', Roles.MENTOR_MANAGER)
      })
      .where('program_id', params.id)
      .preload('user')
      .paginate(page || 1, limit || 10)

    if (!program) return response.status(404).send({ message: 'Program not found' })

    program.users = users

    return response.ok(program)
  }
}
