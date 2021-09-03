import request from '../utils/request'

const getInfo = token => {
  return request.get('/token.json', {
    params: { token }
  })
}

const getDir = token => {
  return request.get('/dir.json', {
    params: { token }
  })
}

const getList = (token, dirId) => {
  return request.get('/dir.json', {
    params: { token }
  })
}

const getImg = (token, url) => {
  return request.get('/get_img.json', {
    params: { token, url }
  })
}

export { getInfo, getDir, getImg }