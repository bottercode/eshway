const server = require('http').createServer()
const io = require('socket.io')(server)

const getPollDetails = (req, res) => {
  io.of('/socket/live-poll').on('connection', socket => {
    console.log('A user connected to Live Poll Socket')

    socket.on('getPollData', () => {
      const PollData = {
        question: 'Who is going to win?',
        options: ['A', 'B']
      }
      socket.emit('PollData', PollData)
    })

    res.status(200).json(PollData)

    socket.on('vote', data => {
      io.of('/socket/live-poll').emit('updatePoll', {votes: data})
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected from Live Poll Socket')
    })
  })

  io.of('/socket/live-score').on('connection', socket => {
    console.log('A user connected to Live Score Socket')

    socket.on('updateScore', data => {
      io.of('/socket/live-score').emit('updateScore', data)
    })

    socket.on('goal', data => {
      io.of('/socket/live-score').emit('goal', data)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected from Live Score Socket')
    })
  })

  io.of('/socket/live-chat').on('connection', socket => {
    console.log('A user connected to Live Chat Socket')

    socket.on('newComment', data => {
      io.of('/socket/live-chat').emit('newComment', data)
    })

    socket.on('deleteComment', data => {
      io.of('/socket/live-chat').emit('deleteComment', data)
    })

    socket.on('reportComment', data => {
      io.of('/socket/live-chat').emit('reportComment', data)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected from Live Chat Socket')
    })
  })
}

module.exports = {getPollDetails}
