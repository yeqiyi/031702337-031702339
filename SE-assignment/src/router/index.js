import Vue from 'vue'
import Router from 'vue-router'
import InputPage from '@/components/getinput'
import Tree from '@/components/tree'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tree',
      name: 'tree',
      component: Tree
    },
    {
      path: '/',
      name: 'data',
      component: InputPage
      
    }
  ]
})
