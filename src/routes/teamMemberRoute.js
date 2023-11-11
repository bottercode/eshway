const express = require('express')
const teamMembersController = require('../controllers/teamMembers')

const teamMembersRouter = express.Router()

teamMembersRouter.get('/:teamId', teamMembersController.getTeamMembers)
teamMembersRouter.post('/', teamMembersController.addTeamMember)

module.exports = teamMembersRouter
