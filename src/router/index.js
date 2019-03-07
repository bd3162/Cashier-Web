import Vue from 'vue'
import Router from 'vue-router'
import Flow from '@/components/Flow'
import Cash from '@/components/Cash'
import Shot from '@/components/Shot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Flow',
      component: Flow
    },{
      path: '/cash',
      name: 'Cash',
      component: Cash,
      children: [
        {
          path: '/cash/shot',
          name: 'Shot',
          component: Shot,
        },
      ]
    },{
      path: '/face',
      name: 'Face',
      component: Shot
    }
  ]
})
