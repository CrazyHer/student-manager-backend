//采用Promise封装mysql操作方法
const db = require('mysql');
const config = require('../config.json');
console.log("mysql");
const pool = db.createPool({
    host: config.database.HOST,
    port: config.database.PORT,
    user: config.database.PASSWORD,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

//'SELECT * FROM `books` WHERE `author` = ?', ['David']
let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release();
                })
            }
        })
    })
}


module.exports = { query };