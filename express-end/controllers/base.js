const db = require('../common')
const sql = require('../common/sql-map')

async function showDatabases() {
    const sql = 'show databases'
    const data = await db.run(sql)
    return data
}

async function useDatabases() {
    const sql = 'show databases'
    const data = await db.run(sql)
    return data
}

async function showTables() {
    const sql = 'show databases'
    const data = await db.run(sql)
    return data
}

module.exports = {
    showDatabases
}
