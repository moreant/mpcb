const fs = require('fs');
const route = require('koa-route');
const cors = require('koa-cors');
const Koa = require('koa');
const OOS = require('./OOS')
const mzStorage = require('./MZStorage')

const app = new Koa();
let oos = new OOS()

fs.promises.mkdir(`down`).catch(e => { })


const getToken = async ctx => {
  const { token } = ctx.query
  ctx.response.type = 'json'
  const res = await mzStorage.getOOSTOken(token)
  if (res.code === 200) {
    oos = new OOS(res.value)
  }
  ctx.response.body = res
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
  ctx.response.body = {
    code: 200,
    value: await oos.getBuffer(url)
  }
}

const getImgList = async ctx => {
  const { urls, token } = ctx.query
  const urlList = urls.split(',')
  const { value } = await mzStorage.getOOSTOken(token)
  const reqList = urlList.map(item => oos.getBuffer(item))
  const resList = await Promise.all(reqList)
  ctx.response.body = {
    code: 200,
    value: resList
  }
}

const downImg = async ctx => {
  const { dir, fileName, url } = ctx.query
  await fs.promises.mkdir(`./down/${dir}`).catch(e => { })
  try {
    await oos.downImg(url, `./down/${dir}/${fileName}`)
    ctx.response.body = {
      code: 200,
      value: 'ok'
    }
  } catch (e) {
    console.log(e);
    ctx.response.body = {
      code: 500,
      value: e
    }
  }
}

app.use(route.get('/token.json', getToken))
app.use(route.get('/dir.json', getDir))
app.use(route.get('/list.json', getList))
app.use(route.get('/get_img.json', getImg))
app.use(route.get('/get_img_list.json', getImgList))
app.use(route.get('/down_img.json', downImg))

app.listen(3005);

console.log('listening on port 3005');