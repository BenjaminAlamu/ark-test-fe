<template>
  <div class="w-full p-4 cursor-pointer">
    <p>{{ message }}</p>
    <p>{{ name }}</p>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { defineProps } from 'vue'
const router = useRouter()

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
})
</script>

<style lang="scss" scoped></style>
