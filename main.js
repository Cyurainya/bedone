import Vue from 'vue'
import App from './App'
import store from './store'
import * as util from './utils/utils'
import uView from 'uview-ui'

Vue.prototype.$util = util
Vue.prototype.$store = store
Vue.config.productionTip = false

Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
