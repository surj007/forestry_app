const user = {
  state: {
    oUserInfo: {}
  },
  mutations: {
    setUserInfo(state, data) {
      state.oUserInfo = data;
    }
  },
  actions: {
    login(context, { oLoginFormData, oVm }) {
      return oVm.$http({
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
        if(res && res.data.code == 0) {
          context.commit('setUserInfo', res.data.data);
          window.$storage.set('user', res.data.data);
        }
      });
    }
  }
}

export default user;