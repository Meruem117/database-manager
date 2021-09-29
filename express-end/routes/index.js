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
  const table = req.params['database'] + '.' + req.params['table']
  const data = await con.describeTable(table)
  res.send(data)
})

router.post('/:database/:table/select', async (req, res, next) => {
  const table = req.params['database'] + '.' + req.params['table']
  const { start, offset } = req.body
  const data = await con.selectRows(table, start, offset)
  res.send(data)
})

router.post('/:database/:table/insert', async (req, res, next) => {
  const table = req.params['database'] + '.' + req.params['table']
  const value = req.body
  const result = await con.insertRow(table, value)
  res.send(result)
})

router.post('/:database/:table/update', async (req, res, next) => {
  const table = req.params['database'] + '.' + req.params['table']
  const value = req.body.value
  const key = req.body.key
  const result = await con.updateRow(table, value, key)
  res.send(result)
})

router.post('/:database/:table/delete', async (req, res, next) => {
  const table = req.params['database'] + '.' + req.params['table']
  const key = req.body
  const result = await con.deleteRow(table, key)
  res.send(result)
})

router.get('/end', (req, res, next) => {
  con.endPool()
  res.send('End Connection')
})

module.exports = router
