const koa = require('koa');
const { server_port, HOST } = require("./config.json");
const app = new koa();
const cors = require('koa2-cors');
const koabody = require('koa-body');
const serve = require('koa-static');
const rootController = require('./controller/rootController');
const rootFilter = require('./filter/rootFilter');
global.projectRoot = __dirname;

app.use(cors());
app.use(serve('./public'));
app.use(koabody({ multipart: true, formLimit: '2mb', textLimit: '2mb', jsonLimit: '2mb' }));

app.use(rootFilter());
app.use(rootController());

app.listen(server_port);
console.log(`服务器已经启动在${server_port}端口`);