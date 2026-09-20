import request from '@/utils/request'

export function getSettlementList(query) {
  return request({ url: 'backendApi/settlement/list', method: 'get', params: query })
}

export function getSettlementInfo(query) {
  return request({ url: 'backendApi/settlement/info/', method: 'get', params: query })
}

export function doSubmit(data) {
  return request({ url: 'backendApi/settlement/doSubmit', method: 'post', data })
}

export function doConfirm(data) {
  return request({ url: 'backendApi/settlement/doConfirm', method: 'post', data })
}
