const db = require('../common')

async function getUser() {
    const sql = 'select * from user'
    const data = await db.run(sql)
    return data
}

module.exports = {
    getUser
}
