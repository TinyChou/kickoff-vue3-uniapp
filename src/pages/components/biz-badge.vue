<template>
  <ndj-badge
    text="100"
    size="normal"
    type="error"
    :inverted="true"
    :maxNum="99"
    absolute="rightTop"
    :isDot="false"
    @change="handleChange"
  >
    <slot />
  </ndj-badge>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['change'])
const handleChange = () => {
  console.log('emit change in biz badge')
  emit('change')
}
</script>
