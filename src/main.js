import Vue from 'vue'
import App from './App.vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from '@/store';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import vuesocketio from "vue-socket.io"

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

Vue.use(new vuesocketio({
  debug: true,
  connection: 'http://metinseylan.com:1992',
  //vuex: {
   //   store,
   //   actionPrefix: 'SOCKET_',
   //   mutationPrefix: 'SOCKET_'
  //},
  //options: { path: "/my-app/" } //Optional options
}))

new Vue({
  router,
  store,
  vuesocketio,
  render: h => h(App)
}).$mount('#app')
