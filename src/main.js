import Vue from 'vue';
import axios from 'axios'
import Cookie from 'js-cookie';
import qs from 'qs';

import App from './App';
import router from './router';
import store from './store';
import './importUI';
import './libs/lib-flexible';

import './styles/normalize.css';
import './styles/style.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  //baseURL: 'http://localhost',
  //timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache'
  }
});
Vue.prototype.$qs = qs;
Vue.prototype.$cookie = Cookie;

//document.addEventListener('plusready', () => {
  new Vue({
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