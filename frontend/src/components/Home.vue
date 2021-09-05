<script setup>
import ExtraLink from './ExtraLink.vue'
</script>

<template>
  <div
    class="
      flex flex-col
      justify-end
      h-72
      bg-primary
      p-12
      rounded-box
      shadow
      text-white
    "
  >
    <div class="text-6xl pb-4 font-bold">Hi, 欢迎使用 MPCB！</div>
    <div class="flex flex-row w-full justify-between">
      <div class="text-3xl">简高效的批量下载魅族云相册中的图片。</div>

      <a href="https://github.com/moreant/mpcb" target="_blank" class="btn-link text-3xl text-white"
        >使用文档 <extra-link class="h-6 inline"
      /></a>
    </div>
  </div>
</template>

<style></style>
