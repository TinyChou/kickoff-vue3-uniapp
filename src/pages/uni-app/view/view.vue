<template>
  <view>
    flex-direction: row
    <text>\n横向布局</text>
  </view>
  <view class="flex h-20">
    <view class="flex-1 bg-red ndj-text-center color-white">A</view>
    <view class="flex-1 bg-green ndj-text-center color-white">B</view>
    <view class="flex-1 bg-blue ndj-text-center color-white">C</view>
  </view>
  <view>
    flex-direction: column
    <text>\n纵向布局</text>
  </view>
  <view class="flex flex-col h-60">
    <view class="flex-1 bg-red ndj-text-center color-white">A</view>
    <view class="flex-1 bg-green ndj-text-center color-white">B</view>
    <view class="flex-1 bg-blue ndj-text-center color-white">C</view>
  </view>
</template>
<style scoped>
.ndj-text-center {
  --at-apply: flex items-center justify-center;
}
</style>
