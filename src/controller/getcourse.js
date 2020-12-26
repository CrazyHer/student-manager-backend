const Router = require('@koa/router');
const { query } = require('../util/mysql');
const { get } = require('../util/redis');
const route = new Router();

const getCourse = async ({ app }) => {
    route.get('/getcourse', async (ctx) => {
        let token = ctx.request.header.token;
        let userID = await get(token);
        let res = [];
        await query("SELECT * FROM sdumanager.courselist")
            .then(
                async rows => {
                    res = rows;
                    let pickedCourses = await query("SELECT * FROM `sdumanager`.`coursepick` WHERE `userID` = ?", [userID]);
                    //给每个选上的课加一个selected标签
                    pickedCourses.forEach(picked => {
                        res = res.map(course => {
                            if (picked.courseID === course.courseID) {
                                return {
                                    ...course,
                                    selected: true
                                }
                            }
                            return course;
                        });
                    });

                    res = res.map(row => {
                        if (row.selected === undefined) return { ...row, selected: false };
                        return row;
                    });

                    ctx.body = {
                        code: 0,
                        message: 'success',
                        data: res
                    };
                }
            ).catch(err => {
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
module.exports = getCourse;