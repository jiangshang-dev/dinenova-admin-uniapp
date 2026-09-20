<template>
  <view class="page">
    <view class="form-card">
      <view class="form-row" v-for="(row, i) in fields" :key="i">
        <text class="form-label">{{ row.label }}</text>
        <input class="form-input" v-model="form[row.key]" :placeholder="row.placeholder || '请输入'" />
      </view>
    </view>
    <view style="padding: 24rpx;">
      <view class="btn-primary" @click="save">保存设置</view>
    </view>
  </view>
</template>

<script>
import { getMemberSetting, saveMemberSetting } from '@/api/member'

export default {
  data() {
    return {
      form: {},
      fields: [
        { key: 'initPoint', label: '注册赠积分', placeholder: '0' },
        { key: 'initBalance', label: '注册赠余额', placeholder: '0' },
        { key: 'remark', label: '说明', placeholder: '可选' }
      ]
    }
  },
  onShow() { this.load() },
  methods: {
    async load() {
      try {
        const res = await getMemberSetting()
        this.form = Object.assign({}, (res.data && (res.data.setting || res.data)) || {})
      } catch (e) {}
    },
    async save() {
      await saveMemberSetting(this.form)
      this.$modal.msgSuccess('保存成功')
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
</style>
