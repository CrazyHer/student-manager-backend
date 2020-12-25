
const rootController = async (ctx, next) => {
    console.log("rootController")
    try {



    } catch (error) {
        //返回输出错误响应
        console.error(error);
        ctx.body = {
            code: -1,
            message: error
        };
        return;
    }
    await next();
}

module.exports = () => rootController;