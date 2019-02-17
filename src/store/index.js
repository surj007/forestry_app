import Vue from 'vue';
import Vuex from 'vuex';

import user from './module/user';
import info from './module/info';
import util from './module/util';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    info,
    util
  },
  getters
});
