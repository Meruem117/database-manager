const express = require('express')
const router = express.Router()
const { showDatabases } = require('../controllers/base')

router.get('/', async (req, res, next) => {
    const data = await showDatabases()
    res.send(data)
})

module.exports = router
