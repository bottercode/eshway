const express = require('express')
const resetPasswordController = require('../controllers/resetPassword.js')
const resetPasswordRoute = express.Router()

resetPasswordRoute.post('/request', resetPasswordController.requestResetToken)
resetPasswordRoute.post('/reset', resetPasswordController.resetPassword)

module.exports = resetPasswordRoute
