import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Cash from '@/components/Cash'
import Shot from '@/components/Shot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/qr_code',
      name: 'QR_Code',
      component: Shot
    }
  ]
})
