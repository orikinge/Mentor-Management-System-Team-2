import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BroadcastMessage from 'App/Models/BroadcastMessage'

export default class BroadcastMessagesController {
  public async sent({ auth, request, response }: HttpContextContract) {
    try {
      const { page, limit } = request.qs()
      const user = await auth.authenticate()
      if (user.id) {
        const userId = user?.id
        const messages = await BroadcastMessage.query()
          .where('user_id', userId)
          .orderBy('created_at', 'desc')
          .paginate(page || 1, limit || 20)

        response.ok(messages)
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }

  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const { page, limit } = request.qs()
      const user = await auth.authenticate()
      if (user.id) {
        const userId = user.id
        const messages = await BroadcastMessage.query()
          .preload('user')
          .whereRaw('? = ANY (recipients)', [userId])
          .orWhere('user_id', userId)
          .orderBy('created_at', 'desc')
          .select('*')
          .paginate(page || 1, limit || 10)

        response.ok(messages)
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: error })
    }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    try {
      const user = await auth.authenticate()
      if (user.id) {
        const userId = user.id
        const { recipients, message } = request.only(['recipients', 'message'])
        const broadcast = new BroadcastMessage()
        broadcast.fill({ userId, recipients, message })

        broadcast.save()
        response.created({ message: 'Program created', ...broadcast.$attributes })
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: 'Error' })
    }
  }
}
