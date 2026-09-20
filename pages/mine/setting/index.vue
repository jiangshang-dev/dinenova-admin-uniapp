<template>
  <view class="setting-container" :style="{height: `${windowHeight}px`}">
    <view class="menu-list">
      <view class="list-cell">
        <view class="menu-item-box" style="justify-content: space-between; width: 100%;">
          <view style="display:flex;align-items:center;">
            <view class="iconfont icon-service menu-icon"></view>
            <view>新订单语音提醒</view>
          </view>
          <switch :checked="voiceOn" color="#e85d04" @change="onVoiceChange" />
        </view>
      </view>
      <view class="list-cell list-cell-arrow" @click="handleToPwd">
        <view class="menu-item-box">
          <view class="iconfont icon-password menu-icon"></view>
          <view>修改密码</view>
        </view>
      </view>
      <view class="list-cell list-cell-arrow" @click="handleCleanTmp">
        <view class="menu-item-box">
          <view class="iconfont icon-clean menu-icon"></view>
          <view>清理缓存</view>
        </view>
      </view>
    </view>
    <view class="cu-list menu">
      <view class="cu-item item-box">
        <view class="content text-center" @click="handleLogout">
          <text class="text-black">退出登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { isVoiceEnabled, setVoiceEnabled } from '@/utils/orderVoice'

export default {
  data() {
    return {
      windowHeight: uni.getSystemInfoSync().windowHeight,
      voiceOn: true
    }
  },
  onShow() {
    this.voiceOn = isVoiceEnabled()
  },
  methods: {
    onVoiceChange(e) {
      this.voiceOn = !!e.detail.value
      setVoiceEnabled(this.voiceOn)
      this.$modal.msgSuccess(this.voiceOn ? '已开启语音提醒' : '已关闭语音提醒')
    },
    handleToPwd() {
      this.$tab.navigateTo('/pages/mine/pwd/index')
    },
    handleCleanTmp() {
      try {
        uni.clearStorageSync()
      } catch (e) {}
      this.$modal.msgSuccess('缓存已清理，请重新登录')
      this.$store.dispatch('LogOut').then(() => {
        this.$tab.reLaunch('/pages/login')
      })
    },
    handleLogout() {
      this.$modal.confirm('确定注销并退出系统吗？').then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$tab.reLaunch('/pages/login')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-box {
  background-color: #FFFFFF;
  margin: 30rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10rpx;
  border-radius: 8rpx;
  color: #303133;
  font-size: 32rpx;
}
</style>
