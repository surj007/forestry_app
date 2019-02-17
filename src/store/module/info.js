const info = {
  state: {
    oCompanyInfo: {},
    oBasicInfo: {},
    oFileInfo: {}
  },
  mutations: {
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
          url: `${window.baseUrl}/system/basic/getBasicInfo`,
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
          url: `${window.baseUrl}/system/basic/getFileInfo`,
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
}

export default info;