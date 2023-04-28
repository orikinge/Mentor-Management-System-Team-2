import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/WebSocket/Ws'

export default class ChatController {
    public async chat ({}: HttpContextContract) {
        Ws.io.emit('chat')


      }
}
