const auth = require('../middleware/auth')
const express = require('express')
/* const gravatar = require('gravatar') */
const bcrypt = require('bcryptjs')

const { check, validationResult } = require('express-validator')

const User = require('../models/User')

const router = express.Router()

// @route    GET api/user
// @desc     Get all users
// @access   Admin
router.get('/', auth, async (req, res, next) => {
  const user = await User.find()
  res.send(user).status(200)
})

// @route    GET api/user/:id
// @desc     Get user by id
// @access   Private
router.get('/:id', auth, async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).send('No hemos encontrado un usuario con ese ID')
  res.status(200).send(user)
})

// @route    POST api/user/
// @desc     Create user
// @access   Public
router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Elegí una contraseña de 6 o más caracteres').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'El email ya está en uso' }] })
      }
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      user = new User({
        name,
        email,
        password: hashPassword,
      })
      await user.save()
      const token = user.generateJWT()
      res.status(201).json({ token })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route    PUT api/user/:id
// @desc     Edit user
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
  if (!user) {
    return res.status(404).send('Error')
  }
  res.status(200).send('Información actualizada con éxito')
})

// @route    DEL api/user/:id
// @desc     Delete user
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    return res.status(404).send('Error')
  }
  res.status(200).send('Usuario borrado')
})

module.exports = router
