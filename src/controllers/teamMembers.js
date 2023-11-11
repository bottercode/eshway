const Match = require('../models/matchModel')

const getTeamMembers = async (req, res) => {
  try {
    const {teamId} = req.params

    const teamMembers = await Match.findOne({_id: teamId}, {teamName: 1, _id: 0})

    res.status(200).json(teamMembers ? teamMembers.teams : [])
  } catch (error) {
    console.error('Error fetching team members:', error)
    res.status(500).json({error: 'Internal Server Error'})
  }
}

const addTeamMember = async (req, res) => {
  try {
    const {teamId} = req.params
    const {name, position} = req.body

    const match = await Match.findById(teamId)

    if (!match) {
      return res.status(404).json({error: 'Match not found'})
    }

    match.teams.push({name, position})

    await match.save()

    res.status(201).json({message: 'Team member added successfully', teamMember: {name, position}})
  } catch (error) {
    console.error('Error adding team member:', error)
    res.status(500).json({error: 'Internal Server Error'})
  }
}

module.exports = {
  getTeamMembers,
  addTeamMember
}
