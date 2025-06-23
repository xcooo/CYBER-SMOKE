/*
 * @Date: 2022-10-11 10:15:12
 * @LastEditTime: 2025-06-05 09:47:04
 * @Description: content
 */
import Vue from 'vue'
import App from './App'
import MescrollBody from '@/common/mescroll-uni/mescroll-body.vue'
import MescrollUni from '@/common/mescroll-uni/mescroll-uni.vue'
import Mixin from '@/common/mescroll-uni/mescroll-mixins.js'
import store from 'store'

import cusTabbar from "components/cus-tabbar.vue"

Vue.config.productionTip = false

/* 引入uview */
import uView from 'uview-ui'
Vue.use(uView)

/* 全局引入copy */
import Copy from './js_sdk/xb-copy/uni-copy'
Vue.prototype.$copy = Copy

/* 引入全局方法 */
import Common from './common/common.js'
Vue.prototype.$common = Common

/* 引入请求方法 */
import request from './common/request'
Vue.prototype.req = request

// 注册全局组件
Vue.component('cus-tabbar', cusTabbar)

import share from './common/share.js'
Vue.mixin(share)

import tip from "./common/tip.js"
Vue.prototype.$tip = tip


let baseURL = ""
let imgURL = ""

if (process.env.NODE_ENV === 'development') {
  //console.log('开发环境')
  // #ifdef H5
  baseURL = "http://www.smoke.com"
  imgURL = "http://www.smoke.com"
  baseURL = "http://www.paopao-v3.xcooo.cn"
  imgURL = "http://www.paopao-v3.xcooo.cn"
  // #endif
  // #ifdef MP
  baseURL = "http://www.paopao-v3.com";
  imgURL = "http://www.paopao-v3.com";
  // #endif
  // baseURL = "https://www.mh-v6.xcooo.cn";
  // imgURL = "https://www.mh-v6.xcooo.cn";
} else {
  //console.log('生产环境')
  // #ifdef H5
  baseURL = window.location.protocol + "//" + window.location.host;
  imgURL = window.location.protocol + "//" + window.location.host;
  // #endif
  // #ifdef MP
  baseURL = "http://www.mh-v7.xcooo.cn";
  imgURL = "http://www.mh-v7.xcooo.cn";
  // #endif
}
Vue.prototype.baseUrl = baseURL
Vue.prototype.siteBaseUrl = baseURL + '/api'
Vue.prototype.imgBaseUrl = imgURL + '/static/index'
Vue.prototype.imgBaseUrl1 = function () {
  return baseURL + '/static/index'
}
import tools from 'common/tools.js'
Vue.prototype.$tools = tools

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.mixin(Mixin)
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
