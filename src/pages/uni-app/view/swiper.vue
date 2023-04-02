<template>
  <swiper
    circular
    :indicator-dots="indicatorDots"
    :autoplay="autoPlay"
    :interval="interval"
    :duration="duration"
    class="h-40"
  >
    <swiper-item>
      <view class="h-full overflow-hidden will-change-transform bg-red">A</view>
    </swiper-item>
    <swiper-item>
      <view class="h-full overflow-hidden will-change-transform bg-green">B</view>
    </swiper-item>
    <swiper-item>
      <view class="h-full overflow-hidden will-change-transform bg-blue">C</view>
    </swiper-item>
  </swiper>
  <view>
    <view>指示点</view>
    <switch :checked="indicatorDots" @change="handleToggleIndicator"></switch>
    <view>自动播放</view>
    <switch :checked="autoPlay" @change="handleToggleAutoPlay"></switch>
    <view>幻灯片切换时长: {{ duration }}</view>
    <slider @change="handleDurationChange" :value="duration" min="500" max="2000"></slider>
    <view>播放间隔时长: {{ interval }}</view>
    <slider @change="handleIntervalChange" :value="interval" min="2000" max="10000"></slider>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const indicatorDots = ref(true)
const autoPlay = ref(true)
const interval = ref(5000)
const duration = ref(2000)

function handleToggleIndicator() {
  indicatorDots.value = !indicatorDots.value
}
function handleToggleAutoPlay() {
  autoPlay.value = !autoPlay.value
}
function handleDurationChange(e: any) {
  duration.value = e.detail.value
}
function handleIntervalChange(e: any) {
  interval.value = e.detail.value
}
</script>
