<template>
  <view class="dn-empty">
    <text class="dn-empty__icon">{{ icon }}</text>
    <text class="dn-empty__text">{{ text }}</text>
  </view>
</template>

<script>
export default {
  name: 'DnEmpty',
  props: {
    text: { type: String, default: '暂无数据' },
    icon: { type: String, default: '📭' }
  }
}
</script>

<style scoped>
.dn-empty {
  padding: 120rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dn-empty__icon {
  font-size: 64rpx;
  margin-bottom: 20rpx;
}
.dn-empty__text {
  color: #999;
  font-size: 28rpx;
}
</style>
