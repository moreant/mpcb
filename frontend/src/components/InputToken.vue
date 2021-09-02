<script setup>
import { ref } from "vue";
import { getInfo } from "../api/index";

const token = ref("");
const result = ref("")
const successFlag = ref(0)
let successText = '校验 Token 成功'

const onSubmitToken = async () => {
  try {
    const res = await getInfo(token.value);
    result.value = successText += `，提交时间：2021-09-03 01:15:22`
    successFlag.value = 1
  } catch (e) {
    let msg = e.message
    if (msg === '用户信息验证失败') {
      msg = msg + ', 请重新获取 Token.'
    }
    result.value = msg
    successFlag.value = -1
  }
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
        <h2 class="card-title">
          运行结果

          <div v-show="successFlag === 1" class="badge badge-success badge-lg">
            成功
          </div>
          <div v-show="successFlag === -1" class="badge badge-error badge-lg">
            失败
          </div>
        </h2>
        <p>{{ result }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
