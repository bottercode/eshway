const express = require('express')
const liveMatchController = require('../controllers/liveMatch')

const liveMatchRouter = express.Router()

liveMatchRouter.get('/', liveMatchController.getLiveMatchDetails)
liveMatchRouter.post('/', liveMatchController.addLiveMatchDetails)

module.exports = liveMatchRouter
