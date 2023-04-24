import Vue from 'vue';
import App from './App';
import './permission'
import router from './router/index.js';
/* 引入ehcarts */
import Ehcarts from 'echarts';
Vue.prototype.$echarts = Ehcarts;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/layout/index.css';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
import * as filters from './filters/index.js'
Vue.use(ElementUI)
/* 弹窗拖拽 */
import elDragDialog from '@/directive/el-drag-dialog/index'
Vue.use(elDragDialog)
import { Toast } from 'vant';
Vue.use(Toast);
Toast.allowMultiple();
import Vant from 'vant';
import 'vant/lib/index.css';
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 3.75 + "px"

window.onresize = function () {
  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / 3.75 + "px"
}
Vue.use(Vant);

import Vconsole from 'vconsole';
let vconsole = new Vconsole()

import store from '@/vuex/index.js';
import Axios from 'axios'
Vue.prototype.$axios = Axios;

import 'babel-polyfill';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted(){
    store.dispatch('store/verification', {
			platformType: 1
		})
  }
})
