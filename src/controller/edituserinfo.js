const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { get } = require('../util/redis');
const fs = require('fs').promises;
const route = new Router();
const { HOST, server_port } = require('../config.json');

const editUserInfo = async ({ app }) => {
    route.post('/edituserinfo', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        let { className, degree, school, sex, tel, profileURL } = ctx.request.body;
        //头像超过100的基本上是base64文件，以静态文件存储在本地
        if (profileURL.length > 100) {
            let base64Data = profileURL.replace(/^data:image\/\w+;base64,/, '');
            let dataBuffer = Buffer.from(base64Data, 'base64');
            await fs.writeFile(`public/profile/${userID}.png`, dataBuffer);
            profileURL = `http://${HOST}:${server_port}/profile/${userID}.png`;
        }
        await query("UPDATE `sdumanager`.`user` SET `sex` = ?, `degree` = ?, `school` = ?, `className` = ?, `tel` = ?, `profileURL` = ? WHERE (`userID` = ?)",
            [sex, degree, school, className, tel, profileURL, userID])
            .then(
                rows => {
                    ctx.body = {
                        code: 0,
                        message: "success"
                    };
                }
            ).catch(
                err => {
                    console.log(err);
                    ctx.body = {
                        code: -1,
                        message: err.toString()
                    }
                }
            );
    });
    app.use(route.routes()).use(route.allowedMethods());
}
module.exports = editUserInfo;