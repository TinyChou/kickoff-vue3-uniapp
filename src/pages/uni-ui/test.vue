<template>
  <uni-badge text="1" class="apply"></uni-badge>
  <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
  <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
  <text>{{ counter.count }}</text>
  <text>{{ oX }}, {{ oY }}</text>
  <text class="primary">Primary</text>
  <text class="success">Success</text>
  <text class="warning">Warning</text>
  <text class="error">Error</text>
  <uni-breadcrumb>
    <uni-breadcrumb-item>首页</uni-breadcrumb-item>
    <uni-breadcrumb-item>首页</uni-breadcrumb-item>
    <uni-breadcrumb-item>首页</uni-breadcrumb-item>
  </uni-breadcrumb>
  <biz-badge @change="handleChange">BIZ.</biz-badge>
  <view v-for="(message, idx) of messagesToRender" :key="idx">{{ message }}</view>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/store/counter'
import { useMouse } from '@vueuse/core'
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { start, stop } from '@/utils/mock-socket'

const counter = useCounterStore()
function bindClick() {
  console.log('clicked!', counter.count)
  counter.increment()
}

const { x, y } = useMouse()
const oX = computed(() => Math.round(x.value))
const oY = computed(() => Math.round(y.value))

const handleChange = () => console.log('changed')

const cacheQueue: string[] = []
const MAX_CACHE = 1000

const messagesToRender: string[] = reactive([])
const INTERVAL_MS = 300
let intervalId: any

function startConsume() {
  stopConsume()

  intervalId = setInterval(() => {
    while (cacheQueue.length) {
      messagesToRender.push(cacheQueue.shift()!)
    }
  }, INTERVAL_MS)
}

function stopConsume() {
  if (intervalId) clearInterval(intervalId)
  intervalId = undefined
}

onMounted(() => {
  start((msg) => {
    while (cacheQueue.length >= MAX_CACHE) cacheQueue.shift()
    cacheQueue.push(msg)
  })

  startConsume()
})
onUnmounted(() => {
  stopConsume()
  stop()
})
</script>
<!-- <style scoped>

</style> -->
<style lang="scss" scoped>
@import '@/uni.scss';

.apply {
  --at-apply: w-60rpx h-60rpx;
}
.primary {
  color: $uni-color-primary;
  font-size: $uni-font-size-sm;
}
.success {
  color: $uni-color-success;
  font-size: $uni-font-size-base;
}
.warning {
  color: $uni-color-warning;
  font-size: $uni-font-size-lg;
  opacity: $uni-opacity-disabled;
}
.error {
  color: $uni-color-error;
}
</style>
