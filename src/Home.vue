<template>
  <div>
    <main class="flex justify-between mb-4">
      <p class="font-major text-2xl text-left text-white">All Talks</p>
      <button
        @click.prevent="isVisible = !isVisible"
        class="bg-yellow-500 px-6 py-2 rounded-lg text-brown mx-2 font-black"
      >
        Add New Talk
      </button>
    </main>
    <main class="flex flex-wrap">
      <main v-for="talk in talks" :key="talk._id" class="w-full md:w-1/3">
        <TalkCard class="w-full" :talk="talk" />
      </main>
    </main>
  </div>

  <Modal v-model:visible="isVisible" title="Add Talk" name="add-talk" closable="false">
    <main class="px-4">
      <div class="my-2">
        <Input
          type="text"
          name="name"
          :value="state.name"
          @type="handleClickEvent($event, 'name')"
          v-model="state.name"
          placeholder="e.g How to make money"
          :errorMessage="errors.name"
          :isInvalid="errors.name"
        />
        <!-- <span v-if="submitted && $v.faq.title.$invalid" class="text-xs text-red-400 text-left"
          >Title is required</span
        > -->
      </div>

      <div class="my-2">
        <Input
          type="text"
          name="description"
          :value="state.description"
          @type="handleClickEvent($event, 'description')"
          v-model="state.description"
          placeholder="e.g How to make money"
          :errorMessage="errors.description"
          :isInvalid="errors.description"
        />
        <!-- <span v-if="submitted && $v.faq.title.$invalid" class="text-xs text-red-400 text-left"
          >Title is required</span
        > -->
      </div>

      <div class="my-2">
        <Input
          type="date"
          name="eventDate"
          :value="state.eventDate"
          @type="handleClickEvent($event, 'eventDate')"
          v-model="state.eventDate"
          placeholder="e.g How to make money"
          :errorMessage="errors.eventDate"
          :isInvalid="errors.eventDate"
        />
        <!-- <span v-if="submitted && $v.faq.title.$invalid" class="text-xs text-red-400 text-left"
          >Title is required</span
        > -->
      </div>

      <div class="my-2">
        <Input
          type="time"
          name="eventTime"
          :value="state.eventTime"
          @type="handleClickEvent($event, 'eventTime')"
          v-model="state.eventTime"
          placeholder="e.g How to make money"
          :errorMessage="errors.eventTime"
          :isInvalid="errors.eventTime"
        />
        <!-- <span v-if="submitted && $v.faq.title.$invalid" class="text-xs text-red-400 text-left"
          >Title is required</span
        > -->
      </div>

      <div class="my-2">
        <input
          type="file"
          @change="uploadFile"
          ref="file"
          name="description"
          placeholder="e.g How to make money"
        />
        <!-- <span v-if="submitted && $v.faq.title.$invalid" class="text-xs text-red-400 text-left"
          >Title is required</span
        > -->
      </div>

      <button
        @click.prevent="handleSubmit"
        class="bg-yellow-500 px-6 py-2 rounded-lg text-brown mx-2 font-black text-left"
      >
        {{ loading ? 'Loading...' : 'Submit' }}
      </button>
    </main>
  </Modal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from './utils/api.js'
import TalkCard from './components/talk-card.vue'
import Input from './components/input.vue'
import myUpload from 'vue-image-crop-upload'
import { useModal, Modal } from 'usemodal-vue3'
// import { useVuelidate } from '@vuelidate/core'
// import { required, email } from '@vuelidate/validators'

let talks = ref([])
const loading = ref(false)
const test = ref('')
const errors = reactive({})
let isVisible = ref(true)

const state = ref({
  name: '',
  description: '',
  eventDate: '',
  eventTime: '',
  image: ''
})

const getTalks = async () => {
  const res = await api.get('/talk')
  talks.value = res.data.data.talk
}

const handleClickEvent = async (data, key) => {
  state.value[key] = data
}

const uploadFile = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event) => {
    state.value['image'] = event.target.result
  }
  reader.readAsDataURL(file)
}
getTalks()
</script>

<style lang="scss" scoped></style>
