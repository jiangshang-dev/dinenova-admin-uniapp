<template>
  <view class="page">
    <view class="search-bar" v-if="showSearch">
      <input class="search-input" v-model="keyword" :placeholder="searchPlaceholder" confirm-type="search" @confirm="reload" />
      <view class="search-btn" @click="reload">搜索</view>
    </view>
    <scroll-view scroll-y class="list" @scrolltolower="loadMore" :refresher-enabled="true" :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
      <view v-for="(item, idx) in list" :key="idx" class="card" @click="onItem(item)">
        <view class="card-top">
          <text class="card-title">{{ titleOf(item) }}</text>
          <dn-status-tag v-if="statusOf(item)" :label="statusOf(item).label" :tone="statusOf(item).tone" />
        </view>
        <view class="card-sub" v-for="(line, i) in linesOf(item)" :key="i">{{ line }}</view>
      </view>
      <dn-empty v-if="!loading && !list.length" />
      <view class="footer-tip" v-if="list.length">{{ finished ? '没有更多了' : (loading ? '加载中...' : '上拉加载') }}</view>
    </scroll-view>
  </view>
</template>

<script>
import { pickPage, statusAN, money } from '@/utils/biz'
import { getConfirmLogList } from '@/api/coupon'

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
      keyword: '',
      showSearch: true,
      searchPlaceholder: '关键词'
    }
  },
  onShow() {
    this.reload()
  },
  methods: {
    titleOf(item) {
      return item.couponName || ('核销#' + item.id)
    },
    statusOf(item) {
      return { label: '已核销', tone: 'success' }
    },
    linesOf(item) {
      return ['会员 ' + (item.userName || item.mobile || '-'), item.createTime || '']
    },
    onItem(item) {
{}
    },
    buildQuery() {
      const q = { page: this.page, pageSize: this.pageSize }
      if (this.keyword) q.name = this.keyword
      if (this.keyword) q.keyword = this.keyword
      return q
    },
    async fetchList() {
      if (this.loading || this.finished) return
      this.loading = true
      try {
        const res = await getConfirmLogList(this.buildQuery())
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
</style>
