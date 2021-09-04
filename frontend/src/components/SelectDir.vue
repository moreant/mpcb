<script setup>
import { ref, reactive, watchEffect } from "vue";
import { getDir, getIconList, getList, downImg } from "../api/index";
import Database from '../utils/database'
import { bufferToBase64Img } from '../utils/helper'
import BaseStep from './BaseStep.vue'

const props = defineProps({
  token: String
})

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
}

const onDownImg = async dirId => {
  let dbImg = await database.getImgs({ dirId, download: '0' })
  for (let index = 0; index < dbImg.length; index++) {
    const item = dbImg[index]
    await downImg(props.token, dirId, item.url, item.fileName)
    await database.updateDownload(item.id)
    const dir = dirList.value.find(dir => dir.id === dirId)
    const img = imgList.value.find(img => img.id === item.id)
    img.download = '1'
    dir.downNum = ++dir.downNum
  }
}

</script>

<template>
  <base-step v-if="dirList" step="2" title="选择要下载的相册">
    <template v-slot:left>
      <ul class="menu my-3 bg-base-100 rounded-box border border-gray-300">
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
    <template v-slot:right>
      <div>
        <button class="btn btn-primary" @click="onDownImg(selectId)">
          下载
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
              <th>{{ img.id }}</th>
              <td v-if="img.download === '1'">
                <div class="badge badge-success">已下载</div>
              </td>
              <td v-else>
                <div class="badge badge-info">待下载</div>
              </td>
              <td>{{ img.fileName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </base-step>
</template>

<style></style>
