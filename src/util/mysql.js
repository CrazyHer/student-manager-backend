//采用Promise封装mysql操作方法
const db = require('mysql');
const config = require('../config.json');
const pool = db.createPool({
    host: config.mysql.HOST,
    port: config.mysql.PORT,
    user: config.mysql.USERNAME,
    password: config.mysql.PASSWORD,
    database: config.mysql.DATABASE
});
console.log("Mysql已加载");
//'SELECT * FROM `books` WHERE `author` = ?', ['David']
let query = (sql, values) => (
    new Promise(
        (resolve, reject) => {
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
)


module.exports = { query };