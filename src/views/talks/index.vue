<template>
  <div>
    <main class="flex justify-between mb-4">
      <p class="font-major text-2xl text-left text-white">All Talks</p>
      <button
        @click.prevent="router.push('/create')"
        class="bg-yellow-500 px-6 py-2 rounded-lg text-brown mx-2 font-black"
      >
        Add New Talk
      </button>
    </main>
    <Loader v-if="loading" />
    <main v-else class="flex flex-wrap">
      <main v-for="talk in talks" :key="talk._id" class="w-full md:w-1/3">
        <TalkCard class="w-full" :talk="talk" />
      </main>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '../../utils/api.js'
import TalkCard from '../../components/talk-card.vue'
import Loader from '../../components/Loader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let talks = ref([])
const loading = ref(true)

const getTalks = async () => {
  const res = await api.get('/talk')
  talks.value = res.data.data.talk
  loading.value = false
}

getTalks()
</script>

<style lang="scss" scoped></style>
