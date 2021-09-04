<script setup>
const props = defineProps({
  step: String,
  title: String,
  flag: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="flex flex-row mt-12">
    <div class="card shadow w-full">
      <div class="card-body">
        <h2 class="card-title">第 {{ step }} 步</h2>
        <p>{{ title }}</p>
        <slot name="left"></slot>
      </div>
    </div>
    <div class="divider divider-vertical opacity-10"></div>
    <div class="card shadow w-full">
      <div class="card-body">
        <h2 class="card-title">
          运行结果
          <div v-show="flag === 1" class="badge badge-success badge-lg">
            成功
          </div>
          <div v-show="flag === -1" class="badge badge-error badge-lg">
            失败
          </div>
        </h2>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style></style>
