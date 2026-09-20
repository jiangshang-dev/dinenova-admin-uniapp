import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 30000
const baseUrl = config.baseUrl

const request = (options) => {
  const isToken = (options.headers || {}).isToken === false
  options.header = options.header || {}
  if (getToken() && !isToken) {
    options.header['Access-Token'] = getToken()
  }
  options.header['platform'] = 'APP'
  options.header['Content-Type'] = options.header['Content-Type'] || 'application/json;charset=utf-8'

  if (options.params) {
    let url = options.url + '?' + tansParams(options.params)
    url = url.slice(0, -1)
    options.url = url
  }

  return new Promise((resolve, reject) => {
    uni.request({
      method: options.method || 'get',
      timeout: options.timeout || timeout,
      url: (options.baseUrl || baseUrl) + options.url,
      data: options.data,
      header: options.header,
      dataType: 'json'
    }).then(response => {
      let [error, res] = response
      if (error) {
        toast('后端接口连接异常')
        reject('后端接口连接异常')
        return
      }
      const code = res.data.code || 200
      const msg = errorCode[code] || res.data.message || res.data.msg || errorCode['default']
      if (code === 401) {
        showConfirm('登录状态已过期，请重新登录').then(r => {
          if (r.confirm) {
            store.dispatch('LogOut').then(() => {
              uni.reLaunch({ url: '/pages/login' })
            })
          }
        })
        reject('无效的会话，或者会话已过期，请重新登录。')
      } else if (code === 500) {
        toast(msg)
        reject(msg)
      } else if (code !== 200) {
        toast(msg)
        reject(code)
      } else {
        resolve(res.data)
      }
    }).catch(error => {
      let message = error.message || '请求失败'
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      } else if (message.indexOf('timeout') !== -1) {
        message = '系统接口请求超时'
      }
      toast(message)
      reject(error)
    })
  })
}

export default request
