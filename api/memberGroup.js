import request from '@/utils/request'

export function getGroupList(query) {
  return request({ url: 'backendApi/memberGroup/list', method: 'get', params: query })
}

export function updateGroupStatus(id, status) {
  return request({ url: 'backendApi/memberGroup/updateStatus', method: 'post', data: { id, status } })
}
