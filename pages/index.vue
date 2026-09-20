<template>
  <view class="home">
    <view class="hero">
      <view class="hero-top">
        <view>
          <view class="hello">{{ greet }}，{{ name || '店长' }}</view>
          <view class="sub">{{ storeName || merchantName || '仁信管理端' }}</view>
        </view>
        <view class="voice-pill" @click="toggleVoice">{{ voiceOn ? '语音开' : '语音关' }}</view>
      </view>
      <view class="stat-grid">
        <view class="stat-item" v-for="(s, i) in stats" :key="i">
          <view class="stat-num">{{ s.value }}</view>
          <view class="stat-label">{{ s.label }}</view>
        </view>
      </view>
    </view>

    <view class="body">
      <view class="section-title">快捷操作</view>
      <view class="quick-grid">
        <view class="quick-item" v-for="(q, i) in quicks" :key="i" @click="go(q.url, q.tab)">
          <view class="quick-icon" :style="{ background: q.color }">{{ q.short }}</view>
          <text class="quick-text">{{ q.name }}</text>
        </view>
      </view>

      <view class="section-title">今日概览</view>
      <view class="card" v-for="(row, i) in overview" :key="i">
        <view class="card-top">
          <text class="card-title">{{ row.label }}</text>
          <text class="ov-val">{{ row.value }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getStatisticData, getMainData } from '@/api/home'
import { money } from '@/utils/biz'
import { isVoiceEnabled, setVoiceEnabled, startOrderVoice } from '@/utils/orderVoice'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      voiceOn: true,
      stats: [
        { label: '今日营收', value: '0' },
        { label: '今日订单', value: '0' },
        { label: '新增会员', value: '0' },
        { label: '待处理', value: '0' }
      ],
      overview: [],
      quicks: [
        { name: '订单', short: '订', color: '#e85d04', url: '/pages/order/index', tab: true },
        { name: '核销', short: '核', color: '#f4a261', url: '/pages/coupon/confirm' },
        { name: '充值', short: '充', color: '#2a9d8f', url: '/pages/balance/recharge' },
        { name: '会员', short: '会', color: '#457b9d', url: '/pages/member/list' }
      ]
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      storeName: state => state.user.storeName,
      merchantName: state => state.user.merchantName
    }),
    greet() {
      const h = new Date().getHours()
      if (h < 11) return '早上好'
      if (h < 14) return '中午好'
      if (h < 18) return '下午好'
      return '晚上好'
    }
  },
  onShow() {
    this.voiceOn = isVoiceEnabled()
    if (getToken()) {
      startOrderVoice()
      this.load()
    }
  },
  methods: {
    toggleVoice() {
      this.voiceOn = !this.voiceOn
      setVoiceEnabled(this.voiceOn)
      this.$modal.msgSuccess(this.voiceOn ? '已开启新订单语音' : '已关闭语音提醒')
    },
    go(url, tab) {
      if (tab) uni.switchTab({ url })
      else uni.navigateTo({ url })
    },
    async load() {
      try {
        const res = await getStatisticData({})
        const d = res.data || {}
        this.stats = [
          { label: '今日营收', value: money(d.todayIncome || d.payAmount || d.amount || 0) },
          { label: '今日订单', value: String(d.todayOrderCount || d.orderCount || 0) },
          { label: '新增会员', value: String(d.todayMemberCount || d.memberCount || 0) },
          { label: '待处理', value: String(d.waitCount || d.unPaidCount || 0) }
        ]
        this.overview = [
          { label: '总会员', value: d.totalMember || d.memberTotal || '-' },
          { label: '总订单', value: d.totalOrder || d.orderTotal || '-' },
          { label: '本月营收', value: '¥' + money(d.monthIncome || d.monthAmount || 0) }
        ]
      } catch (e) {
        try {
          const res2 = await getMainData({})
          const d = res2.data || {}
          this.stats[0].value = money(d.payAmount || 0)
          this.stats[1].value = String(d.orderCount || 0)
        } catch (e2) {}
      }
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
.home { min-height: 100vh; background: #f5f6f8; }
.hero {
  padding: calc(var(--status-bar-height, 44px) + 24rpx) 28rpx 36rpx;
  background: linear-gradient(145deg, #ff8a4c 0%, #e85d04 55%, #c2410c 100%);
  border-radius: 0 0 40rpx 40rpx;
}
.hero-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28rpx; }
.hello { color: #fff; font-size: 40rpx; font-weight: 700; }
.sub { color: rgba(255,255,255,0.85); font-size: 24rpx; margin-top: 8rpx; }
.voice-pill {
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size: 22rpx;
  padding: 10rpx 20rpx;
  border-radius: 24rpx;
}
.body { padding: 8rpx 24rpx 40rpx; margin-top: -8rpx; }
.ov-val { color: #e85d04; font-weight: 700; font-size: 30rpx; }
</style>
