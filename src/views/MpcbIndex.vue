<script setup lang="ts">
  const token = ref('')
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 sm:px-6 md:px-8">
    <n-space vertical>
      <n-card title="设置 Token">
        <token-input @update:token="token = $event" />
      </n-card>
      <n-card v-if="token" title="下载">
        <album-list />
      </n-card>
    </n-space>
  </div>
</template>

<style scoped></style>
