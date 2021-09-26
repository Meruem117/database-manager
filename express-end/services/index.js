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

async function selectRows(table) {
    const data = await con.run(sql.selectRows, [table])
    return data
}

async function insertRow(table, value = {}) {
    const data = await con.run(sql.insertRow, [table, value])
    return data
}

async function updateRow(table, value = {}, key = {}) {
    const data = await con.run(sql.updateRow, [table, value, key])
    return data
}

async function deleteRow(table, key = {}) {
    const data = await con.run(sql.deleteRow, [table, key])
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
    selectRows,
    insertRow,
    updateRow,
    deleteRow,
    endPool
}
