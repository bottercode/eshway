const UserTable = require('../models/user')

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({error: 'Missing email or password.'})
    }

    const user = await UserTable.findOne({email: req.body.email})
    if (!user) {
      return res.status(404).json({error: 'User not found.'})
    }

    const isPasswordValid = await user.validatePassword(req.body.password)
    if (!isPasswordValid) {
      return res.status(401).json({error: 'Invalid email or password.'})
    }

    const token = await user.generateJwtToken()

    const response = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    return res.status(200).json({
      token,
      response,
      message: `${user.name} logged in successfully.`
    })
  } catch (error) {
    console.error('Login Error:', error)
    return res.status(500).json({error: 'Internal Server Error.'})
  }
}

module.exports = {
  login
}
