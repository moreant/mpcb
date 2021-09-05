<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import InputToken from './components/InputToken.vue'
import SelectDir from './components/SelectDir.vue'
import ErrorLog from './components/ErrorLog.vue'

const token = ref('')
const changeFleg = ref(Date.now())

</script>

<template>
  <div class="flex justify-center">
    <div class="container p-4 lg:py-24 lg:pt-12">
      <Home />
      <input-token
        @change="
          (e) => {
            token = e
          }
        "
      />
      <select-dir :token="token" @error="changeFleg = Date.now()" />
      <error-log :changeFleg="changeFleg" />
    </div>
  </div>
</template>

<style>
</style>
