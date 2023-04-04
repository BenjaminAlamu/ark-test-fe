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

        <main class="w-full md:w-2/3 mt-8">
          <p class="font-major text-xl text-left text-white">Register</p>
          <div class="my-2">
            <Input
              type="text"
              name="firstName"
              :value="state.firstName"
              @type="handleClickEvent($event, 'firstName')"
              v-model="state.firstName"
              placeholder="e.g Benjamin"
              :errorMessage="errors.firstName"
              :isInvalid="errors.firstName"
            />
          </div>

          <div class="my-2">
            <Input
              type="text"
              name="lastName"
              :value="state.lastName"
              @type="handleClickEvent($event, 'lastName')"
              v-model="state.lastName"
              placeholder="e.g Doe"
              :errorMessage="errors.lastName"
              :isInvalid="errors.lastName"
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
            @click.prevent="handleSubmit"
            class="bg-yellow-500 px-6 py-2 rounded-lg text-brown mx-2 font-black text-left"
          >
            {{ loading ? 'Loading...' : 'Submit' }}
          </button>
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
const appUrl = import.meta.env.VITE_APP_URL
import { createToaster } from '@meforma/vue-toaster'
const toaster = createToaster({
  position: 'top-right'
})

let talk = ref({})
const loading = ref(true)
const errors = reactive([])
const socket = ref({})

const state = ref({
  firstName: '',
  lastName: '',
  email: ''
})

socket.current = socketIOClient(appUrl)

const getTalk = async () => {
  const res = await api.get(`/talk/${route.params.id}`)
  talk.value = res.data.data.talk
  loading.value = false
}

const handleClickEvent = async (data, key) => {
  state.value[key] = data
}

const handleSubmit = async () => {
  errors.value = []
  try {
    const res = api.post('/user/register', { ...state.value, talk: route.params.id })
    router
    toaster.success('Registration successful')
    router.go()
  } catch (e) {
    toaster.error(e?.response?.data?.message || 'An error occured')
  }
}

getTalk()
</script>

<style lang="scss" scoped></style>
