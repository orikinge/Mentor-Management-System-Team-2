// import Ws from 'App/WebSocket/Ws'
// import { Socket } from 'socket.io'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Message from 'App/Models/Message'
// import { DateTime } from 'luxon'
//
// export default class Chat {
//   constructor(private socket: Socket, private ctx: HttpContextContract) {}
//
//   public async onMessage(message: { body: string }) {
//     const user = this.ctx.auth.user
//
//     if (!user) {
//       return
//     }
//     const recipient = this.ctx.params.recipientId
//     const body = message.body
//
//     const newMessage = new Message()
//     newMessage.senderId = user.id
//     newMessage.recipientId = recipient
//     newMessage.body = body
//     newMessage.sentAt = DateTime.local()
//     await newMessage.save()
//
//     const recipientChannel = Ws.getChannel('chat:*').topic(`chat:${recipient.id}`)
//     if (recipientChannel) {
//       recipientChannel.broadcast('message', newMessage)
//     }
//
//     const senderChannel = Ws.getChannel('chat:*').topic(`chat:${user.id}`)
//     if (senderChannel) {
//       senderChannel.broadcast('message', newMessage)
//     }
//   }
// }
