import request from '@/utils/request'

export function getMemberList(query) {
  return request({ url: 'backendApi/member/list', method: 'get', params: query })
}

export function getMemberInfo(memberId) {
  return request({ url: 'backendApi/member/info/' + memberId, method: 'get' })
}

export function getMemberSetting() {
  return request({ url: 'backendApi/member/setting', method: 'get' })
}

export function saveMemberSetting(data) {
  return request({ url: 'backendApi/member/saveSetting', method: 'post', data })
}

export function updateMemberStatus(userId, status) {
  return request({ url: 'backendApi/member/updateStatus', method: 'post', data: { userId, status } })
}

export function searchMembers(query) {
  return request({ url: 'backendApi/member/searchMembers', method: 'get', params: query })
}

export function saveMember(data) {
  return request({ url: 'backendApi/member/save', method: 'post', data })
}
