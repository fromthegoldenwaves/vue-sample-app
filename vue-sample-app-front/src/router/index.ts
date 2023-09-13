// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MyPage from '@/views/MyPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home
      },
    ],
  },
  {
    path: '/myPage/:id?',
    name: 'MyPage',
    component: MyPage 
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
