const con = require('../common')
const sql = require('../common/sql')

async function showDatabases() {
    const data = await con.run(sql.showDatabases)
    return data
}

async function useDatabase(database) {
    await con.run(sql.useDatabase, [database])
    return true
}

async function showTables() {
    const data = await con.run(sql.showTables)
    return data
}

async function describeTable(table) {
    const data = await con.run(sql.describeTable, [table])
    return data
}

async function select(table) {
    const data = await con.run(sql.select, [table])
    return data
}

function endPool() {
    con.end()
    return true
}

module.exports = {
    showDatabases,
    useDatabase,
    showTables,
    describeTable,
    select,
    endPool
}
