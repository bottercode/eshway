const Match = require('../models/matchModel')

const liveMatchController = {
  async getLiveMatchDetails(req, res) {
    const matches = await Match.find()
    res.status(200).json(matches)
  },

  async addLiveMatchDetails(req, res) {
    const match = new Match(req.body)
    await match.save()
    res.status(201).json(match)
  }
}

module.exports = liveMatchController
