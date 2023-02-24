<script setup lang="ts">
  import { getAlbumList, getDirList } from '@/api';
  import { useAppStore } from '@/store/token';
  import { Dir } from '@/types';
  import { ipcRenderer } from 'electron';
  import { MenuOption, NImage } from 'naive-ui';
import path from 'path';
  import { Ref } from 'vue';


  const appStore = useAppStore()

  const activeKey = ref('')
  const downloadPath = ref('')
  const listSize = 5
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

  // 计算过期时间
  const showExpiredTime = computed(() => {
    if (!appStore.ossInstance) {
      return ''
    }
    const day = appStore.ossInstance.getExpiredTimeDayjs()
    return day?.format('YYYY-MM-DD HH:mm:ss')
  })

  const dirInfo = computed(() =>
    dirList.value?.find((item) => item.id === parseInt(activeKey.value))
  )

  // 弹窗获取下载目录
  const getDownloadPath = async () => {
    let downloadDir = await ipcRenderer.invoke('GET_DOWNLOADS_PATH')
    const resultPath = await ipcRenderer.invoke('OPEN_FILE_DIALOG', downloadDir)
    downloadPath.value = resultPath[0]
  }

  // 计算下载地址
  const dirDownPath = computed(() => {
    const rootPath = downloadPath.value
    if (!rootPath || !dirInfo.value?.dirName) return ''

    return path.resolve(rootPath, dirInfo.value?.dirName)
  })

  const downloadIng = ref(false)
  const downCount = ref(0)

  const downloadIndex = ref(0)
  const downloadImg = async () => {
    downCount.value = 0
    downloadIndex.value = 0
    const res = await getAlbumList(parseInt(activeKey.value), 20000)
    if (!res.value) {
      return
    }
    const fileList = res.value.file
    downloadIng.value = true
    setDisablie(true)

    // 分组下载避免爆内存
    const chunkSize = listSize
    const chunkList = []
    for (let i = 0; i < fileList.length; i += chunkSize) {
      chunkList.push(fileList.slice(i, i + chunkSize))
    }

    for (let i = 0; i < chunkList.length; i++) {
      if (i < setIndex.value) {
        downloadIndex.value += 1
        continue
      }

      try {
        downloadIndex.value += 1
        await Promise.all(
          chunkList[i].map((item) =>
            ipcRenderer
              .invoke('GET_STRAME', item.url, dirDownPath.value, item.fileName)
              .then(() => (downCount.value += 1))
          )
        )
      } catch (e) {
        let message = ''
        if (typeof e === 'string') {
          message = e.toUpperCase()
        } else if (e instanceof Error) {
          message = e.message
        }
        console.error(e, chunkList[i])

        window.$notification.error({
          title: `下载出现错误 队列位置 ${i + 1}`,
          content: message
        })
        throw e
      }
    }

    setDisablie(false)
    downloadIng.value = false
  }

  init()

  const setIndex = ref(0)

  const maxList = computed(() =>
    dirInfo.value ? Math.floor(dirInfo.value.fileNum / listSize) + 1 : 0
  )

  const downFileIndex = computed(() =>
    dirInfo.value ? Math.min(setIndex.value * listSize + downCount.value, dirInfo.value.fileNum) : 0
  )

  const onMenuChange = () => {
    downCount.value = 0
    downloadIndex.value = 0
    setIndex.value = 0
  }
</script>

<template>
  <div class="flex flex-row">
    <div class="w-52">
      <n-menu
        v-model:value="activeKey"
        :options="menuOptions"
        :disabled="downloadIng"
        @update:value="onMenuChange"
      />
    </div>
    <div class="w-full">
      <n-space justify="space-between" class="mb-4">
        <n-statistic label="OSS 过期时间" :value="showExpiredTime" />
        <n-statistic label="选择相册" :value="dirInfo?.dirName" />
        <n-statistic label="文件总数">
          <n-number-animation :from="0" :to="dirInfo?.fileNum" />
        </n-statistic>
        <n-statistic label="队列长度" :value="listSize" />
      </n-space>
      <div class="mb-4">
        <n-statistic label="下载路径" :value="dirDownPath" />
        <n-space>
          <n-button v-if="activeKey && !downloadIng" @click="getDownloadPath"
            >选择下载路径</n-button
          >
        </n-space>
      </div>

      <n-space :size="32" class="mb-4">
        <n-statistic label="本次下载" :value="downCount" />
        <n-statistic label="下载进度" :value="downFileIndex">
          <template #suffix> / <n-number-animation :from="0" :to="dirInfo?.fileNum" /> </template>
        </n-statistic>
        <n-statistic v-if="dirInfo" label="队列位置" :value="downloadIndex">
          <template #suffix> / <n-number-animation :from="0" :to="maxList" /> </template>
        </n-statistic>
      </n-space>
      <n-space :size="32" class="mb-4">
        <template v-if="downloadPath && !downloadIng">
          <n-input-group>
            <n-input-group-label>从队列位置</n-input-group-label>
            <n-input-number
              v-model:value="setIndex"
              :min="0"
              :max="maxList - 1"
              :style="{ width: '33%' }"
            />
            <n-button @click="downloadImg()">下载</n-button>
          </n-input-group>
        </template>
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
