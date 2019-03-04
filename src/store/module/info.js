const info = {
  state: {
    oCompanyInfo: {},
    oBasicInfo: {
      '企业类型': [],
      '原料来源': []
    },
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
      return oVm.$http({
        url: '/company/getCompany',
        method: 'GET'
      }).then((res) => {
        if(res && res.data.code == 0) {
          context.commit('setCompanyInfo', res.data.data || {});
        }
      });
    },
    getBasicInfo(context, oVm) {
      return oVm.$http({
        url: `${window.baseUrl}/system/basic/getBasicInfo`,
        method: 'GET',
        params: {
          basicName: ''
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          context.commit('setBasicInfo', res.data.data || {});
        }
      });
    },
    getFileInfo(context, oVm) {
      return oVm.$http({
        url: `${window.baseUrl}/system/file/getFileInfo`,
        method: 'GET',
        params: {
          fileName: ''
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          context.commit('setFileInfo', res.data.data || {});
        }
      });
    }
  }
}

export default info;