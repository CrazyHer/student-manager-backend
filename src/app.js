const koa = require('koa');
const { server_port } = require("./config.json");
const app = new koa();
const asyncmw = require('./middleware/asyncmw');

app.use(asyncmw());
app.use(async (ctx) => {
    ctx.body = "hello koa2!"
});

app.listen(server_port);
console.log(`服务器已经启动在${server_port}端口`);