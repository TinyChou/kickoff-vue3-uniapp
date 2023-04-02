<template>
  <match-media :min-width="375" :max-width="800">
    <view>当页面最小宽度 375px，页面宽度最大 800px 时显示</view>
  </match-media>
  <match-media :min-width="400" orientation="landscape">
    <view>当页面不小于 400px，且屏幕方向为横向时显示</view>
  </match-media>
</template>
