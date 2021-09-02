import request from '../utils/request'

const getInfo = token => {
  return request.get('/token.json', {
    params: { token }
  })
}

export { getInfo }