const koa = require('koa');
const { server_port } = require("./config.json");
const app = new koa();
const cors = require('koa2-cors');
const koabody = require('koa-body');
const rootController = require('./controller/rootController');
const rootFilter = require('./filter/rootFilter');

app.use(cors());
app.use(koabody());

app.use(rootFilter());
app.use(rootController());

app.listen(server_port);
console.log(`服务器已经启动在${server_port}端口`);