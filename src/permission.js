import router from '@/router'
import store from '@/store'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度效果
  const token = store.state.user.token
  if (token) { // 如果有token想去其它页面直接通过，想去login页面直接跳转到home
    if (to.path === '/login') {
      NProgress.done()
      next('/home')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') { // 没有token相反
      next()
    } else {
      next('/login')
    }
  }
})
// 后置路由守卫
router.afterEach(() => {
  // 结束进度效果
  NProgress.done()
})
