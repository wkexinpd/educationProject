import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Storage from 'vue-ls'
import '@/assets/iconfont/iconfont.css'

Vue.use(Storage, {
  namespace: 'tp_web_', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'session' // 存储名称: session, local, memory
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
