const express = require('express')
const router = express.Router()
const db = require('../common')

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/end', (req, res, next) => {
  db.end()
  console.log('end')
  res.render('End Connection')
})

module.exports = router
