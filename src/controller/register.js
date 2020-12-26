const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { set } = require('../util/redis');
const route = new Router();
const register = async ({ app }) => {
    route.post('/register', async (ctx) => {
        const { userID, password, name, className, school, tel } = ctx.request.body;
        await query("INSERT INTO `sdumanager`.`user` (`userID`, `name`, `sex`, `degree`, `school`, `className`, `tel`, `profileURL`, `identity`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [userID, name, '', '', school, className, tel, '', 'ID_USER', password]
        ).then(
            async rows => {
                let token = Math.random().toString(36).substr(2);
                //注册成功后，在redis中设置token和userID一一映射
                await set(userID, token);
                await set(token, userID);
                ctx.body = {
                    code: 0,
                    message: '注册成功',
                    data: {
                        token: token
                    }
                }
            }
        ).catch(
            err => {
                console.error(err);
                ctx.body = {
                    code: -1,
                    message: err.toString()
                }
            }
        )
    });
    app.use(route.routes()).use(route.allowedMethods());
}
module.exports = register;