const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool({
    ...config
})

async function run(sql, values = undefined) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            // console.log('connected as id ' + con.threadId)
            con.query(sql, values, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
            con.release()
        })
    })
}

pool.on('connection', (con) => {
    // console.log(con.threadId + ' connected')
})

pool.on('release', (con) => {
    // console.log(con.threadId + ' release')
})

function end() {
    pool.end()
}

module.exports = {
    run,
    end
}