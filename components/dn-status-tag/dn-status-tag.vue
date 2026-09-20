<template>
  <text class="dn-tag" :class="'dn-tag--' + tone">{{ label }}</text>
</template>

<script>
export default {
  name: 'DnStatusTag',
  props: {
    label: { type: String, default: '' },
    tone: { type: String, default: 'default' } // success warn danger primary default
  }
}
</script>

<style scoped>
.dn-tag {
  display: inline-block;
  padding: 4rpx 14rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  line-height: 1.4;
}
.dn-tag--default { background: #f2f3f5; color: #666; }
.dn-tag--primary { background: #fff1e8; color: #e85d04; }
.dn-tag--success { background: #e8f8ef; color: #1a9f5c; }
.dn-tag--warn { background: #fff8e6; color: #c98900; }
.dn-tag--danger { background: #ffecec; color: #d64545; }
</style>
