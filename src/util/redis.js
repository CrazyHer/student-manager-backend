const redis = require('redis');
const config = require('../config.json');

const client = redis.createClient({
    host: config.redis.HOST,
    port: config.redis.PORT,
    password: config.redis.PASSWORD
});
console.log("Redis已加载；若请求时Redis连接不稳定可能会导致服务器崩溃")
let get = (key) => (new Promise(
    (resolve, reject) => {
        client.get(key, (err, res) => {
            if (err) reject(err)
            else resolve(res);
        })
    }
));

let set = (key, value) => (new Promise(
    (resolve, reject) => {
        client.set(key, value, (err, res) => {
            if (err) reject(err)
            else resolve(res);
        })
    }
))

module.exports = { get, set };