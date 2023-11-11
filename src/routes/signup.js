const express = require('express')
const signupController = require('../controllers/signup.js')
const signupRoute = express.Router()

signupRoute.post('/', signupController.addUser)

module.exports = signupRoute
