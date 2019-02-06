import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUserInfo: {}
  },
  mutations: {
    setUserInfo(state, data) {
      state.oUserInfo = data;
    }
  },
  actions: {
    login(context, {oLoginFormData, oVm}) {
      return new Promise((resolve) => {
        oVm.$http({
          url: '/auth/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: oVm.$qs.stringify({
            username: `${oLoginFormData.sUsername}&${oLoginFormData.sLoginType}`,
            password: oLoginFormData.sPassword
          })
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setUserInfo', res.data.data);
            resolve();
          }
          else {
            oVm.$toast.fail(res.data.message);
          }
        }).catch((e) => {
          console.log('login: ' + e);
          oVm.$toast('登陆错误，请联系管理员');
        });
      });
    }
  }
});
