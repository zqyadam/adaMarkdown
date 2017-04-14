import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'



import App from './App'
import routes from './routes'
import {isLoggedIn} from './js/api'

import './icons/iconfont.css'



Vue.use(Electron)
Vue.use(Router)
Vue.use(ElementUI)
Vue.config.debug = false

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, form, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ name: 'login' })
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
