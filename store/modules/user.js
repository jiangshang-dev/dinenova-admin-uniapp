import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { startOrderVoice, stopOrderVoice } from '@/utils/orderVoice'

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
    merchantId: storage.get('merchantId') || '',
    merchantName: storage.get('merchantName') || '',
    storeId: storage.get('storeId') || '',
    storeName: storage.get('storeName') || ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
    SET_MERCHANT_ID: (state, merchantId) => {
      state.merchantId = merchantId
      storage.set('merchantId', merchantId)
    },
    SET_MERCHANT_NAME: (state, merchantName) => {
      state.merchantName = merchantName
      storage.set('merchantName', merchantName)
    },
    SET_STORE_ID: (state, storeId) => {
      state.storeId = storeId
      storage.set('storeId', storeId)
    },
    SET_STORE_NAME: (state, storeName) => {
      state.storeName = storeName
      storage.set('storeName', storeName)
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const captchaCode = userInfo.captchaCode || userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, captchaCode, uuid).then(res => {
          const token = (res.data && res.data.token) || res.token
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const data = res.data || {}
          const account = data.accountInfo || data.user || {}
          const avatar = account.avatar || '/static/images/profile.jpg'
          const username = account.accountName || account.userName || account.name || ''
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
            commit('SET_PERMISSIONS', data.permissions || [])
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
            commit('SET_PERMISSIONS', [])
          }
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          commit('SET_MERCHANT_ID', account.merchantId || '')
          commit('SET_MERCHANT_NAME', account.merchantName || '')
          commit('SET_STORE_ID', account.storeId || '')
          commit('SET_STORE_NAME', account.storeName || '')
          startOrderVoice()
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut({ commit }) {
      return new Promise((resolve) => {
        stopOrderVoice()
        logout().finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          commit('SET_MERCHANT_ID', '')
          commit('SET_MERCHANT_NAME', '')
          commit('SET_STORE_ID', '')
          commit('SET_STORE_NAME', '')
          removeToken()
          storage.clean()
          resolve()
        })
      })
    }
  }
}

export default user
