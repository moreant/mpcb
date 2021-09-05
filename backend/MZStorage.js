const axios = require('axios');
const qs = require('qs')

axios.interceptors.response.use(res => {
  const { data } = res
  return data
})

const flymeApi = {
  token: 'https://mzstorage.meizu.com/file/get_sig',
  dir: 'https://mzstorage.meizu.com/album/dir/list',
  list: 'https://mzstorage.meizu.com/album/list'
}


const getOOSTOken = token => {
  const data = {
    type: '2',
    token
  }
  return axios.post(flymeApi.token, qs.stringify(data))
}

const getDir = token => {
  const data = {
    token,
    limit: 100,
    offset: 0,
    order: 1
  }
  return axios.post(flymeApi.dir, qs.stringify(data))
}

const getList = (token, dirId) => {
  const data = {
    token,
    limit: 10000,
    order: 1,
    dirId
  }
  return axios.post(flymeApi.list, qs.stringify(data))
}



module.exports = { getOOSTOken, getDir, getList }