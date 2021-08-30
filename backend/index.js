const serve = require('koa-static');
const route = require('koa-route');
const Koa = require('koa');
const app = new Koa();

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

app.use(route.get('/token.json', getToken))
app.use(route.get('/dir.json', getDir))
app.use(route.get('/list.json', getList))

app.use(serve(__dirname + '/dist'));

app.listen(3005);

console.log('listening on port 3005');