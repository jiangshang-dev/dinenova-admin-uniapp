import request from '@/utils/request'

export function getCouponList(query) {
  return request({ url: 'backendApi/coupon/list', method: 'get', params: query })
}

export function getCouponInfo(id) {
  return request({ url: 'backendApi/coupon/info/' + id, method: 'get' })
}

export function updateCouponStatus(id, status) {
  return request({ url: 'backendApi/coupon/updateStatus', method: 'post', data: { id, status } })
}

export function getConfirmInfo(data) {
  return request({ url: 'backendApi/doConfirm/info', method: 'post', data })
}

export function doConfirm(data) {
  return request({ url: 'backendApi/doConfirm/doConfirm', method: 'post', data })
}

export function getCouponGroupList(query) {
  return request({ url: 'backendApi/couponGroup/list', method: 'get', params: query })
}

export function getUserCouponList(query) {
  return request({ url: 'backendApi/userCoupon/list', method: 'get', params: query })
}

export function getConfirmLogList(query) {
  return request({ url: 'backendApi/confirmLog/list', method: 'get', params: query })
}

export function getSendLogList(query) {
  return request({ url: 'backendApi/sendLog/list', method: 'get', params: query })
}

export function getGiveList(query) {
  return request({ url: 'backendApi/give/list', method: 'get', params: query })
}
