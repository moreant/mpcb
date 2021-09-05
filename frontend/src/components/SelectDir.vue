<script setup>
import { ref, reactive, watchEffect } from "vue";
import { getDir, getIconList, getList, downImg } from "../api/index";
import Database from '../utils/database'
import { bufferToBase64Img } from '../utils/helper'
import BaseStep from './BaseStep.vue'

const props = defineProps({
  token: String
})

const loading = ref(false)
const imgList = ref([])
const selectId = ref('')
const dirList = ref([])
const database = new Database()

watchEffect(async () => {
  if (props.token) {
    const res = await getDir(props.token)
    let { dir = [] } = res.value
    dir.forEach(async item => {
      item.downNum = await database.getImgsDownNum(item.id, '1')
    })
    dirList.value = dir
    const icons = dir.map(item => item.icon).join(',')
    const bufferList = (await getIconList(props.token, icons)).value
    dirList.value = dir.map((item, index) => {
      return {
        ...item,
        iconSrc: bufferToBase64Img(bufferList[index].data)
      }
    })
  }
})

const getImgList = async dirId => {
  selectId.value = dirId
  let dbImg = await database.getImgs({ dirId })
  if (dbImg.length === 0) {
    const { value: { file } } = await getList(props.token, dirId)
    dbImg = file.map(item => {
      return {
        id: item.id,
        fileName: item.fileName,
        url: item.url,
        download: '0',
        dirId
      }
    })
    await database.bulkImg(dbImg)
  }
  imgList.value = dbImg

  document.getElementById('downloadList').parentNode.style.maxHeight =
    document.getElementById('selectList').parentNode.offsetHeight + 'px'
}

const onDownImg = async dirId => {
  let dbImg = await database.getImgs({ dirId, download: '0' })
  loading.value = true
  for (let index = 0; index < dbImg.length; index++) {
    const item = dbImg[index]
    // await downImg(props.token, dirId, item.url, item.fileName)
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 500);
    })
    await database.updateDownload(item.id)
    const dir = dirList.value.find(dir => dir.id === dirId)
    const img = imgList.value.find(img => img.id === item.id)
    img.download = '1'
    dir.downNum = ++dir.downNum
  }
  loading.value = false
}

</script>

<template>
  <base-step v-if="dirList.length > 0" step="2" title="选择要下载的相册">
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
      <div>
        <button
          class="btn btn-primary"
          :class="{ loading: loading }"
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
      </div>
      <div class="overflow-y-auto">
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
                    'badge-success': img.download === '1',
                    'badge-info': img.download === '0'
                  }"
                >
                  {{ img.download === '1' ? '已下载' : '待下载' }}
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
