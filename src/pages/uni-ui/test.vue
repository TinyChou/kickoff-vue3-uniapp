<template>
  <uni-badge text="1"></uni-badge>
  <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
  <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
  <text>{{ counter.count }}</text>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/store/counter'

const counter = useCounterStore()
function bindClick() {
  console.log('clicked!', counter.count)
  counter.increment()
}
</script>
