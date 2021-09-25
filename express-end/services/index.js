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

async function selectData(table) {
    const data = await con.run(sql.selectData, [table])
    return data
}

async function insertData(table, value = {}) {
    const data = await con.run(sql.insertData, [table, value])
    return data
}

async function updateData(table, value = {}, key = {}) {
    const data = await con.run(sql.updateData, [table, value, key])
    return data
}

async function deleteData(table, key = {}) {
    const data = await con.run(sql.deleteData, [table, key])
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
    selectData,
    insertData,
    updateData,
    deleteData,
    endPool
}
