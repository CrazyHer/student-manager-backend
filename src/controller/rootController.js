const acvm = require("./acvm");
const editUserInfo = require("./edituserinfo");
const getCourse = require("./getcourse");
const getGrade = require("./getgrade");
const getUserInfo = require("./getuserinfo");
const login = require("./login");
const register = require("./register");
const selectCourse = require("./selectcourse");

const rootController = async (ctx, next) => {
    await register(ctx);
    await login(ctx);
    await getUserInfo(ctx);
    await editUserInfo(ctx);
    await getCourse(ctx);
    await selectCourse(ctx);
    await getGrade(ctx);
    await acvm(ctx);
    await next();
}

module.exports = () => rootController;