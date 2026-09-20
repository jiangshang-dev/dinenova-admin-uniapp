<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <view class="header-section">
      <view class="flex padding justify-between">
        <view class="flex align-center">
          <view v-if="!avatar" class="cu-avatar xl round bg-white">
            <view class="iconfont icon-people text-gray icon"></view>
          </view>
          <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix"></image>
          <view v-if="!name" @click="handleToLogin" class="login-tip">点击登录</view>
          <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">{{ name }}</view>
            <view class="u_sub">{{ storeName || merchantName || '商户管理员' }}</view>
          </view>
        </view>
        <view @click="handleToSetting" class="flex align-center">
          <text>设置</text>
          <view class="iconfont icon-right"></view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <view class="mine-actions grid col-4 text-center">
        <view class="action-item" @click="go('/pages/order/index', true)">
          <view class="iconfont icon-form text-orange icon"></view>
          <text class="text">订单</text>
        </view>
        <view class="action-item" @click="go('/pages/coupon/confirm')">
          <view class="iconfont icon-scan text-green icon"></view>
          <text class="text">核销</text>
        </view>
        <view class="action-item" @click="go('/pages/balance/recharge')">
          <view class="iconfont icon-moneybag text-blue icon"></view>
          <text class="text">充值</text>
        </view>
        <view class="action-item" @click="go('/pages/member/list')">
          <view class="iconfont icon-friendfill text-mauve icon"></view>
          <text class="text">会员</text>
        </view>
      </view>

      <view class="menu-list">
        <view class="list-cell list-cell-arrow" @click="handleToEditInfo">
          <view class="menu-item-box">
            <view class="iconfont icon-user menu-icon"></view>
            <view>编辑资料</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleToSetting">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>应用设置</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleAbout">
          <view class="menu-item-box">
            <view class="iconfont icon-aixin menu-icon"></view>
            <view>关于我们</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.user.name
    }
  },
  computed: {
    avatar() {
      return this.$store.state.user.avatar
    },
    storeName() {
      return this.$store.state.user.storeName
    },
    merchantName() {
      return this.$store.state.user.merchantName
    },
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight - 50
    }
  },
  onShow() {
    this.name = this.$store.state.user.name
  },
  methods: {
    go(url, tab) {
      if (tab) uni.switchTab({ url })
      else uni.navigateTo({ url })
    },
    handleToInfo() {
      this.$tab.navigateTo('/pages/mine/info/index')
    },
    handleToEditInfo() {
      this.$tab.navigateTo('/pages/mine/info/edit')
    },
    handleToSetting() {
      this.$tab.navigateTo('/pages/mine/setting/index')
    },
    handleToLogin() {
      this.$tab.reLaunch('/pages/login')
    },
    handleToAvatar() {
      this.$tab.navigateTo('/pages/mine/avatar/index')
    },
    handleAbout() {
      this.$tab.navigateTo('/pages/mine/about/index')
    }
  }
}
</script>

<style lang="scss">
page { background-color: #f5f6f7; }
.mine-container {
  width: 100%;
  height: 100%;
  .header-section {
    padding: 15px 15px 45px 15px;
    background: linear-gradient(135deg, #ff8a4c, #e85d04);
    color: white;
    .login-tip { font-size: 18px; margin-left: 10px; }
    .cu-avatar {
      border: 2px solid #eaeaea;
      .icon { font-size: 40px; }
    }
    .user-info {
      margin-left: 15px;
      .u_title { font-size: 18px; line-height: 28px; font-weight: 600; }
      .u_sub { font-size: 12px; opacity: 0.85; }
    }
  }
  .content-section {
    position: relative;
    top: -50px;
    .mine-actions {
      margin: 15px 15px;
      padding: 20px 0px;
      border-radius: 8px;
      background-color: white;
      .action-item {
        .icon { font-size: 28px; }
        .text { display: block; font-size: 13px; margin: 8px 0px; }
      }
    }
  }
}
</style>
