<script setup>
import { ref } from 'vue'
import { getInfo } from '../api/index'

const token = ref("");

const onSubmitToken = async () => {
  const res = await getInfo(token.value)
  console.log(res);
};

</script>

<template>
  <div class="flex flex-row mt-12">
    <div class="card shadow w-full">
      <div class="card-body">
        <h2 class="card-title">第 1 步</h2>
        <p>输入 Token 获取用户信息</p>
        <div class="flex space-x-2 mt-2">
          <input
            v-model="token"
            type="text"
            placeholder="token"
            class="w-full input input-primary input-bordered"
          />
          <button @click="onSubmitToken" class="btn btn-primary">提交</button>
        </div>
      </div>
    </div>
    <div class="divider divider-vertical opacity-50"></div>
    <div class="card shadow w-full">
      <div class="card-body">
        <h2 class="card-title">运行结果</h2>
        <p></p>
      </div>
    </div>
  </div>
</template>

<style></style>
