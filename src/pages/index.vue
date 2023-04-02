<script setup lang="ts">
const list = [
  { name: 'font', path: '/pages/font/index' },
  { name: 'size', path: '/pages/size' },
  { name: 'shadow', path: '/pages/shadow' },
  { name: 'border', path: '/pages/border/index' },
  { name: 'spacing', path: '/pages/spacing' },
  { name: 'shortcuts', path: '/pages/shortcuts' },
  { name: ':class', path: '/pages/class' },
  { name: 'color', path: '/pages/color' },
  { name: 'attributify', path: '/pages/attributify-mode' },
  { name: 'animation', path: '/pages/animation' },
  { name: 'bg', path: '/pages/bg' },
  { name: 'first-last', path: '/pages/first-last' },
  { name: 'odd-even', path: '/pages/odd-even' },
  { name: 'space-x', path: '/pages/space' },
  { name: 'divide-x', path: '/pages/divide' },
  { name: 'apply', path: '/pages/apply' },
  { name: 'uniui-test', path: '/pages/uni-ui/test' },
  { name: 'uni-app', path: '/pages/uni-app/index' },
]
const to = (to: string) => {
  uni.navigateTo({
    url: to,
  })
}
</script>

<template>
  <view class="py-3">
    <view class="grid grid-cols-3 justify-items-center">
      <view v-for="(item, index) in list" :key="index" class="w-20 h-20 shadow-md rounded-md" @click="to(item.path)">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>
