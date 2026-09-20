/**
 * 解析后台分页结构
 */
export function pickPage(res) {
  const data = (res && res.data) || {}
  const page =
    data.paginationResponse ||
    data.dataList ||
    data.page ||
    data
  const content = page.content || page.records || page.list || data.list || []
  const total = page.totalElements != null
    ? page.totalElements
    : (page.total != null ? page.total : content.length)
  return { content: Array.isArray(content) ? content : [], total: Number(total) || 0, raw: data }
}

export function money(v) {
  if (v === null || v === undefined || v === '') return '0.00'
  const n = Number(v)
  return isNaN(n) ? String(v) : n.toFixed(2)
}

export function orderStatusMeta(status) {
  const map = {
    A: { label: '待支付', tone: 'warn' },
    B: { label: '已支付', tone: 'primary' },
    C: { label: '已取消', tone: 'default' },
    D: { label: '已删除', tone: 'danger' },
    E: { label: '已发货', tone: 'primary' },
    F: { label: '已完成', tone: 'success' },
    G: { label: '已退款', tone: 'danger' }
  }
  return map[status] || { label: status || '-', tone: 'default' }
}

export function statusAN(status) {
  if (status === 'A' || status === '1' || status === 1) return { label: '启用', tone: 'success' }
  if (status === 'N' || status === '0' || status === 0) return { label: '禁用', tone: 'default' }
  return { label: status || '-', tone: 'default' }
}
