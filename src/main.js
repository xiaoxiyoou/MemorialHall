import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vueSwiper from 'vue-awesome-swiper'
import LyTab from 'ly-tab'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import FastClick from 'fastclick'
import 'assets/js/rem'
import 'assets/css/reset.css'
import animated from 'animate.css'
/* 样式的话，我这里有用到分页器，就在全局中引入了样式 */
import 'swiper/dist/css/swiper.css'
Vue.prototype.$axios = axios

Vue.use(vueSwiper);
Vue.use(animated)
Vue.use(LyTab)
Vue.config.productionTip = false
FastClick.attach(document.body)

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // 设置title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // VueCookies.set('UserId','5')
  // console.log(VueCookies.get('UserId')) 
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {  
    localStorage.setItem('fromUrl',to.fullPath)
    if (localStorage.getItem('UserId') && VueCookies.get('UserId')) { 
      next();
    }else{
      next({
        path: '/login'
      })
    }
  }else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
