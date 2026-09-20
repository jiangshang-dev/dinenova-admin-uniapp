<template>
  <view class="page">
    <view class="form-card">
      <view class="form-row">
        <text class="form-label">会员手机</text>
        <input class="form-input" v-model="form.mobile" placeholder="输入手机号后点查询" />
      </view>
      <view class="form-row" style="justify-content: flex-end;">
        <view class="btn-ghost lookup-btn" @click="lookup">查询会员</view>
      </view>
      <view class="member-box" v-if="member.id">
        <view class="member-name">{{ member.name || '会员' }}</view>
        <view class="member-meta">ID {{ member.id }} · 余额 ¥{{ balanceText }}</view>
      </view>
      <view class="form-row">
        <text class="form-label">变更类型</text>
        <view class="type-group">
          <text class="type-item" :class="{ active: form.type === '1' }" @click="form.type = '1'">增加</text>
          <text class="type-item" :class="{ active: form.type === '2' }" @click="form.type = '2'">扣减</text>
        </view>
      </view>
      <view class="form-row">
        <text class="form-label">变更金额</text>
        <input class="form-input" type="digit" v-model="form.amount" placeholder="元" />
      </view>
      <view class="form-row">
        <text class="form-label">备注</text>
        <input class="form-input" v-model="form.remark" placeholder="可选" />
      </view>
    </view>
    <view style="padding: 24rpx;">
      <view class="btn-primary" @click="submit">确认充值</view>
    </view>
  </view>
</template>

<script>
import { doRecharge } from '@/api/balance'
import { getMemberInfo, searchMembers, getMemberList } from '@/api/member'
import { money } from '@/utils/biz'

export default {
  data() {
    return {
      form: { mobile: '', amount: '', remark: '', type: '1' },
      member: { id: '', name: '', balance: 0 }
    }
  },
  computed: {
    balanceText() {
      return money(this.member.balance)
    }
  },
  onLoad(q) {
    if (q.memberId || q.userId) {
      this.loadById(q.memberId || q.userId)
    }
  },
  methods: {
    async loadById(id) {
      try {
        const res = await getMemberInfo(id)
        const info = (res.data && (res.data.memberInfo || res.data.userInfo || res.data)) || {}
        this.member = {
          id: info.id,
          name: info.name || '',
          balance: info.balance || 0,
          mobile: info.mobile || ''
        }
        if (info.mobile) this.form.mobile = info.mobile
      } catch (e) {
        this.$modal.msgError('会员不存在')
      }
    },
    async lookup() {
      if (!this.form.mobile) {
        this.$modal.msgError('请输入手机号')
        return
      }
      try {
        const res = await searchMembers({ keyword: this.form.mobile, mobile: this.form.mobile })
        const data = res.data || {}
        let list = data.memberList || data.list || data.content || []
        if (!Array.isArray(list) && data.memberInfo) list = [data.memberInfo]
        if (!list.length) {
          const res2 = await getMemberList({ page: 1, pageSize: 5, mobile: this.form.mobile })
          const page = (res2.data && (res2.data.paginationResponse || res2.data.dataList)) || {}
          list = page.content || []
        }
        if (!list.length) {
          this.member = { id: '', name: '', balance: 0 }
          this.$modal.msgError('未找到会员')
          return
        }
        const info = list[0]
        this.member = {
          id: info.id,
          name: info.name || '',
          balance: info.balance || 0,
          mobile: info.mobile || this.form.mobile
        }
        this.$modal.msgSuccess('已选中：' + (this.member.name || this.member.id))
      } catch (e) {
        this.$modal.msgError('查询失败')
      }
    },
    async submit() {
      if (!this.member.id) {
        this.$modal.msgError('请先查询并确认会员')
        return
      }
      if (!this.form.amount) {
        this.$modal.msgError('请输入变更金额')
        return
      }
      await doRecharge({
        userId: Number(this.member.id),
        amount: this.form.amount,
        type: Number(this.form.type),
        remark: this.form.remark || '后台充值'
      })
      this.$modal.msgSuccess('余额操作成功')
      this.form.amount = ''
      this.form.remark = ''
      this.loadById(this.member.id)
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
.lookup-btn {
  width: 220rpx;
  height: 64rpx;
  line-height: 64rpx;
  font-size: 26rpx;
  margin: 8rpx 0 16rpx;
}
.member-box {
  background: #fff7f0;
  border-radius: 12rpx;
  padding: 20rpx 24rpx;
  margin-bottom: 8rpx;
}
.member-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #e85d04;
}
.member-meta {
  font-size: 24rpx;
  color: #888;
  margin-top: 6rpx;
}
.type-group {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 16rpx;
}
.type-item {
  padding: 8rpx 28rpx;
  border-radius: 28rpx;
  background: #f5f6f8;
  color: #666;
  font-size: 26rpx;
}
.type-item.active {
  background: #fff1e8;
  color: #e85d04;
  font-weight: 600;
}
</style>
