import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUserInfo: {},
    oCompanyInfo: {}
  },
  mutations: {
    setUserInfo(state, data) {
      state.oUserInfo = data;
    },
    setCompanyInfo(state, data) {
      state.oCompanyInfo = data;
    },
  },
  actions: {
    login(context, { oLoginFormData, oVm }) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: '/auth/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: oVm.$qs.stringify({
            username: `${oLoginFormData.sUsername}-@_${oLoginFormData.sLoginType}`,
            password: oLoginFormData.sPassword
          })
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setUserInfo', res.data.data);
            resolve();
          }
          else {
            oVm.$toast.fail(res.data.message);
            reject();
          }
        }).catch((e) => {
          console.log('login: ' + e);
          oVm.$toast('网络错误，请重试');
          reject();
        });
      });
    },
    getCompanyInfo(context, oVm) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: '/company/getCompany',
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setCompanyInfo', res.data.data);
            resolve();
          }
          else {
            oVm.$toast.fail(res.data.message);
            reject();
          }
        }).catch((e) => {
          console.log('getCompanyInfo: ' + e);
          oVm.$toast('网络错误，请重试');
          reject();
        });
      });
    }
  }
});
