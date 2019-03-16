import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
      // redirect: '/login'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
