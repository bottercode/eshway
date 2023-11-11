const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT ?? 80

const signupRoute = require('./src/routes/signup')
const loginRoute = require('./src/routes/login')
const resetPasswordRoute = require('./src/routes/resetPassword')
const liveMatchRoute = require('./src/routes/liveMatch')
const scheduleRoute = require('./src/routes/schedule')
const pointsTableRoutes = require('./src/routes/pointsTable')
const fixtureRoutes = require('./src/routes/Fixture')
const liveStreamRoutes = require('./src/routes/LiveStream')
const livePollRoute = require('./src/routes/livePoll')
const teamMembersRouter = require('./src/routes/teamMemberRoute')

mongoose
  .connect('mongodb://127.0.0.1:27017/eshway-task', {
    useNewUrlParser: true,
    autoIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })

app.use(express.json())
app.use('/api/signup', signupRoute)
app.use('/api/login', loginRoute)
app.use('/api/reset-password', resetPasswordRoute)
app.use('/api/live-match-card', liveMatchRoute)
app.use('/api/schedule', scheduleRoute)
app.use('/api/points-table', pointsTableRoutes)
app.use('/api/fixtures', fixtureRoutes)
app.use('/api/live-streams', liveStreamRoutes)
app.use('/api/live-poll', livePollRoute)
app.use('/api/team-members/:teamId', teamMembersRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
