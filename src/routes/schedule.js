const express = require('express')
const scheduleController = require('../controllers/schedule')

const scheduleRouter = express.Router()

scheduleRouter.get('/', scheduleController.getScheduleDetails)
scheduleRouter.post('/', scheduleController.addScheduleDetails)

module.exports = scheduleRouter
