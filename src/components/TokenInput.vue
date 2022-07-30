<script setup lang="ts">
  import { getOSSInfo } from '@/api'
  import { useAppStore } from '@/store/token'
  import OOS from '@/utils/OSS'
  import { ref } from 'vue'

  const emit = defineEmits(['update:token'])
  // (() => { return document.cookie.split('; _utoken=')[1] })()

  const appStore = useAppStore()
  const uToken = ref('')
  const message = useMessage()

  const onSubmit = async () => {
    const token = uToken.value
    const res = await getOSSInfo(token)
    if (!res.value) {
      message.warning('token 无效')
      return
    }
    appStore.token = token
    appStore.ossInstance = new OOS(res.value)
    emit('update:token', token)
  }
</script>

<template>
  <n-input-group>
    <n-input v-model:value="uToken" :style="{ width: '50%' }" />
    <n-button type="primary" @click="onSubmit"> 提交 </n-button>
  </n-input-group>
</template>

<style scoped></style>
