import axios from 'axios'

const baseAxios = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000
})

baseAxios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }

  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default baseAxios

