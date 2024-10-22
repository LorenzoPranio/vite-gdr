import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Characters from '../pages/Characters.vue'
import ContactUs from '../pages/ContactUs.vue'
import WhoWeAre from '../pages/WhoWeAre.vue'
import ItemsPage from '../pages/ItemsPage.vue'
import GameBoard from '../pages/GameBoard.vue'

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
    path: '/items',
    name: 'ItemsPage',
    component: ItemsPage
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
  },
  {
    path: '/game-board',
    name: 'GameBoard',
    component: GameBoard
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router