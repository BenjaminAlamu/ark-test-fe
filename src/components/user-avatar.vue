<template>
  <div class="w-full p-4 cursor-pointer">
    <main class="text-left rounded-lg shadow-t-lg bg-white">
      <img :src="props.talk.image" class="w-full h-56 object-cover rounded-lg" />
      <main class="px-2">
        <p class="text-black font-major text-2xl my-1 truncate">{{ props.talk.name }}</p>
        <span class="font-sans text-black">{{ props.talk.description }}</span>
      </main>
    </main>
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
