<script setup lang="ts">
  import { getDir } from '@/api'
  import { MenuOption } from 'naive-ui'
  import { Ref } from 'vue'

  const activeKey = ref('')
  const menuOptions: Ref<MenuOption[]> = ref([])

  const init = async () => {
    const res = await getDir()
    if (!res.value) {
      return
    }
    menuOptions.value = res.value?.dir.map((item) => {
      return {
        label: `${item.dirName}(${item.fileNum})`,
        key: item.id + ''
      }
    })
  }

  init()
</script>

<template>
  <div>
    <div class="w-52">
      <n-menu v-model:value="activeKey" :options="menuOptions" />
    </div>
  </div>
</template>

<style scoped></style>
