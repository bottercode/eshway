const UserTable = require('../models/user')
const jwt = require('jsonwebtoken')

const addUser = async (req, res) => {
  try {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
      return res.status(400).json({error: 'Missing required fields.'})
    }

    const existingUser = await UserTable.findOne({email})
    if (existingUser) {
      return res.status(409).json({error: 'User already exists.'})
    }

    const newUser = new UserTable({
      name,
      email,
      password: await UserTable.hashPassword(password)
    })

    await newUser.save()

    const response = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    }

    const token = await newUser.generateJwtToken()

    return res.status(201).json({
      token,
      user: response,
      message: 'User successfully registered.'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Internal Server Error. Failed to register the user!'})
  }
}

module.exports = {
  addUser
}
