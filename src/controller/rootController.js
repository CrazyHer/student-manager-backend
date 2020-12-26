const login = require("./login");
const register = require("./register");

const rootController = async (ctx, next) => {
    await register(ctx);
    await login(ctx);

    await next();
}

module.exports = () => rootController;