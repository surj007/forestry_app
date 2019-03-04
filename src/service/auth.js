exports.delAllInfo = () => {
  window.$storage.del('token');
  window.$storage.del('user');
  window.$vm.$store.commit('setCompanyInfo', {});
  window.$vm.$store.commit('setBasicInfo', {
    '企业类型': [],
    '原料来源': []
  });
  window.$vm.$store.commit('setFileInfo', {});
  window.$vm.$store.commit('setUserInfo', {});
}