const Router = require('@koa/router');
const course = require('../model/course');
const { query } = require('../util/mysql');
const { get } = require('../util/redis');
const route = new Router();

const getGrade = async ({ app }) => {
    route.get('/getgrade', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        await query("SELECT * FROM `sdumanager`.`grade` WHERE `userID` = ?", [userID])
            .then(
                async rows => {
                    var resdata = [];
                    for (let i = 0; i < rows.length; i++) {
                        let { courseID, grade } = rows[i];
                        let { courseName, credit } = await course(courseID);
                        resdata.push({ courseID, grade, courseName, credit });
                    }
                    ctx.body = {
                        code: 0,
                        message: 'success',
                        data: resdata
                    };
                }
            ).catch(
                err => {
                    console.error(err);
                    ctx.body = {
                        code: -1,
                        message: err.toString()
                    }
                }
            );
    });
    app.use(route.routes()).use(route.allowedMethods());
}
module.exports = getGrade;