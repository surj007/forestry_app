import Vue from 'vue';
import qs from 'qs';

import App from './App';
import router from './router';
import store from './store';
import request from './config/request';
import storage from './config/storage';
import './libs/lib-flexible';
import './libs/underscore.min.js';
import './config/importUI';

import './styles/normalize.css';
import './styles/style.css';

Vue.config.productionTip = false;

window.$storage = storage;
window.$underscore = window._;

Vue.prototype.$qs = qs;
Vue.prototype.$http = request;
Vue.prototype.$window = window;

document.addEventListener('plusready', () => {
  // window.plus.storage.clear();
  window.$vm = new Vue({
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
});