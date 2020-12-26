const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { get } = require('../util/redis');
const route = new Router();

const selectCourse = async ({ app }) => {
    route.post('/selectcourse', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        let courses = JSON.parse(ctx.request.body.data);
        try {
            courses.forEach(async element => {
                await query("INSERT INTO `sdumanager`.`coursepick` (`courseID`, `userID`) VALUES (? , ?)", [element.courseID, userID]);
                await query("UPDATE `sdumanager`.`courselist` SET `remains` = `remains`-1 WHERE (`courseID` = ?)", [element.courseID]);
            });
            ctx.body = {
                code: 0,
                message: 'success'
            }
        } catch (error) {
            console.error(error);
            ctx.body = {
                code: -1,
                message: "err"
            }
        };

    });
    app.use(route.routes(), route.allowedMethods());
}
module.exports = selectCourse;