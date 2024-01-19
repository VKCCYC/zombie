// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '殭屍鐘 | 首頁'
    }
  },
  {
    path: '/list',
    component: () => import('@/views/ListView.vue'),
    meta: {
      title: '殭屍鐘 | 事項'
    }
  },
  {
    path: '/settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      title: '殭屍鐘 | 設定'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// to 是要去的頁面 ; from 是從何頁面來
router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router
