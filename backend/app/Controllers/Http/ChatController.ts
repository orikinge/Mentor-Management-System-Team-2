import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Ws from 'App/WebSocket/Ws'

export default class ChatController {
    public async chat ({ auth, response, params }: HttpContextContract) {
        Ws.io.emit('chat')
        
       
      }
}