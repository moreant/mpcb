<script setup lang="ts">
  import { getOSSInfo } from '@/api'
  import { useAppStore } from '@/store/token'
  import OOS from '@/utils/OSS'
  import { ref } from 'vue'
  import copy from 'copy-to-clipboard'

  const emit = defineEmits(['update:token'])
  //  (() => { return document.cookie.split('; _utoken=').pop().split(';').shift() })()

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
    appStore.sig = res.value
    emit('update:token', token)
    await window.ipcRenderer.invoke('OSS_INIT', JSON.stringify(res.value))
  }

  const onCopyCode = () => {
    copy(`(() => { return document.cookie.split('; _utoken=').pop().split(';').shift() })()`)
  }
</script>

<template>
  <n-input-group>
    <n-button @click="onCopyCode">复制获取代码</n-button>
    <n-input v-model:value="uToken" :style="{ width: '50%' }" />
    <n-button type="primary" @click="onSubmit"> 提交 </n-button>
  </n-input-group>
</template>

<style scoped></style>
