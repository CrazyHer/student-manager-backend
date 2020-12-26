//const { query } = require("../util/mysql");

const { get } = require("../util/redis");

const auth = async (ctx) => {
    if (ctx.url !== '/register' && ctx.url !== '/login') {
        if (!ctx.request.header.token) {
            throw "token不存在！"
        } else if (!await get(ctx.request.header.token)) {
            throw "token无效或已过期，请重新登录"
        }
    }
}
module.exports = auth;