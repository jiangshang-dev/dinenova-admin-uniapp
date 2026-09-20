<script>
import config from './config'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { startOrderVoice, stopOrderVoice } from '@/utils/orderVoice'

export default {
  onLaunch() {
    this.initApp()
  },
  onShow() {
    if (getToken()) startOrderVoice()
  },
  onHide() {
    // 小程序后台限制，降频：停止轮询，回到前台再启
    // #ifdef MP-WEIXIN
    stopOrderVoice(false)
    // #endif
  },
  methods: {
    initApp() {
      this.initConfig()
      // #ifdef H5
      this.checkLogin()
      // #endif
    },
    initConfig() {
      this.globalData.config = config
    },
    checkLogin() {
      if (!getToken()) {
        this.$tab.reLaunch('/pages/login')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/static/scss/index.scss';
@import '@/static/scss/biz.scss';
</style>
