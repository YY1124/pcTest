import Vue from 'vue'
import ElementUI from 'element-ui'
import Draggable from 'vuedraggable'
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'
//样式
import './styles/index.scss'
//自定义库
import components from './components'
import config from './common/config'
import storage from './common/store'
import request from './common/request'
import dayjs from './common/dayjs'
import filters from './filters'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.component('Draggable', Draggable)

Vue.use(ElementUI)
Vue.use(VueResize)
Vue.use(components)
Vue.use(config)
Vue.use(storage)
Vue.use(request)
Vue.use(dayjs)
Vue.use(filters)



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
