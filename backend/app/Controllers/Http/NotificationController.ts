import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import NotificationInterface from 'App/Interfaces/NotificationInterface'
import Notification from 'App/Models/Notification'

export default class NotificationController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const { page, limit } = request.qs()
      const user = await auth.authenticate()
      if (user.id) {
        const userId = user.id
        const messages = await Notification.query()
          .whereRaw('? = ANY (recipients)', [userId])
          .orderBy('created_at', 'desc')
          .select('*')
          .paginate(page || 1, limit || 10)

        response.ok(messages)
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: error })
    }
  }

  public async updateOnRead({ auth, params, response }: HttpContextContract) {
    try {
      const user = await auth.authenticate()
      if (user.id) {
        const notification = await Notification.query()
          .where('id', params.id)
          .andWhere('user_id', user.id)
          .firstOrFail()
        notification.isRead = true
        await notification.save()
        response.ok({ message: 'Notification read status changed' })
      }
    } catch (error) {
      response.badRequest({ message: `server issue`, status: error })
    }
  }

  public async save(payload: NotificationInterface) {
    Event.emit('send:notification', payload)
  }
}
