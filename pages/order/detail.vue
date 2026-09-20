<template>
  <view class="page" style="padding-bottom: 140rpx;">
    <view class="detail-card" v-if="info">
      <view class="card-top" style="margin-bottom: 20rpx;">
        <text class="card-title">{{ info.orderSn || ('订单#' + info.id) }}</text>
        <dn-status-tag :label="meta.label" :tone="meta.tone" />
      </view>
      <view class="detail-row" v-for="(row, i) in rows" :key="i">
        <text class="detail-label">{{ row.label }}</text>
        <text class="detail-value">{{ row.value }}</text>
      </view>
    </view>
    <view class="detail-card" v-if="goods.length">
      <view class="section-title" style="margin-top: 0;">商品明细</view>
      <view v-for="(g, i) in goods" :key="i" class="detail-row">
        <text class="detail-label">{{ g.goodsName || g.name }} x{{ g.num || g.buyNum || 1 }}</text>
        <text class="detail-value">¥{{ money(g.price || g.amount) }}</text>
      </view>
    </view>
    <dn-empty v-if="!loading && !info" text="订单不存在" />
    <view class="bottom-bar" v-if="info">
      <view class="btn-ghost" style="flex:1" @click="goRefund">售后</view>
      <view class="btn-primary" style="flex:1" v-if="canComplete" @click="setStatus('F')">完成订单</view>
    </view>
  </view>
</template>

<script>
import { getOrderInfo, updateOrderStatus } from '@/api/order'
import { money, orderStatusMeta } from '@/utils/biz'

export default {
  data() {
    return {
      id: '',
      info: null,
      goods: [],
      loading: false
    }
  },
  computed: {
    meta() {
      return orderStatusMeta(this.info && this.info.status)
    },
    rows() {
      const o = this.info || {}
      return [
        { label: '金额', value: '¥' + money(o.amount || o.payAmount) },
        { label: '会员', value: o.userName || o.mobile || '散客' },
        { label: '门店', value: o.storeName || '-' },
        { label: '下单时间', value: o.createTime || '-' },
        { label: '备注', value: o.remark || o.description || '-' }
      ]
    },
    canComplete() {
      return this.info && ['A', 'B', 'E'].includes(this.info.status)
    }
  },
  onLoad(q) {
    this.id = q.id
    this.load()
  },
  methods: {
    money,
    async load() {
      this.loading = true
      try {
        const res = await getOrderInfo(this.id)
        const data = res.data || {}
        this.info = data.orderInfo || data.order || data
        this.goods = data.goodsList || data.orderGoods || this.info.goods || []
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    goRefund() {
      uni.navigateTo({ url: '/pages/order/refund' })
    },
    setStatus(status) {
      uni.showModal({
        title: '确认',
        content: '确认将订单标记为完成？',
        success: async (r) => {
          if (!r.confirm) return
          await updateOrderStatus(this.id, status)
          this.$modal.msgSuccess('已更新')
          this.load()
        }
      })
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
</style>
