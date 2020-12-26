const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { get } = require('../util/redis');
const route = new Router();

const getUserInfo = async ({ app }) => {
    route.get('/getuserinfo', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        await query("SELECT * FROM sdumanager.user WHERE `userID` = ?", [userID])
            .then(
                rows => {
                    let { name, identity, userID, sex, school, className, tel, degree, profileURL } = rows[0];
                    ctx.body = {
                        code: 0,
                        message: "success",
                        data: {
                            name,
                            identity,
                            userID,
                            sex,
                            school,
                            className,
                            tel,
                            degree,
                            profileURL
                        }
                    };
                }
            ).catch(
                err => {
                    console.error(err);
                    ctx.body = {
                        code: -1,
                        message: err.toString()
                    };
                }
            );
    });
    app.use(route.routes()).use(route.allowedMethods());
}
module.exports = getUserInfo;