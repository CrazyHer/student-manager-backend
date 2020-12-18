const log = (ctx) => { console.log(ctx.method, ctx.header.host + ctx.url) };
module.exports = () => {
    return async (ctx, next) => {
        await next();
        log(ctx);
    }
}