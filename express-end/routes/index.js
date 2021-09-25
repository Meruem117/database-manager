const express = require('express')
const router = express.Router()
const con = require('../services')

router.get('/', async (req, res, next) => {
  const data = await con.showDatabases()
  res.send(data)
  // res.render('index', { title: 'Express' })
})

router.get('/:database', async (req, res, next) => {
  const database = req.params['database']
  await con.useDatabase(database)
  const data = await con.showTables()
  res.send(data)
})

router.get('/:database/:table', async (req, res, next) => {
  const table = req.params['table']
  const data = await con.describeTable(table)
  res.send(data)
})

router.get('/:database/:table/select', async (req, res, next) => {
  const table = req.params['table']
  const data = await con.selectData(table)
  res.send(data)
})

router.post('/:database/:table/insert', async (req, res, next) => {
  const table = req.params['table']
  const value = req.body
  const data = await con.insertData(table, value)
  res.send(data)
})

router.post('/:database/:table/update', async (req, res, next) => {
  const table = req.params['table']
  const value = req.body.value
  const key = req.body.key
  const data = await con.updateData(table, value, key)
  res.send(data)
})

router.post('/:database/:table/delete', async (req, res, next) => {
  const table = req.params['table']
  const key = req.body
  const data = await con.deleteData(table, key)
  res.send(data)
})

router.get('/end', (req, res, next) => {
  con.endPool()
  res.send('End Connection')
})

module.exports = router
