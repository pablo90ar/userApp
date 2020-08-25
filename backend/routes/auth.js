const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const User = require('../models/User')

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}),
  // @route    POST api/auth
  // @desc     Authenticate user & get token
  // @access   Public
  router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] })
      }
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      const token = user.generateJWT()
      res.status(201).json({ token })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  })

module.exports = router
