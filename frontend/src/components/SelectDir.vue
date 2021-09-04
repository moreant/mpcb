<script setup>
import { ref, reactive, watchEffect } from "vue";
import { getDir, getIconList, getList } from "../api/index";
import BaseStep from './BaseStep.vue'

const props = defineProps({
  token: String
})

watchEffect(async () => {
  if (props.token) {
    const res = await getDir(props.token)
    const { dir = [] } = res.value
    const icons = dir.map(item => item.icon).join(',')
    result.value = res.value
    const bufferList = (await getIconList(props.token, icons)).value
    imgList.value = bufferList.map(item => bufferToBase64Img(item.data))
  }
})

const imgList = ref([])
const result = reactive({
  time: '',
  value: '',
  flag: 0
})

const getImgList = async dirId => {
  try {
    await getList(props.token, dirId)
  } catch (e) {
    console.log(e);
  }
}

const bufferToBase64Img = buffer => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return 'data:image/jpeg;base64,' + window.btoa(binary)
}

</script>

<template>
  <base-step
    v-if="result.value"
    step="2"
    title="选择要下载的相册"
    :flag="result.flag"
  >
    <template v-slot:left>
      <ul class="menu my-3 bg-base-100 rounded-box border border-gray-300">
        <li v-for="(dir, index) in result.value.dir">
          <a @click="getImgList(dir.id)">
            <div class="w-full flex justify-between">
              <div class="flex">
                <div class="avatar">
                  <div class="rounded-btn w-20 h-20">
                    <img :src="imgList[index]" />
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
                  value="10"
                  :max="dir.fileNum"
                ></progress>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </template>
    <template v-slot:right> </template>
  </base-step>
</template>

<style></style>
