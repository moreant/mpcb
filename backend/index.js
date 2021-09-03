const serve = require('koa-static');
const route = require('koa-route');
const cors = require('koa-cors');
const Koa = require('koa');
const OOS = require('./OOS')

const app = new Koa();

app.use(cors({
  origin: '*',
  credentials: true
}));

const mzStorage = require('./MZStorage')

const getToken = async ctx => {
  const { token } = ctx.query
  ctx.response.type = 'json'
  ctx.response.body = await mzStorage.getOOSTOken(token)
}

const getDir = async ctx => {
  const { token } = ctx.query
  ctx.response.type = 'json'
  ctx.response.body = await mzStorage.getDir(token)
}

const getList = async ctx => {
  const { token, dirId } = ctx.query
  ctx.response.type = 'json'
  ctx.response.body = await mzStorage.getList(token, dirId)
}

const getImg = async ctx => {
  const { url, token } = ctx.query
  const { value } = await mzStorage.getOOSTOken(token)
  const oos = new OOS(value)
  ctx.response.body = {
    code: 200,
    value: await oos.getBuffer(url)
  }
}

app.use(route.get('/token.json', getToken))
app.use(route.get('/dir.json', getDir))
app.use(route.get('/list.json', getList))
app.use(route.get('/get_img.json', getImg))

app.use(serve(__dirname + '/dist'));

app.listen(3005);

console.log('listening on port 3005');