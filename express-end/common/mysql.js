const mysql = require('mysql')

const config = require('./config')

const con = mysql.createConnection({ ...config })

con.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack)
        return
    }
    console.log('connected as id ' + con.threadId)
})

module.exports = con
