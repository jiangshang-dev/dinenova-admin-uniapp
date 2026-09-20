<template>
  <view class="page">
    <view class="form-card">
      <view class="form-row">
        <text class="form-label">核销码</text>
        <input class="form-input" v-model="code" placeholder="扫码或输入券码" />
      </view>
    </view>
    <view style="padding: 24rpx; display: flex; gap: 16rpx;">
      <view class="btn-ghost" style="flex:1" @click="scan">扫一扫</view>
      <view class="btn-primary" style="flex:1" @click="query">查询</view>
    </view>
    <view class="detail-card" v-if="info">
      <view class="detail-row" v-for="(row, i) in rows" :key="i">
        <text class="detail-label">{{ row.label }}</text>
        <text class="detail-value">{{ row.value }}</text>
      </view>
      <view class="btn-primary" style="margin-top: 24rpx;" @click="confirm">确认核销</view>
    </view>
  </view>
</template>

<script>
import { getConfirmInfo, doConfirm } from '@/api/coupon'
import { money } from '@/utils/biz'

export default {
  data() {
    return { code: '', info: null }
  },
  computed: {
    rows() {
      const i = this.info || {}
      return [
        { label: '卡券', value: i.couponName || i.name || '-' },
        { label: '会员', value: i.userName || i.mobile || '-' },
        { label: '面额', value: money(i.amount) },
        { label: '状态', value: i.status || '-' }
      ]
    }
  },
  methods: {
    scan() {
      uni.scanCode({
        success: (res) => {
          this.code = res.result || ''
          this.query()
        },
        fail: () => {
          this.$modal.msgError('扫码失败，请手动输入')
        }
      })
    },
    async query() {
      if (!this.code) {
        this.$modal.msgError('请输入核销码')
        return
      }
      const res = await getConfirmInfo({ code: this.code, couponCode: this.code })
      this.info = (res.data && (res.data.userCoupon || res.data.info || res.data)) || null
      if (!this.info) this.$modal.msgError('未查询到卡券')
    },
    async confirm() {
      await doConfirm({ code: this.code, couponCode: this.code, userCouponId: this.info.id })
      this.$modal.msgSuccess('核销成功')
      this.info = null
      this.code = ''
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
</style>
