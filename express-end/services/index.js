const con = require('../common')
const sql = require('../common/sql')

async function showDatabases() {
    const data = await con.run(sql.base.showDatabases)
    return data
}

async function useDatabase(database) {
    await con.run(sql.base.useDatabase, [database])
    return true
}

async function showTables() {
    const data = await con.run(sql.base.showTables)
    return data
}

async function describeTable(table) {
    const data = await con.run(sql.base.describeTable, [table])
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
    endPool
}
