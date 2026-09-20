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
import { getSettingInfo, saveSetting } from '@/api/order'

export default {
  data() {
    return {
      form: {},
      fields: [
        { key: 'deliveryFee', label: '配送费', placeholder: '元' },
        { key: 'minAmount', label: '起送金额', placeholder: '元' },
        { key: 'remark', label: '交易说明', placeholder: '可选' }
      ]
    }
  },
  onShow() {
    this.load()
  },
  methods: {
    async load() {
      try {
        const res = await getSettingInfo()
        const data = (res.data && (res.data.setting || res.data)) || {}
        this.form = Object.assign({}, data)
      } catch (e) {}
    },
    async save() {
      await saveSetting(this.form)
      this.$modal.msgSuccess('保存成功')
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
</style>
