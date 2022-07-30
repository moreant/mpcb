<script setup lang="ts">
  import { zhCN, dateZhCN } from 'naive-ui'
  import MpcbIndex from '@/views/MpcbIndex.vue'
</script>

<template>
  <n-config-provider preflight-style-disabled :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <mpcb-index />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
