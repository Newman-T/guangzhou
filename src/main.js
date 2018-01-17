import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './less/index.less'

Vue.use(VueRouter);
Vue.use(ElementUI);
import App from './component/App.vue';

import routerConfig from './router/router.js';
import axios from 'axios';
// axios.defaults.baseURL='http://157.122.54.189:9095';
axios.defaults.baseURL='http://localhost:8899';
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
import api from './js/api-config.js';
Vue.prototype.$api=api;

import beforeEach from './router/beforeEach.js';
let vueRouter = new VueRouter(routerConfig);
vueRouter.beforeEach(beforeEach);

new Vue({
    el:'#app',
    // render: function(createElement) {
    //     return createElement(App);
    // },
    render: createElement=>createElement(App),
    router:vueRouter
});