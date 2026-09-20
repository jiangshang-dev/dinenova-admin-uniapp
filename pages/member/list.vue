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
import { getMemberList } from '@/api/member'

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
      searchPlaceholder: '姓名/手机号'
    }
  },
  onShow() {
    this.reload()
  },
  methods: {
    titleOf(item) {
      return item.name || item.mobile || ('会员#' + (item.id || ''))
    },
    statusOf(item) {
      return statusAN(item.status)
    },
    linesOf(item) {
      const lines = []
      if (item.mobile) lines.push('手机 ' + item.mobile)
      if (item.groupName) lines.push('分组 ' + item.groupName)
      if (item.balance != null) lines.push('余额 ¥' + money(item.balance))
      if (item.point != null) lines.push('积分 ' + item.point)
      return lines
    },
    onItem(item) {
      uni.navigateTo({ url: '/pages/member/detail?id=' + item.id })
    },
    buildQuery() {
      const q = { page: this.page, pageSize: this.pageSize }
      if (this.keyword) { q.mobile = this.keyword; q.name = this.keyword }
      return q
    },
    async fetchList() {
      if (this.loading || this.finished) return
      this.loading = true
      try {
        const res = await getMemberList(this.buildQuery())
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
