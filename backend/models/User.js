// User: Datos básicos de registro de las cuentas de personas

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64,
  },
  role: {
    type: String,
    required: true,
    default: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

//Informacion dentro del metodo sign() va encriptada y no puede ser alterada facilmente por terceros
UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      user: {
        id: this._id,
      },
    },
    process.env.SECRET_KEY_DC_API,
    { expiresIn: 360000 }
  )
}

const User = mongoose.model('user', UserSchema)

module.exports = User
