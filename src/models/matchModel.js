const mongoose = require('mongoose')

const matchCommonFields = {
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  }
}

const MatchSchema = new mongoose.Schema({
  ...matchCommonFields,
  teams: [
    {
      name: String,
      score: Number
    }
  ],
  sport: {
    type: String
  },
  date: {
    type: Date
  },
  teamName: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  }
})

const Match = mongoose.model('Match', MatchSchema)

module.exports = Match
