import request from '@/utils/request'

export function getOpenGiftList(query) {
  return request({ url: 'backendApi/openGift/list', method: 'get', params: query })
}

export function updateOpenGiftStatus(id, status) {
  return request({ url: 'backendApi/openGift/updateStatus', method: 'post', data: { id, status } })
}
