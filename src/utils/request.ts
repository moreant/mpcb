import axios from 'axios'
// @ts-ignore
import httpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = httpAdapter

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default axios
