import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Program from 'App/Models/Program'
import UserProgram from 'App/Models/UserProgram'

export default class ArchivesController {
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
        const { name, description } = request.only(['name', 'description'])
        const program = new Program()
        program.fill({ userId, name, description })

        program.save()
        response.created({ message: 'Program created', ...program.$attributes })
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const program = await Program.findOrFail(params.id)

    if (!program) return response.status(404).send({ message: 'Program not found' })

    return response.ok(program)
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    try {
      const userId = await auth.user?.id
      const program = await Program.findByOrFail('id', params.id)
      const updateProgram = request.only(['name', 'description'])

      if (!program) return response.status(404).send({ message: 'Program not Found' })

      program.merge({ ...updateProgram, userId })
      program.save()

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
}
