const express = require('express')
const router = express.Router()
const con = require('../controllers/base')

router.get('/', async (req, res, next) => {
    const data = await con.showDatabases()
    res.send(data)
})

router.get('/:database', async (req, res, next) => {
    const database = req.params['database']
    await con.useDatabase(database)
    const data = await con.showTables()
    res.send(data)
})

module.exports = router