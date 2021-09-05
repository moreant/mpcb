<script setup>
import { ref, defineEmits, watchEffect } from "vue";
import dayjs from 'dayjs'
import { getDir, getIconList, getList, downImg } from "../api/index";
import { Database, IS_DOWNLOAD, NO_DOWNLOAD } from '../utils/database'
import { bufferToBase64Img } from '../utils/helper'
import BaseStep from './BaseStep.vue'
import Dialog from './Dialog.vue'

const props = defineProps({
  token: String
})

const emit = defineEmits(['error'])

const loading = ref(false)
const open = ref(false)
const imgList = ref([])
const selectId = ref('')
const dirList = ref([])
const database = new Database()

const getDirById = dirId => {
  return dirList.value.find(item => item.id === dirId)
}

watchEffect(async () => {
  if (props.token) {
    const res = await getDir(props.token)
    let { dir = [] } = res.value
    const dbPromis = dir.map(item => database.getImgsDownNum(item.id, IS_DOWNLOAD))
    const resList = await Promise.all(dbPromis)
    dir = dir.map((item, index) => {
      return {
        ...item,
        downNum: resList[index]
      }
    })
    dirList.value = dir
    const icons = dir.map(item => item.icon).join(',')
    getIcons(dir, icons)
  }
})


const getIcons = async (dir, icons) => {
  if (import.meta.env.MODE === 'mock') {
    dirList.value = dir.map((item, index) => {
      return {
        ...item,
        iconSrc: item.icon
      }
    })
    return
  }
  const bufferList = (await getIconList(props.token, icons)).value
  dirList.value = dir.map((item, index) => {
    return {
      ...item,
      iconSrc: bufferToBase64Img(bufferList[index].data)
    }
  })
}


const deleteImgLog = async () => {
  const dirId = selectId.value
  const dbImg = await database.getImgs({ dirId })
  await Promise.all(dbImg.map(item => database.updateDownload(item.id, NO_DOWNLOAD)))
  getImgList(dirId)
  getDirById(dirId).downNum = 0
  open.value = false
}

const getImgList = async dirId => {
  selectId.value = dirId
  let dbImg = await database.getImgs({ dirId })
  if (dbImg.length === 0) {
    const { value: { file } } = await getList(props.token, dirId)
    if (import.meta.env.MODE === 'mock') {
      const dir = getDirById(dirId)
      file.length = dir.fileNum
    }
    dbImg = file.map(item => {
      return {
        id: item.id,
        fileName: item.fileName,
        url: item.url,
        download: NO_DOWNLOAD,
        dirId
      }
    })
    await database.bulkImg(dbImg)
  }
  if (dbImg.length > 500) {
    dbImg.length = 500
  }
  imgList.value = dbImg

  document.getElementById('downloadList').parentNode.style.maxHeight =
    document.getElementById('selectList').parentNode.offsetHeight + 'px'
}

const onDownImg = async dirId => {
  let dbImg = await database.getImgs({ dirId, download: NO_DOWNLOAD })
  loading.value = true
  for (let index = 0; index < dbImg.length; index++) {
    const item = dbImg[index]
    try {
      await downImg(props.token, dirId, item.url, item.fileName)
      await database.updateDownload(item.id, IS_DOWNLOAD)
      try {
        imgList.value.find(img => img.id === item.id).download = IS_DOWNLOAD
      } catch (e) { console.log(e); }
      const dir = getDirById(dirId)
      dir.downNum = ++dir.downNum
    } catch (e) {
      database.addErrorlog({
        dirId,
        time: dayjs().format('M-D HH:mm:ss'),
        msg: e.message
      })
      emit('error')
    }
  }
  loading.value = false
}

const onDelete = value => {
  open.value = value;
}



</script>

<template>
  <Dialog :open="open" @close="open = false" @ok="deleteImgLog" />
  <base-step v-if="dirList.length > 0" step="2" title="选择要下载的相册。">
    <template v-slot:left>
      <ul
        id="selectList"
        class="menu my-3 bg-base-100 rounded-box border border-gray-300"
      >
        <li
          v-for="(dir, index) in dirList"
          class=""
          :class="{
            bordered: dir.id === selectId,
            'bg-base-content': dir.id === selectId,
            'bg-opacity-10': dir.id === selectId
          }"
        >
          <a @click="getImgList(dir.id)">
            <div class="w-full flex justify-between">
              <div class="flex">
                <div class="avatar">
                  <div class="rounded-btn w-20 h-20">
                    <img v-show="dir.iconSrc" :src="dir.iconSrc" />
                  </div>
                </div>
                <div class="flex flex-col ml-4">
                  {{ dir.dirName }}
                  <div class="text-sm mt-1.5 text-gray-400">
                    {{ dir.fileNum }} 张
                  </div>
                </div>
              </div>
              <div>
                <progress
                  class="w-24 progress progress-primary"
                  :value="dir.downNum"
                  :max="dir.fileNum"
                ></progress>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </template>
    <template v-slot:right v-if="selectId">
      <h2 class="card-title" id="downloadList">下载列表</h2>
      <div>相册ID: {{ selectId }}</div>
      <div>性能原因，下载列表至多显示500条（有空再弄虚拟列表）。</div>
      <div>
        <button
          class="btn btn-primary"
          :class="{ loading: loading }"
          :disabled="loading"
          @click="onDownImg(selectId)"
        >
          <svg
            v-show="!loading"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block w-6 h-6 mr-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
          下载
        </button>
        <button class="btn btn-error ml-4" @click="open = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block w-6 h-6 mr-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          删除记录
        </button>
      </div>
      <div class="overflow-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>下载状态</th>
              <th>图片名称</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="img in imgList" :key="img.id">
              <td>{{ img.id }}</td>
              <td>
                <div
                  class="transition-all duration-500 ease-in-out badge"
                  :class="{
                    'badge-success': img.download === IS_DOWNLOAD,
                    'badge-info': img.download === NO_DOWNLOAD
                  }"
                >
                  {{ img.download === IS_DOWNLOAD ? '已下载' : '待下载' }}
                </div>
              </td>
              <td>{{ img.fileName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </base-step>
</template>

<style>
th {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
