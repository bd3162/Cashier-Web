// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

Vue.config.productionTip = false

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://42.159.104.30:80';
axios.defaults.baseURL = 'http://42.159.104.30:8000';

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

/* eslint-disable no-new */

Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
