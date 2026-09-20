import request from '@/utils/request'

export function getGoodsList(query) {
  return request({ url: 'backendApi/goods/goods/list', method: 'get', params: query })
}

export function getGoodsInfo(goodsId) {
  return request({ url: 'backendApi/goods/goods/info/' + goodsId, method: 'get' })
}

export function updateGoodsStatus(id, status) {
  return request({ url: 'backendApi/goods/goods/updateStatus', method: 'post', data: { id, status } })
}

export function getGoodsCateList(query) {
  return request({ url: 'backendApi/goods/cate/list', method: 'get', params: query })
}

export function updateGoodsCateStatus(id, status) {
  return request({ url: 'backendApi/goods/cate/updateStatus', method: 'post', data: { id, status } })
}
