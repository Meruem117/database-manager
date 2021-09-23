const db = require('../common')
const sql = require('../common/sql')

async function showDatabases() {
    const data = await db.run(sql.base.showDatabases)
    return data
}

async function useDatabase(database) {
    await db.run(sql.base.useDatabase, [database])
    return true
}

async function showTables() {
    const data = await db.run(sql.base.showTables)
    return data
}

module.exports = {
    showDatabases,
    useDatabase,
    showTables
}
