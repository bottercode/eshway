const express = require('express')
const loginController = require('../controllers/login.js')
const loginRoute = express.Router()

loginRoute.post('/', loginController.login)

module.exports = loginRoute
