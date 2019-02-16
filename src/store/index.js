import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUserInfo: {},
    oCompanyInfo: {},
    oBasicInfo: {},
    oFileInfo: {}
  },
  mutations: {
    setUserInfo(state, data) {
      state.oUserInfo = data;
    },
    setCompanyInfo(state, data) {
      state.oCompanyInfo = data;
    },
    setBasicInfo(state, data) {
      state.oBasicInfo = data;
    },
    setFileInfo(state, data) {
      state.oFileInfo = data;
    }
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
          console.warn('login: ' + e);
          oVm.$toast.fail('网络错误，请重试');
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
          console.warn('getCompanyInfo: ' + e);
          oVm.$toast.fail('网络错误，请重试');
          reject();
        });
      });
    },
    getBasicInfo(context, oVm) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: `${window.baseUrl}/basic/getBasicInfo`,
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setBasicInfo', res.data.data);
            resolve();
          }
          else {
            oVm.$toast.fail(res.data.message);
            reject();
          }
        }).catch((e) => {
          console.warn('getBasicInfo: ' + e);
          oVm.$toast.fail('网络错误，请重试');
          reject();
        });
      });
    },
    getFileInfo(context, oVm) {
      return new Promise((resolve, reject) => {
        oVm.$http({
          url: `${window.baseUrl}/basic/getFileInfo`,
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {
            context.commit('setFileInfo', res.data.data);
            resolve();
          }
          else {
            oVm.$toast.fail(res.data.message);
            reject();
          }
        }).catch((e) => {
          console.warn('getFileInfo: ' + e);
          oVm.$toast.fail('网络错误，请重试');
          reject();
        });
      });
    }
  }
});
