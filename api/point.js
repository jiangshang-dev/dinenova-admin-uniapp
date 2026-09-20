import request from '@/utils/request'

export function getPointList(query) {
  return request({ url: 'backendApi/point/list', method: 'get', params: query })
}

export function getSettingInfo() {
  return request({ url: 'backendApi/point/setting', method: 'get' })
}

export function saveSetting(data) {
  return request({ url: 'backendApi/point/saveSetting', method: 'post', data })
}

export function doRecharge(data) {
  return request({ url: 'backendApi/point/doRecharge', method: 'post', data })
}
