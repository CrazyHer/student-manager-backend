const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { set } = require('../util/redis');
const route = new Router();

const login = async ({ app }) => {
    route.post('/login', async (ctx) => {
        const { userID, password } = ctx.request.body;
        await query("SELECT `password` FROM sdumanager.user WHERE `userID` = ?", [userID]).then(
            async rows => {
                if (rows[0] && rows[0].password === password) {
                    //随机生成字符串作为对应userID的token，设置双射存入redis中
                    let token = Math.random().toString(36).substr(2);
                    await set(token, userID);
                    await set(userID, token);

                    ctx.body = {
                        code: 0,
                        message: "登陆成功",
                        data: {
                            token: token
                        }
                    };
                } else {
                    ctx.body = {
                        code: -1,
                        message: "账号或密码错误"
                    }
                }
            }
        )
            .catch(err => {
                console.error(err);
                ctx.body = {
                    code: -1,
                    message: err.toString()
                }
            })
    });
    app.use(route.routes()).use(route.allowedMethods());
};
module.exports = login;