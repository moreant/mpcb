<script setup lang="ts">
  import { getAlbumList, getDirList } from '@/api'
  import { downImgToDist } from '@/api/fs'
  import { useAppStore } from '@/store/token'
  import { Dir } from '@/types'
  import { MenuOption, NImage } from 'naive-ui'
  import { Ref } from 'vue'

  const appStore = useAppStore()

  const activeKey = ref('')
  const downloadPath = ref('')
  const menuOptions: Ref<MenuOption[]> = ref([])
  const dirList = ref<Dir[]>()

  const srcList: Array<{ url: string; src: string }> = []

  const getIcon = (url: string) => {
    const cacheSrc = srcList.find((item) => item.url === url)
    if (cacheSrc) {
      return cacheSrc.src
    }
    const src = appStore.ossInstance?.getUrl(url)
    if (src) {
      srcList.push({ url, src })
    }
    return src
  }

  const init = async () => {
    const res = await getDirList()
    if (!res.value) {
      return
    }
    dirList.value = res.value.dir
    menuOptions.value = res.value?.dir.map((item) => {
      return {
        label: `${item.dirName}(${item.fileNum})`,
        key: item.id + '',
        icon: () => h(NImage, { src: getIcon(item.icon), previewDisabled: true }, {})
      }
    })
  }

  const setDisablie = (disabled: boolean) => {
    menuOptions.value = menuOptions.value.map((item) => {
      item.disabled = disabled
      return item
    })
  }

  const dirInfo = computed(() =>
    dirList.value?.find((item) => item.id === parseInt(activeKey.value))
  )

  const getDownloadPath = async () => {
    let downloadDir = await window.ipcRenderer.invoke('GET_DOWNLOADS_PATH')
    const path = await window.ipcRenderer.invoke('OPEN_FILE_DIALOG', downloadDir)
    downloadPath.value = path[0]
  }

  const dirDownPath = computed(() =>
    downloadPath.value ? downloadPath.value + '/' + dirInfo.value?.dirName : ''
  )

  const downloadIng = ref(false)
  const downloadFinishNum = ref(0)

  const downloadImg = async () => {
    downloadFinishNum.value = 0
    const res = await getAlbumList(parseInt(activeKey.value), 10000)
    if (!res.value) {
      return
    }
    const fileList = res.value.file
    downloadIng.value = true
    setDisablie(true)
    await Promise.all(
      fileList.map((item) =>
        downImgToDist(dirDownPath.value, item.url, item.fileName).then(
          () => (downloadFinishNum.value += 1)
        )
      )
    )
    setDisablie(false)
    downloadIng.value = false
  }

  init()
</script>

<template>
  <div class="flex flex-row">
    <div class="w-52">
      <n-menu v-model:value="activeKey" :options="menuOptions" :disabled="downloadIng" />
    </div>
    <div class="">
      <n-statistic label="选择相册" :value="dirInfo?.dirName" />
      <n-statistic label="文件总数">
        <n-number-animation :from="0" :to="dirInfo?.fileNum"
      /></n-statistic>
      <n-statistic label="下载位置" :value="dirDownPath" />
      <n-space :vertical="true">
        <n-button v-if="activeKey && !downloadIng" @click="getDownloadPath">选择下载位置</n-button>
        <n-button v-if="downloadPath && !downloadIng" @click="downloadImg">开始下载</n-button>
      </n-space>
      <n-statistic v-if="downloadIng" label="下载状态" :value="downloadFinishNum">
        <template #suffix> / {{ dirInfo?.fileNum }} </template>
      </n-statistic>
      <div v-if="dirInfo?.fileNum === downloadFinishNum">下载完成</div>
    </div>
  </div>
</template>

<style scoped></style>
