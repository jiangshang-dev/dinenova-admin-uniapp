const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  merchantId: state => state.user.merchantId,
  merchantName: state => state.user.merchantName,
  storeId: state => state.user.storeId,
  storeName: state => state.user.storeName
}
export default getters
