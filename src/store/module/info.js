const info = {
  state: {
    oCompanyInfo: {},
    oBasicInfo: {
      '企业类型': {info: []},
      '原料来源': {info: []},
      '植物产品名称': {info: []},
      '品种': {info: []}
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
          if(res.data.data) {
            res.data.data.companyType = res.data.data.companyType.split(',');
            res.data.data.source = res.data.data.source.split(',');
            res.data.data.outCityCompany = res.data.data.outCityCompany == 1;
          }
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