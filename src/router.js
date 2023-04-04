import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/talks/index.vue'
import CreateTalk from './views/talks/create.vue'
import SingleTalk from './views/talks/single.vue'
import RegisterForTalk from './views/talks/register.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: CreateTalk },
  { path: '/talk/:id', component: SingleTalk },
  { path: '/register/:id', component: RegisterForTalk }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
