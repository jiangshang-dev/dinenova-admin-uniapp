import request from '@/utils/request'

export function getStatisticData(query) {
  return request({ url: 'backendApi/home/statistic', method: 'get', params: query })
}

export function getHomeData() {
  return request({ url: 'backendApi/home/index', method: 'get' })
}

export function getMainData(params) {
  return request({ url: 'backendApi/statistic/main', method: 'post', data: params })
}

export function getTopData(params) {
  return request({ url: 'backendApi/statistic/top', method: 'post', data: params })
}

export function getTotalMember() {
  return request({ url: 'backendApi/statistic/totalMember', method: 'get' })
}
