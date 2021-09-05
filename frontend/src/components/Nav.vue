<script setup>
import ExtraLink from './ExtraLink.vue'
import { isMock } from '../utils/helper'

</script>

<template>
  <div
    class="
      flex flex-col
      justify-end
      h-52
      lg:h-72
      bg-primary
      p-6
      lg:p-12
      rounded-box
      shadow-md
      text-white
    "
  >
    <div class="text-2xl lg:text-6xl pb-1 lg:pb-4 font-bold">Hi, 欢迎使用 MPCB！</div>
    <div class="flex flex-col lg:flex-row w-full justify-between">
      <div class="text-base lg:text-3xl">简洁高效的批量下载魅族云相册中的图片。</div>
      <a
        href="https://github.com/moreant/mpcb"
        target="_blank"
        class="btn-link text-base lg:text-3xl text-white"
        >使用文档 <extra-link class="w-4 lg:w-5 h-6 inline"
      /></a>
    </div>
  </div>
  <div v-if="isMock" class="mt-6 lg:mt-12 alert alert-warning text-sm lg:text-base shadow-md">
    <div class="flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 mx-2 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
      <label>注意！这是在线体验版，数据皆为程序随机生成。如需使用，请按「使用文档」的说明进行安装。</label>
    </div>
  </div>
</template>

<style></style>
