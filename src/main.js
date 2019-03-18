// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI) // Vue全局使用

/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(
  config => {
    // 处理post请求方式中request payload为Fomr Data
    config.headers['Content-Type'] =
      'application/x-www-form-urlencoded; charset=UTF-8'

    config.method === 'post'
      ? (config.data = Qs.stringify({ ...config.data }))
      : (config.params = { ...config.params })

    // 处理GET请求
    config.paramsSerializer = function(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    }

    return config
  },
  error => {
    //请求错误处理
    Promise.reject(error)
  }
)

Vue.prototype.$http = axios

// 前置导航守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')

  // 如果跳到登录页
  if (to.path === '/' || to.path === '/login') {
    if (token !== null && token !== 'null') {
      next('/todolist') // 如果有token就转向todolist
    }
    next() // 否则到登录页
  } else {
    if (token !== null && token !== 'null') {
      Vue.prototype.$http.defaults.headers.common['Authorization'] =
        'Bearer ' + token // 注意Bearer后有个空格
      next() // 如果有token就正常转向
    } else {
      next('/') // 否则跳登录页
    }
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
