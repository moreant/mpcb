<script setup>
import { ref, reactive } from "vue";
import dayjs from 'dayjs'
import { getInfo } from "../api/index";
import BaseStep from './BaseStep.vue'


const token = ref("");
const result = reactive({
  time: '',
  msg: '',
  flag: 0
})

const emit = defineEmits(['change'])

const onSubmit = async () => {
  try {
    const res = await getInfo(token.value);
    emit('change', token.value)
    result.msg = '校验 Token 成功.'
    result.flag = 1
  } catch (e) {
    let msg = e.message
    if (msg === '用户信息验证失败') {
      msg = msg + ', 请重新获取 Token.'
    }
    emit('change', '')
    result.msg = msg
    result.flag = -1
  }
  result.time = dayjs().format('HH:mm:ss')
}
</script>

<template>
  <base-step step="1" title="输入 Token 获取用户信息" :flag="result.flag">
    <template v-slot:left>
      <div class="flex space-x-2">
        <input
          v-model="token"
          type="text"
          placeholder="token"
          class="w-full input input-primary input-bordered"
        />
        <button @click="onSubmit" class="btn btn-primary">提交</button>
      </div>
      <div>
        <a href="http://topurl.cn/7Z4" target="_blank" class="btn btn-link p-0"
          >获取 Token ?
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </template>
    <template v-slot:right>
      <p>{{ result.time }}</p>
      <p>{{ result.msg }}</p>
    </template>
  </base-step>
</template>

<style></style>
