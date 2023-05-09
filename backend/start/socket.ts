import Ws from 'App/WebSocket/Ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })

  socket.on('emit', () => {})
})
console.log('test socket')
Ws.io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error('invalid username'))
  }
  socket.request.headers.username = username
  next()
})
