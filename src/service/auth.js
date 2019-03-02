exports.delAllInfo = () => {
  window.$storage.del('token');
  window.$vm.$store.commit('setCompanyInfo', {});
  window.$vm.$store.commit('setBasicInfo', {});
  window.$vm.$store.commit('setFileInfo', {});
  window.$vm.$store.commit('setUserInfo', {});
}