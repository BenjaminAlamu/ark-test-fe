<template>
  <Loader v-if="loading" />
  <main v-else class="w-full text-white">
    <main class="w-full flex flex-wrap text-left">
      <main class="w-full md:w-2/3">
        <p class="font-major text-2xl text-left text-white">
          <i @click.prevent="router.go(-1)" class="fas fa-angle-left mt-2 cursor-pointer"></i>
          {{ talk.name }}
        </p>
        <img :src="talk.image" class="w-full h-56 object-cover rounded-lg" />
        <main class="px-2">
          <p class="font-major text-2xl my-1 truncate">{{ talk.name }}</p>
          <span class="font-sans">{{ talk.description }}</span>
        </main>

        <main class="w-full md:w-1/2 mt-8">
          <p class="font-major text-xl text-left text-white">New Comment</p>

          <div class="my-2">
            <Input
              type="text"
              name="message"
              :value="state.message"
              @type="handleClickEvent($event, 'message')"
              v-model="state.message"
              placeholder="e.g Here goes my comment"
              :errorMessage="errors.message"
              :isInvalid="errors.message"
            />
          </div>

          <div class="my-2">
            <Input
              type="email"
              name="email"
              :value="state.email"
              @type="handleClickEvent($event, 'email')"
              v-model="state.email"
              placeholder="e.g mail@mail.com"
              :errorMessage="errors.email"
              :isInvalid="errors.email"
            />
          </div>

          <button
            @click.prevent="handleChat"
            class="bg-yellow-500 px-6 py-2 rounded-lg text-brown mx-2 font-black text-left"
          >
            {{ loading ? 'Loading...' : 'Submit' }}
          </button>
        </main>
      </main>

      <main class="w-full md:w-1/3 px-4 shadow-lg overflow-y-scroll chat__wrapper">
        <main>
          <p class="font-major text-2xl text-left text-white">Live Chat</p>
          <main v-for="chat in chats" :key="chat._id" class="rounded-lg">
            <p>{{ chat.message }}</p>
            <p class="block float-right text-xs">{{ chat?.user?.firstName || 'Anonymous' }}</p>
            <br />
            <hr />
          </main>
        </main>
      </main>
    </main>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '../../utils/api.js'
import Input from '../../components/input.vue'
import Loader from '../../components/Loader.vue'
import { useRouter, useRoute } from 'vue-router'
import socketIOClient from 'socket.io-client'
const router = useRouter()
const route = useRoute()

let talk = ref({})
let chats = reactive([])
const loading = ref(true)
const errors = reactive([])
const socket = ref({})

const state = ref({
  message: '',
  email: ''
})

socket.current = socketIOClient('')

socket.current.on(`new-chat-${route.params.id}`, (data) => {
  chats.push(data)
  getTalk()
  state.value = { message: '', email: '' }
})

const getTalk = async () => {
  const res = await api.get(`/talk/${route.params.id}`)
  talk.value = res.data.data.talk
  chats = res.data.data.chat
  state.value = { message: '', email: '' }
  loading.value = false
}

const handleClickEvent = async (data, key) => {
  state.value[key] = data
}

const handleChat = async () => {
  socket.current.emit('send-message', {
    talk: route.params.id,
    ...state.value
  })
}

getTalk()
</script>

<style lang="css" scoped>
.chat__wrapper {
  max-height: 600px;
}
</style>
