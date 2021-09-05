<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import InputToken from './components/InputToken.vue'
import SelectDir from './components/SelectDir.vue'


const token = ref('')

</script>

<template>
  <div class="flex justify-center">
    <div class="container p-4 lg:py-24">
      <Home />
      <input-token
        @change="
          (e) => {
            token = e
          }
        "
      />
      <select-dir :token="token" />
    </div>
  </div>
</template>

<style>
</style>
