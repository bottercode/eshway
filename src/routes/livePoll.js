const express = require('express')
const livePollController = require('../controllers/livePoll')

const livePollRouter = express.Router()

livePollRouter.get('/', livePollController.getPollDetails)

module.exports = livePollRouter
