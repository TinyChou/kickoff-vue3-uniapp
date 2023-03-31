<template>
  <uni-badge text="1"></uni-badge>
  <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
  <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
</template>
<script setup lang="ts">
function bindClick() {}
</script>
