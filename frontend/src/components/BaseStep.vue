<script setup>
const props = defineProps({
  step: String,
  title: String,
})
</script>

<template>
  <div class="mt-6 lg:mt-12">
    <div class="card shadow-md w-full flex-col lg:flex-row bg-white">
      <div class="card-body w-full p-4 lg:p-8 lg:w-1/2">
        <h2 class="card-title">第 {{ step }} 步</h2>
        <p>{{ title }}</p>
        <slot name="left"></slot>
      </div>
      <div class="divider divider-vertical opacity-10 hidden lg:flex lg:p-8"></div>
      <div class="card-body w-full p-4 lg:p-8 lg:w-1/2">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style></style>
