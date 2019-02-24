import Vue from 'vue';
import qs from 'qs';

import App from './App';
import router from './router';
import store from './store';
import './libs/lib-flexible';
import './config/importUI';
import request from './config/request';
import storage from './config/storage'

import './styles/normalize.css';
import './styles/style.css';

Vue.config.productionTip = false;

window.baseUrl = 'http://127.0.0.1';
window.$storage = storage;

Vue.prototype.$qs = qs;
Vue.prototype.$http = request;

//document.addEventListener('plusready', () => {
  window.vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    data() {
      return {
        bus: new Vue()
      }
    }
  });
//});