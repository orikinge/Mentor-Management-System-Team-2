import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pusher from 'pusher'
import Env from '@ioc:Adonis/Core/Env'
import Message from 'App/Models/Message'
import { DateTime } from 'luxon'

export const pusher = new Pusher({
  appId: Env.get('PUSHER_APP_ID'),
  key: Env.get('PUSHER_APP_KEY'),
  secret: Env.get('PUSHER_APP_SECRET'),
  cluster: Env.get('PUSHER_APP_CLUSTER'),
  useTLS: true,
})

export default class ChatController {
  async authChatChannel({ auth, response, request }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ error: 'You must be logged in to chat' })
      }

      const { channelName, socketId } = request.all()
      const presenceData = {
        user_id: user.id.toString(),
        user_info: {
          name: user.firstName,
        },
      }
       const authUser = pusher.authorizeChannel(socketId, channelName, presenceData)
        const messages = await Message.query()
          .where('channel_name', channelName)
          .orderBy('created_at', 'asc')
          .exec()
      return { channelName, messages: messages, authUser}
    } catch (error) {
      return response.badRequest(error)
    }
  }
  async authChatUser({ auth, response, request }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ error: 'You must be logged in to chat' })
      }

      const { socketId } = request.all()
      const userData = {
        id: user.id.toString(),
        email: user.email,
        name: user.firstName,
      }
      const authUser = pusher.authenticateUser(socketId, userData)
      return { authUser }
    } catch (error) {
      return response.badRequest(error)
    }
  }
  async saveChat({ auth, response, request, params }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ error: 'You must be logged in to chat' })
      }

      const { channelName, body } = request.all()

      const userId = user.id
      const recipientId = params.receiverId
      const chat = new Message()
      chat.senderId = userId
      chat.recipientId = recipientId
      chat.body = body
      chat.channelName = channelName
      chat.sentAt = DateTime.local()
      await chat.save()

      return response.created({ status: 'success', message: 'Chat saved', chat })
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
