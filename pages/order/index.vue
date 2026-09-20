<template>
  <view class="page order-page">
    <view class="banner-new" v-if="newTip" @click="reload">{{ newTip }}</view>
    <scroll-view scroll-x class="seg">
      <view
        v-for="s in statusTabs"
        :key="s.value"
        class="seg-item"
        :class="{ active: status === s.value }"
        @click="changeStatus(s.value)"
      >{{ s.label }}</view>
    </scroll-view>
    <scroll-view
      scroll-y
      class="list"
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view v-for="item in list" :key="item.id" class="card" @click="goDetail(item)">
        <view class="card-top">
          <text class="card-title">{{ item.orderSn || ('订单#' + item.id) }}</text>
          <dn-status-tag :label="meta(item).label" :tone="meta(item).tone" />
        </view>
        <view class="card-sub">金额 ¥{{ money(item.amount || item.payAmount) }} · {{ item.typeName || item.orderMode || '' }}</view>
        <view class="card-sub">{{ item.userName || item.mobile || '散客' }} · {{ item.createTime || '' }}</view>
      </view>
      <dn-empty v-if="!loading && !list.length" text="暂无订单" />
      <view class="footer-tip" v-if="list.length">{{ finished ? '没有更多了' : (loading ? '加载中...' : '上拉加载') }}</view>
    </scroll-view>
  </view>
</template>

<script>
import { getOrderList } from '@/api/order'
import { pickPage, money, orderStatusMeta } from '@/utils/biz'
import { onNewOrder, offNewOrder } from '@/utils/orderVoice'

export default {
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      finished: false,
      refreshing: false,
      status: '',
      newTip: '',
      statusTabs: [
        { label: '全部', value: '' },
        { label: '待支付', value: 'A' },
        { label: '已支付', value: 'B' },
        { label: '已完成', value: 'F' },
        { label: '已取消', value: 'C' }
      ]
    }
  },
  onShow() {
    this.reload()
    this._newOrderHandler = (order) => {
      this.handleNewOrder(order)
    }
    onNewOrder(this._newOrderHandler)
  },
  onHide() {
    offNewOrder(this._newOrderHandler)
  },
  methods: {
    money,
    meta(item) {
      return orderStatusMeta(item.status)
    },
    handleNewOrder(order) {
      const sn = (order && (order.orderSn || order.id)) || ''
      this.newTip = sn ? `有新订单 ${sn}，点击刷新` : '有新订单，点击刷新'
    },
    changeStatus(v) {
      this.status = v
      this.reload()
    },
    goDetail(item) {
      uni.navigateTo({ url: '/pages/order/detail?id=' + item.id })
    },
    async fetchList() {
      if (this.loading || this.finished) return
      this.loading = true
      try {
        const res = await getOrderList({
          page: this.page,
          pageSize: this.pageSize,
          status: this.status
        })
        const { content, total } = pickPage(res)
        this.total = total
        this.list = this.page === 1 ? content : this.list.concat(content)
        if (this.list.length >= total || content.length < this.pageSize) this.finished = true
        else this.page += 1
      } catch (e) {
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },
    reload() {
      this.newTip = ''
      this.page = 1
      this.finished = false
      this.list = []
      this.fetchList()
    },
    loadMore() {
      this.fetchList()
    },
    onRefresh() {
      this.refreshing = true
      this.reload()
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
.order-page .list {
  height: calc(100vh - 120rpx);
}
</style>
