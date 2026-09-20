<template>
  <view class="work">
    <view v-for="(g, gi) in groups" :key="gi">
      <view class="group-title">{{ g.title }}</view>
      <view class="quick-grid">
        <view class="quick-item" v-for="(item, i) in g.items" :key="i" @click="go(item)">
          <view class="quick-icon" :style="{ background: item.color }">{{ item.short }}</view>
          <text class="quick-text">{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      groups: [
        {
          title: '会员管理',
          items: [
            { name: '会员列表', short: '列', color: '#e85d04', url: '/pages/member/list' },
            { name: '会员分组', short: '组', color: '#f4a261', url: '/pages/member/group' },
            { name: '会员等级', short: '级', color: '#e9c46a', url: '/pages/member/grade' },
            { name: '开卡赠礼', short: '礼', color: '#2a9d8f', url: '/pages/member/openGift' },
            { name: '会员设置', short: '设', color: '#457b9d', url: '/pages/member/setting' }
          ]
        },
        {
          title: '卡券管理',
          items: [
            { name: '分组管理', short: '组', color: '#e76f51', url: '/pages/coupon/group' },
            { name: '卡券列表', short: '券', color: '#e85d04', url: '/pages/coupon/list' },
            { name: '卡券核销', short: '核', color: '#2a9d8f', url: '/pages/coupon/confirm' },
            { name: '会员卡券', short: '持', color: '#457b9d', url: '/pages/coupon/user' },
            { name: '核销流水', short: '流', color: '#6c757d', url: '/pages/coupon/confirmLog' },
            { name: '发券记录', short: '发', color: '#f4a261', url: '/pages/coupon/sendLog' },
            { name: '转赠记录', short: '转', color: '#adb5bd', url: '/pages/coupon/give' }
          ]
        },
        {
          title: '订单管理',
          items: [
            { name: '订单列表', short: '订', color: '#e85d04', url: '/pages/order/index', tab: true },
            { name: '售后订单', short: '售', color: '#e76f51', url: '/pages/order/refund' },
            { name: '交易设置', short: '交', color: '#457b9d', url: '/pages/order/trade' },
            { name: '订单结算', short: '结', color: '#2a9d8f', url: '/pages/order/settlement' }
          ]
        },
        {
          title: '商品管理',
          items: [
            { name: '商品分类', short: '类', color: '#f4a261', url: '/pages/goods/cate' },
            { name: '商品列表', short: '品', color: '#e85d04', url: '/pages/goods/list' },
            { name: '库存管理', short: '库', color: '#2a9d8f', url: '/pages/goods/stock' }
          ]
        },
        {
          title: '积分 / 充值',
          items: [
            { name: '积分设置', short: '积', color: '#e9c46a', url: '/pages/point/setting' },
            { name: '积分明细', short: '明', color: '#f4a261', url: '/pages/point/list' },
            { name: '充值设置', short: '设', color: '#457b9d', url: '/pages/balance/setting' },
            { name: '余额明细', short: '余', color: '#6c757d', url: '/pages/balance/list' },
            { name: '会员充值', short: '充', color: '#2a9d8f', url: '/pages/balance/recharge' }
          ]
        },
        {
          title: '数据统计',
          items: [
            { name: '数据看板', short: '板', color: '#e85d04', url: '/pages/index', tab: true }
          ]
        }
      ]
    }
  },
  methods: {
    go(item) {
      if (item.tab) uni.switchTab({ url: item.url })
      else uni.navigateTo({ url: item.url })
    }
  }
}
</script>

<style scoped>
@import '@/static/scss/biz.scss';
.work {
  min-height: 100vh;
  background: #f5f6f8;
  padding: 8rpx 24rpx 48rpx;
}
.quick-grid {
  margin-bottom: 8rpx;
}
</style>
