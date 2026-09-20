import request from '@/utils/request'

export function login(username, password, captchaCode, uuid) {
  return request({
    url: 'backendApi/login/doLogin',
    headers: { isToken: false },
    method: 'post',
    data: { username, password, captchaCode, uuid }
  })
}

export function getInfo() {
  return request({
    url: 'backendApi/login/getInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'backendApi/login/logout',
    method: 'post'
  })
}

export function getCodeImg() {
  return request({
    url: 'clientApi/captcha/getCode',
    headers: { isToken: false },
    method: 'get',
    timeout: 20000
  })
}
