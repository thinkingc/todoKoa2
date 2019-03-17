import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Todolist from '@/components/todo/todolist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: Todolist
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
