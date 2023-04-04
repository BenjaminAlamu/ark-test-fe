<template>
  <div class="w-full p-4 cursor-pointer">
    <main class="text-left rounded-lg shadow-t-lg bg-white">
      <img
        @click.prevent="router.push(`/talk/${talk._id}`)"
        :src="props.talk.image"
        class="w-full h-56 object-cover rounded-lg"
      />
      <main class="px-2">
        <p class="text-black font-major text-2xl my-1 truncate">{{ props.talk.name }}</p>
        <span class="font-sans text-black">{{ props.talk.description }}</span>
        <main class="flex justify-end">
          <p class="text-blue-500 text-xs" @click.prevent="router.push(`/register/${talk._id}`)">
            Register
          </p>
        </main>
      </main>
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { defineProps } from 'vue'
const router = useRouter()

const props = defineProps({
  talk: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
