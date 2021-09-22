const express = require('express')
const router = express.Router()
const { getUser } = require('../controllers/user')

router.get('/', async (req, res, next) => {
  const data = await getUser()
  res.send(data)
})

module.exports = router
