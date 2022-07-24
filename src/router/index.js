import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('@/views/welcome') },
      { path: '/users', component: () => import('@/views/users') },
      { path: '/goods', component: () => import('@/views/goods/goods') },
      { path: '/categories', component: () => import('@/views/goods/categories') },
      { path: '/params', component: () => import('@/views/goods/params') },
      { path: '/roles', component: () => import('@/views/power/roles') },
      { path: '/rights', component: () => import('@/views/power/rights') },
      { path: '/reports', component: () => import('@/views/reports') },
      { path: '/orders', component: () => import('@/views/orders') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
