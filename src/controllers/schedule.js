const Match = require('../models/matchModel')

const scheduleController = {
  async getScheduleDetails(req, res) {
    const schedules = await Match.find()
    res.status(200).json(schedules)
  },

  async addScheduleDetails(req, res) {
    const schedule = new Match(req.body)
    await schedule.save()
    res.status(201).json(schedule)
  }
}

module.exports = scheduleController
