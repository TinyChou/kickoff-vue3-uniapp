<template>
  <uni-badge v-bind="props">
    <text @click="handleClick">UI Component</text>
    <slot />
  </uni-badge>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'

interface Props {
  type?: 'info' | 'primary' | 'success' | 'warning' | 'error'
  inverted?: boolean
  isDot?: boolean
  maxNum?: number
  absolute?: 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom' | ''
  offset?: [number, number]
  text?: string | number
  size?: 'normal' | 'small'
  customStyle?: any
}

const props = withDefaults(defineProps<Props>(), {
  type: 'error',
  inverted: false,
  isDot: false,
  maxNum: 99,
  absolute: '',
  offset: () => [0, 0],
  text: '',
  size: 'small',
  customStyle: {},
})

const emit = defineEmits(['change'])

const handleClick = () => {
  console.log('emit change in ndj-badge')
  emit('change')
}
</script>
