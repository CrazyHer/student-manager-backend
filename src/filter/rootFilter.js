const auth = require('./auth');

const rootFilter = async (ctx, next) => {
    console.log("rootFilter");
    try {

        await auth(ctx);





    } catch (error) {
        console.error(error);
        ctx.body = {
            code: -1,
            message: error
        };
        return;
    }
    await next();
}
module.exports = () => rootFilter;