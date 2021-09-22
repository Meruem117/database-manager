const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool({ ...config })

async function run(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            console.log('connected as id ' + con.threadId)
            con.query(sql, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
            con.release()
        })
    })
}

// const con = mysql.createConnection({ ...config })
// function conConnect(con) {
//     con.connect(err => {
//         if (err) {
//             console.error('error connecting: ' + err.stack)
//             return
//         }
//         console.log('connected as id ' + con.threadId)
//     })
//     return con
// }
// function conEnd(con) {
//     con.end()
//     console.log('end connect id ' + con.threadId)
// }

module.exports = {
    run
}
