import request from '@/utils/request'

export function getStockList(query) {
  return request({ url: 'backendApi/stock/list', method: 'get', params: query })
}

export function getStockInfo(id) {
  return request({ url: 'backendApi/stock/info/' + id, method: 'get' })
}
