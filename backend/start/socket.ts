import Ws from 'App/WebSocket/Ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  console.log(socket.request.headers)
  // socket.to('private-chat').to(socket.id).emit('private', {
  //     "name":  ""
  // })

  socket.emit('news', { hello: 'world' })

  socket.on('emit', (data) => {
   // socket.emit('hello', { hello: 'world' })
    console.log(data)
  })
})
console.log("test socket")
Ws.io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error('invalid username'))
  }
  socket.request.headers.username = username
  next()
})
