import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Characters from '../pages/Characters.vue'
import ContactUs from '../pages/ContactUs.vue'
import WhoWeAre from '../pages/WhoWeAre.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Characters
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/who-we-are',
    name: 'WhoWeAre',
    component: WhoWeAre
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router