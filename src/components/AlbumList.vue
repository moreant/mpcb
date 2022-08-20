<script setup lang="ts">
  import { getAlbumList, getDirList } from '@/api'
  import { useAppStore } from '@/store/token'
  import { Dir } from '@/types'
  import { MenuOption, NImage } from 'naive-ui'
  import { Ref } from 'vue'

  const appStore = useAppStore()

  const activeKey = ref('')
  const downloadPath = ref('')
  const listSize = 20
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
    let downloadDir = await window.ipcRenderer.invoke('GET_DOWNLOADS_PATH')
    const path = await window.ipcRenderer.invoke('OPEN_FILE_DIALOG', downloadDir)
    downloadPath.value = path[0]
  }

  // 计算下载地址
  const dirDownPath = computed(() => {
    const path = downloadPath.value
    if (!path) {
      return ''
    }
    const split = path.indexOf(':') ? '\\' : `/`
    return path + split + dirInfo.value?.dirName
  })

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

    // 分组下载避免爆内存
    const chunkSize = listSize
    const chunkList = []
    for (let i = 0; i < fileList.length; i += chunkSize) {
      chunkList.push(fileList.slice(i, i + chunkSize))
    }

    for (let i = 0; i < chunkList.length; i++) {
      try {
        await Promise.all(
          chunkList[i].map((item) =>
            window.ipcRenderer
              .invoke('GET_STRAME', item.url, dirDownPath.value, item.fileName)
              .then(() => (downloadFinishNum.value += 1))
          )
        )
      } catch (e) {
        let message = ''
        if (typeof e === 'string') {
          message = e.toUpperCase()
        } else if (e instanceof Error) {
          message = e.message
        }
        console.error(e)

        window.$notification.error({
          title: `下载出现错误`,
          content: message
        })
      }
    }

    setDisablie(false)
    downloadIng.value = false
  }

  init()
</script>

<template>
  <div class="flex flex-row">
    <div class="w-52">
      <n-menu
        v-model:value="activeKey"
        :options="menuOptions"
        :disabled="downloadIng"
        @update:value="downloadFinishNum = 0"
      />
    </div>
    <div class="w-full">
      <n-space justify="space-between" class="mb-4">
        <n-statistic label="OSS 过期时间" :value="showExpiredTime" />
        <n-statistic label="选择相册" :value="dirInfo?.dirName" />
        <n-statistic label="文件总数">
          <n-number-animation :from="0" :to="dirInfo?.fileNum" />
        </n-statistic>
      </n-space>
      <div class="mb-4">
        <n-statistic label="下载位置" :value="dirDownPath" />
        <n-space>
          <n-button v-if="activeKey && !downloadIng" @click="getDownloadPath"
            >选择下载位置</n-button
          >
          <n-button v-if="downloadPath && !downloadIng" @click="downloadImg">开始下载</n-button>
        </n-space>
      </div>
      <n-statistic label="下载状态" :value="downloadFinishNum">
        <template #suffix> / {{ dirInfo?.fileNum }} </template>
      </n-statistic>
      <!-- <div v-if="dirInfo?.fileNum === downloadFinishNum">下载完成</div> -->
    </div>
  </div>
</template>

<style scoped></style>
