import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: 'backendApi/order/list',
    method: 'post',
    data
  })
}

export function getOrderInfo(orderId) {
  return request({
    url: 'backendApi/order/info/' + orderId,
    method: 'get'
  })
}

export function updateOrderStatus(orderId, status) {
  return request({
    url: 'backendApi/order/updateStatus',
    method: 'post',
    data: { orderId, status }
  })
}

export function getLatestOrders(data) {
  return request({
    url: 'backendApi/order/latest',
    method: 'post',
    data: data || {}
  })
}

export function getSettingInfo() {
  return request({
    url: 'backendApi/order/setting',
    method: 'get'
  })
}

export function saveSetting(data) {
  return request({
    url: 'backendApi/order/saveSetting',
    method: 'post',
    data
  })
}

export function verifyOrder(data) {
  return request({
    url: 'backendApi/order/verify',
    method: 'post',
    data
  })
}
