<template>
  <main class="container text-black">
    <router-view />
  </main>
</template>

<script>
import socketIOClient from 'socket.io-client'
const appUrl = import.meta.env.VITE_APP_URL
export default {
  data: () => {
    return {
      soc: null
    }
  },
  async mounted() {
    const socket = {}

    socket.current = socketIOClient(appUrl)
    this.soc = socket
  }
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
