<template>
  <view class="page" style="padding-bottom: 140rpx;">
    <view class="detail-card" v-if="info">
      <view class="detail-row" v-for="(row, i) in rows" :key="i">
        <text class="detail-label">{{ row.label }}</text>
        <text class="detail-value">{{ row.value }}</text>
      </view>
    </view>
    <dn-empty v-if="!loading && !info" />
    <view class="bottom-bar" v-if="info">
      <view class="btn-ghost" style="flex:1" @click="toggle">{{ info.status === 'A' ? '禁用' : '启用' }}</view>
      <view class="btn-primary" style="flex:1" @click="goRecharge">充值</view>
    </view>
  </view>
</template>

<script>
import { getMemberInfo, updateMemberStatus } from '@/api/member'
import { money, statusAN } from '@/utils/biz'

export default {
  data() {
    return { id: '', info: null, loading: false }
  },
  computed: {
    rows() {
      const m = this.info || {}
      const st = statusAN(m.status)
      return [
        { label: '姓名', value: m.name || '-' },
        { label: '手机', value: m.mobile || '-' },
        { label: '状态', value: st.label },
        { label: '余额', value: '¥' + money(m.balance) },
        { label: '积分', value: m.point != null ? m.point : '-' },
        { label: '分组', value: m.groupName || '-' },
        { label: '等级', value: m.gradeName || '-' },
        { label: '注册时间', value: m.createTime || '-' }
      ]
    }
  },
  onLoad(q) {
    this.id = q.id
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      try {
        const res = await getMemberInfo(this.id)
        this.info = (res.data && (res.data.memberInfo || res.data.userInfo || res.data)) || null
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    goRecharge() {
      uni.navigateTo({ url: '/pages/balance/recharge?memberId=' + this.id })
    },
    async toggle() {
      const next = this.info.status === 'A' ? 'N' : 'A'
      await updateMemberStatus(this.id, next)
      this.$modal.msgSuccess('已更新')
      this.load()
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
</style>
