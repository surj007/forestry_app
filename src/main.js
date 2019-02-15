import Vue from 'vue';
import qs from 'qs';

import App from './App';
import router from './router';
import store from './store';
import './libs/lib-flexible';
import './config/importUI';
import './config/httpCfg';

import './styles/normalize.css';
import './styles/style.css';

Vue.config.productionTip = false;

Vue.prototype.$qs = qs;

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