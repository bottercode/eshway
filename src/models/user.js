const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

UserSchema.statics.hashPassword = async function (password) {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateJwtToken = async function () {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  )

  return token
}

const UserTable = mongoose.model('User', UserSchema)

module.exports = UserTable
