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
            reject(res.data.message);
          }
        }).catch((e) => {
          console.warn('login: ' + e);
          oVm.$toast.fail('网络错误，请重试');
          reject(e);
        });
      });
    }
  }
}

export default user;