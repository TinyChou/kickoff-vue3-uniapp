<template>
  <view>
    Vertical Scroll
    <text>\n纵向滚动</text>
  </view>
  <view>
    <scroll-view
      :scroll-top="scrollTop"
      :scroll-y="true"
      class="h-40"
      @scrolltoupper="handleScrollTop"
      @scrolltolower="handleScrollBottom"
      @scroll="handleScroll"
    >
      <view class="h-40 w-full bg-red ndj-text-center color-white">A</view>
      <view class="h-40 w-full bg-green ndj-text-center color-white">B</view>
      <view class="h-40 w-full bg-blue ndj-text-center color-white">C</view>
    </scroll-view>
    <view @tap="handleScrollToTop" class="color-blue text-center"> 点击这里返回顶部 </view>
    <view>
      Horizontal Scroll
      <text>\n横向滚动</text>
    </view>
    <view>
      <scroll-view class="h-40 whitespace-nowrap" :scroll-x="true">
        <view class="h-40 w-full inline-block bg-red color-white">A</view>
        <view class="h-40 w-full inline-block bg-green color-white">B</view>
        <view class="h-40 w-full inline-block bg-blue color-white">C</view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue'

const scrollTop = ref(0)
const oldScrollTop = ref(0)

function handleScrollTop() {}
function handleScrollBottom() {}
function handleScroll(e: any) {
  scrollTop.value = e.detail.scrollTop
}
function handleScrollToTop() {
  scrollTop.value = oldScrollTop.value
  nextTick(() => (scrollTop.value = 0))
}
</script>
<style scoped>
.ndj-text-center {
  --at-apply: flex items-center justify-center;
}
</style>
