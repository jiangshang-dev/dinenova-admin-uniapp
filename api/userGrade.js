import request from '@/utils/request'

export function getUserGradeList(query) {
  return request({ url: 'backendApi/userGrade/list', method: 'get', params: query })
}

export function updateUserGradeStatus(userGradeId, status) {
  return request({ url: 'backendApi/userGrade/updateStatus', method: 'post', data: { userGradeId, status } })
}
