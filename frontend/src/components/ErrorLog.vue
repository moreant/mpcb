<script setup>
import { ref, watchEffect } from 'vue'
import { Database } from '../utils/database'
import Mock from 'mockjs'

const database = new Database()
const errList = ref([])

const props = defineProps({
  changeFleg: Number
})

watchEffect(async () => {
  if (props.changeFleg) {
    errList.value = await database.getAllErrorLog()
  }
  if (import.meta.env.MODE === 'mock') {
    const mock = Mock.mock({
      "errList|3-8": [
        {
          key: '@natural(1, 100)',
          dirId: '@natural(1, 100)',
          time: '@time("M-d HH:mm:ss")',
          msg: '错误信息 @cword("零一二三四五六七八九十", 5, 7)'
        }
      ]
    })
    errList.value = mock.errList
  }
})



const delAll = () => {
  database.deleteAllErrorLog()
  errList.value = []
}

</script>

<template>
  <div class="mt-12">
    <div class="card shadow w-full flex-row">
      <div class="card-body w-1/2">
        <h2 class="card-title">
          错误日志
          <button class="btn btn-error btn-xs ml-4" @click="delAll">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block w-3 h-3 mr-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            删除所有日志
          </button>
        </h2>

        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>DirId</th>
                <th>发生时间</th>
                <th>错误信息</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="error in errList" :key="error.key">
                <th>{{ error.key }}</th>
                <td>{{ error.dirId }}</td>
                <td>{{ error.time }}</td>
                <td>{{ error.msg }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>