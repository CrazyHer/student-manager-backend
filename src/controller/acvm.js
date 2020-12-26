const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { get } = require('../util/redis');
const route = new Router();

const acvm = async ({ app }) => {
    route.get('/getacvm', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        await query("SELECT * FROM `sdumanager`.`achievement` WHERE `userID` = ?", [userID])
            .then(
                async rows => {
                    ctx.body = {
                        code: 0,
                        message: 'success',
                        data: rows.map(row => ({
                            content: row.content,
                            audited: row.audited === 0 ? false : true,
                            date: row.date,
                            key: row.key
                        }))
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

    route.post('/delacvm', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        let key = ctx.request.body.key;
        await query("SELECT * FROM `sdumanager`.`achievement` WHERE (`key` = ?)", [key])
            .then(
                async rows => {
                    if (rows[0].userID === userID) {
                        await query("DELETE FROM `sdumanager`.`achievement` WHERE (`key` = ?)", [key])
                            .then(
                                () => {
                                    ctx.body = {
                                        code: 0,
                                        message: 'success'
                                    }
                                }
                            )
                    } else {
                        ctx.body = {
                            code: -1,
                            message: "不是你的社会成果，无法删除"
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

    route.post('/addacvm', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        let { content, date } = ctx.request.body;
        await query("INSERT INTO `sdumanager`.`achievement` (`content`, `audited`, `date`, `userID`) VALUES (?, '0', ?, ?)", [content, date, userID])
            .then(
                () => {
                    ctx.body = {
                        code: 0,
                        message: 'success'
                    };
                }
            ).catch(
                (err) => {
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
module.exports = acvm;