import request from '@/utils/request'

export function getBalanceList(query) {
  return request({ url: 'backendApi/balance/list', method: 'get', params: query })
}

export function getSettingInfo() {
  return request({ url: 'backendApi/balance/setting', method: 'get' })
}

export function saveSetting(data) {
  return request({ url: 'backendApi/balance/saveSetting', method: 'post', data })
}

export function doRecharge(data) {
  return request({ url: 'backendApi/balance/doRecharge', method: 'post', data })
}
