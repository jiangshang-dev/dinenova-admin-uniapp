import request from '@/utils/request'

export function getRefundList(query) {
  return request({ url: 'backendApi/refund/list', method: 'get', params: query })
}

export function getRefundInfo(refundId) {
  return request({ url: 'backendApi/refund/info/' + refundId, method: 'get' })
}

export function doRefund(data) {
  return request({ url: 'backendApi/refund/doRefund', method: 'post', data })
}
