// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from './utils/axios';
import Router from 'vue-router';
import Music from './components/Music';
import Rank from './components/Rank';
import Station from './components/Station';
import Index from './components/Index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import hello from './components/Hello';
import '../static/css/reset.css';
import 'vue-swipe/dist/vue-swipe.css';
import VueLazyload from 'vue-lazyload';
import store from "./vuex";
Vue.config.productionTip = false
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

Vue.use(VueLazyload, {
  preLoad: 1.3,//预加载高度的比例
  error: './static/img/error.jpg',//这个是请求失败后显示的图片
  loading: './static/img/loading.png',//这个是加载的loading过渡效果
  attempt: 3,//尝试次数
  listenEvents: [ 'scroll', 'mousewheel' ]//想要听的事件
});
Vue.use(Router);

const routes = [{
  path: '/',
  component: Index,
  redirect:'/index',
}, 
{
  path: '/index',
  component: Index
},
{
  path: '/music',
  component: Music
}, {
  path: '/station',
  component: Station
}, {
  path: '/rank',
  component: Rank
}];

const router = new Router({
  linkActiveClass: 'active',
  routes
});
// 路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

/* http */
Vue.prototype.$http = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
