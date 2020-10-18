import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import cookieHandler from './handleCookie'

axios.interceptors.request.use(
  (config) => {
    /**
     * 检查浏览器是否存储了token
     * 在请求头添加token做身份验证
     */
    const TOKEN = cookieHandler.getCookieValue('TOKEN')
    if (TOKEN) {
      config.headers['Authorization'] = TOKEN
    }
    return config
  },
  (err) => {
    const message = Vue.prototype.$message
    message.error('请求失败')
    return Promise.resolve(err)
  }
)
axios.interceptors.response.use(
  (data) => {
    if (data.status && data.status === 200 && data.data.status === 'error') {
      const message = Vue.prototype.$message
      message.error(data.data.msg)
      return
    }
    return data.data
  },
  (err) => {
    const message = Vue.prototype.$message
    if (err.response.status === 504 || err.response.status === 404) {
      message.error('服务器出错！')
    } else if (err.response.status == 403) {
      message.error('权限不足,请联系管理员!')
    } else {
      message.error('未知错误!')
    }
    return Promise.resolve(err)
  }
)

function get(url, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const defConfig = {
  'Content-Type': 'application/x-www-form-urlencoded',
}
function post(url, params = {}, config = defConfig) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params), config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { get, post }
