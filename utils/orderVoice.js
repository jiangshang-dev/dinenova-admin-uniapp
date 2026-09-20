/**
 * 新订单语音提醒：轮询 order/latest，震动 + 本地音效
 */
import { getLatestOrders } from '@/api/order'
import { getToken } from '@/utils/auth'

const VOICE_KEY = 'order_voice_enabled'
const LAST_ID_KEY = 'order_voice_last_id'
const INTERVAL = 6000

let timer = null
let audio = null
let polling = false

export function isVoiceEnabled() {
  const v = uni.getStorageSync(VOICE_KEY)
  return v === '' || v === undefined || v === null ? true : !!v
}

export function setVoiceEnabled(enabled) {
  uni.setStorageSync(VOICE_KEY, !!enabled)
  if (enabled) {
    startOrderVoice()
  } else {
    stopOrderVoice()
  }
}

function ensureAudio() {
  if (audio) return audio
  audio = uni.createInnerAudioContext()
  audio.src = '/static/audio/new-order.mp3'
  audio.obeyMuteSwitch = false
  return audio
}

const listeners = []

export function onNewOrder(fn) {
  if (typeof fn === 'function' && listeners.indexOf(fn) === -1) listeners.push(fn)
}

export function offNewOrder(fn) {
  const i = listeners.indexOf(fn)
  if (i > -1) listeners.splice(i, 1)
}

function notifyNewOrder(order) {
  try {
    uni.vibrateShort({})
  } catch (e) {}
  if (!isVoiceEnabled()) return
  try {
    const player = ensureAudio()
    player.stop()
    player.play()
  } catch (e) {}
  const sn = (order && (order.orderSn || order.id)) || ''
  uni.showToast({
    title: sn ? `新订单 ${sn}` : '您有新的订单',
    icon: 'none',
    duration: 2500
  })
  listeners.forEach(fn => {
    try { fn(order) } catch (e) {}
  })
}

function pickLatest(res) {
  const data = (res && res.data) || {}
  if (Array.isArray(data)) return data[0]
  if (Array.isArray(data.list)) return data.list[0]
  if (Array.isArray(data.dataList)) return data.dataList[0]
  if (data.orderInfo) return data.orderInfo
  if (data.id || data.orderSn) return data
  return null
}

function getOrderId(order) {
  if (!order) return ''
  return String(order.id || order.orderId || order.orderSn || '')
}

async function pollOnce() {
  if (!getToken() || polling) return
  polling = true
  try {
    const res = await getLatestOrders({})
    const order = pickLatest(res)
    const id = getOrderId(order)
    if (!id) return
    const last = uni.getStorageSync(LAST_ID_KEY) || ''
    if (!last) {
      uni.setStorageSync(LAST_ID_KEY, id)
      return
    }
    if (id !== last) {
      uni.setStorageSync(LAST_ID_KEY, id)
      notifyNewOrder(order)
    }
  } catch (e) {
    // 静默失败，避免打扰
  } finally {
    polling = false
  }
}

export function startOrderVoice() {
  if (!getToken()) return
  stopOrderVoice(false)
  pollOnce()
  timer = setInterval(pollOnce, INTERVAL)
}

export function stopOrderVoice(clearAudio = true) {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  if (clearAudio && audio) {
    try {
      audio.stop()
      audio.destroy()
    } catch (e) {}
    audio = null
  }
}
