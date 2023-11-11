const UserTable = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const requestResetToken = async (req, res) => {
  try {
    const {email} = req.body

    if (!email) {
      return res.status(400).json({error: 'Missing required field: email.'})
    }

    const user = await UserTable.findOne({email})

    if (!user) {
      return res.status(404).json({error: 'User not found.'})
    }

    const resetToken = crypto.randomBytes(32).toString('hex')

    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000

    await user.save()

    res.status(200).json({
      resetToken,
      message: 'Please use this reset token to reset your password.'
    })
  } catch (error) {
    console.error('Error requesting reset token:', error)
    res.status(500).json({error: 'Internal Server Error.'})
  }
}

const resetPassword = async (req, res) => {
  try {
    const {resetToken, password} = req.body

    if (!resetToken || !password) {
      return res.status(400).json({error: 'Missing required fields.'})
    }

    console.log('Received Reset Token:', resetToken)

    const user = await UserTable.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: {$gt: Date.now()}
    })

    if (!user) {
      return res.status(404).json({error: 'Invalid password reset token.'})
    }

    const newPassword = await bcrypt.hash(password, 10)

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    res.status(200).json({message: 'Password reset successfully.'})
  } catch (error) {
    console.error('Error resetting password:', error)
    res.status(500).json({error: 'Internal Server Error.'})
  }
}

module.exports = {
  requestResetToken,
  resetPassword
}
