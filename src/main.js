import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import antd from './utils/getAntdUI'

Vue.config.productionTip = false

// antd
Vue.use(antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

// 页面刷新前将state存入sessionStorage
window.onbeforeunload = () => {
  sessionStorage.setItem('lightLibStore', JSON.stringify(store.state))
}