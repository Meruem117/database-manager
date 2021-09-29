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

async function selectRows(table, start = 0, offset = 10) {
    const data = await con.run(sql.selectRows, [table, start, offset])
    return data
}

async function insertRow(table, value = {}) {
    const res = await con.run(sql.insertRow, [table, value])
    return res
}

async function updateRow(table, value = {}, key = {}) {
    const res = await con.run(sql.updateRow, [table, value, key])
    return res
}

async function deleteRow(table, key = {}) {
    const res = await con.run(sql.deleteRow, [table, key])
    return res
}

function endPool() {
    con.end()
    return
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
