import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_IS_MOCK === 'mock' ? 'https://www.fastmock.site/mock/6fcb874a89760d55eebabfa894e1312e/mpcb' : '/api'

let baseAxios = axios.create({
  baseURL: baseURL,
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
