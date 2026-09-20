<template>
  <view class="normal-login-container">
    <view class="logo-content align-center justify-center flex">
      <image style="width: 100rpx;height: 100rpx;" :src="globalConfig.appInfo.logo" mode="widthFix"></image>
      <text class="title">{{ globalConfig.appInfo.name }}</text>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon"></view>
        <input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon"></view>
        <input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <view class="captcha-row flex align-center" v-if="captchaEnabled">
        <view class="input-item captcha-input flex align-center">
          <view class="iconfont icon-code icon"></view>
          <input v-model="loginForm.captchaCode" type="text" class="input" placeholder="请输入验证码" maxlength="6" />
        </view>
        <view class="login-code" @click="getCode">
          <image :src="codeUrl" class="login-code-img" mode="aspectFit"></image>
        </view>
      </view>
      <view class="action-btn">
        <button @click="handleLogin" class="login-btn cu-btn block bg-orange lg round">登录</button>
      </view>
      <view class="xieyi text-center">
        <text class="text-grey1">与 PC 后台同一账号 · 同一套接口</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getCodeImg } from '@/api/login'
import { startOrderVoice } from '@/utils/orderVoice'

export default {
  data() {
    return {
      codeUrl: '',
      captchaEnabled: true,
      globalConfig: getApp().globalData.config,
      loginForm: {
        username: 'fuint',
        password: '123456',
        captchaCode: '',
        uuid: ''
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        const data = res.data || res
        this.captchaEnabled = data.captchaEnabled === undefined ? true : data.captchaEnabled
        if (this.captchaEnabled) {
          const img = data.captcha || data.img || ''
          this.codeUrl = img.indexOf('data:') === 0 ? img : ('data:image/gif;base64,' + img)
          this.loginForm.uuid = data.uuid || ''
        }
      }).catch(() => {
        this.captchaEnabled = false
      })
    },
    handleLogin() {
      if (!this.loginForm.username) return this.$modal.msgError('请输入账号')
      if (!this.loginForm.password) return this.$modal.msgError('请输入密码')
      if (this.captchaEnabled && !this.loginForm.captchaCode) return this.$modal.msgError('请输入验证码')
      this.$modal.loading('登录中...')
      this.$store.dispatch('Login', this.loginForm).then(() => {
        this.$modal.closeLoading()
        this.$store.dispatch('GetInfo').then(() => {
          startOrderVoice()
          this.$tab.reLaunch('/pages/index')
        })
      }).catch(() => {
        this.$modal.closeLoading()
        if (this.captchaEnabled) this.getCode()
      })
    }
  }
}
</script>

<style lang="scss">
page { background-color: #ffffff; }
.normal-login-container {
  width: 100%;
  .logo-content {
    width: 100%;
    font-size: 21px;
    text-align: center;
    padding-top: 15%;
    .title {
      margin-left: 10px;
      color: #222;
      font-weight: 700;
    }
  }
  .login-form-content {
    text-align: center;
    margin: 20px auto;
    margin-top: 15%;
    width: 80%;
    .input-item {
      margin: 20px auto;
      background-color: #f5f6f8;
      height: 45px;
      border-radius: 20px;
      .icon { font-size: 38rpx; margin-left: 10px; color: #999; }
      .input { width: 100%; font-size: 14px; line-height: 20px; text-align: left; padding-left: 15px; }
    }
    .captcha-row {
      margin: 20px auto;
      width: 100%;
      gap: 12px;
      .captcha-input {
        flex: 1;
        margin: 0;
        min-width: 0;
      }
      .login-code {
        flex-shrink: 0;
        width: 120px;
        height: 45px;
        border-radius: 12px;
        overflow: hidden;
        background: #f5f6f8;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-code-img {
          width: 120px;
          height: 45px;
        }
      }
    }
    .login-btn {
      height: 45px;
      background: #e85d04 !important;
    }
    .xieyi { margin-top: 24px; color: #999; font-size: 12px; }
  }
}
.bg-orange { background: #e85d04; color: #fff; }
</style>
