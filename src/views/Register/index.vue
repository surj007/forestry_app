<style lang="less" scoped>
.register {
  margin-bottom: 20px;
}
.login {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 16px;
}
.login-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 19px;
  margin-top: 13px;
}
.img {
  width: 144px;
  height: 132px;
}
.img-wrapper {
  display: flex;
  justify-content: center;
  height: 132px;
  margin-top: 13px;
  margin-bottom: 20px;
}
.text {
  font-family: 'SourceHanSansSC-regular';
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
.link {
  margin-top: 45px;
  font-family: 'SourceHanSansSC-regular';
  font-size: 14px;
  text-align: center;
  a {
    display: block;
    color: #01B6AF;
    margin-top: 20px;
  }
}
.agree-text {
  font-family: 'SourceHanSansSC-regular';
  font-size: 12px;
}
.btn-confirm {
  padding: 0 15px 0 15px;
  margin-top: 94px;
}
.send-code {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 14px;
}
.btn-reg {
  padding: 0 15px 0 15px;
  margin-top: 55px;
}
</style>

<template>
  <div class="register">
    <div class="login-wrapper">
      <van-icon name="arrow-left" size="23px" :color="sBackIcon" @click="goback(sBackIcon)" />
      <a href="javascript: void(0);" class="login" @click="skipNewPath('login')">登陆</a>
    </div>

    <div class="img-wrapper">
      <img src="../../assets/loginTree.png" alt="" class="img" />
    </div>

    <div class="info-component" v-if="sComponent == 'info'">
      <div class="text">
        <p>因企业注册需要</p>
        <p>请先下载以下告知书，认真阅读并签字盖章</p>
      </div>

      <div class="link">
        <a href="javascript: void(0);" @click="confirmDownload('林业植物检疫监管告知书')">下载《林业植物检疫监管告知书》</a>
        <a href="javascript: void(0);" @click="confirmDownload('木材调运检疫开证承诺书')">下载《木材调运检疫开证承诺书》</a>
      </div>

      <div class="btn-confirm change-button-background">
        <van-button size="large" round type="primary" @click="goForm">已下载</van-button>
      </div>

      <p class="agree-text flex-center-x" style="color: #999999;margin-top: 17px;">
        注册即视为同意
        <a href="javascript: void(0);" class="agree-text" style="color: #01B6AF;">
          《用户服务协议》
        </a>
      </p>
    </div>

    <div class="form-component" v-if="sComponent == 'form'">
      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 30px;margin-bottom: 20px;">
        <van-field placeholder="请输入手机号" left-icon="phone-o" 
        type="number" :error-message="oErrMsg.sUsernameErrMsg"
        v-model="oLoginFormData.sUsername" @blur="handleInputBlur('sUsername')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-bottom: 20px;">
        <van-field placeholder="登录密码（6-18位、数字组合）" left-icon="bag-o" :right-icon="bShowPwd ? 'closed-eye' : 'eye-o'"
        :error-message="oErrMsg.sPasswordErrMsg" @click-right-icon="changeShowPwd"
        :type="bShowPwd ? '' : 'password'" v-model="oLoginFormData.sPassword" @blur="handleInputBlur('sPassword')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false">
        <van-field placeholder="短信验证码" left-icon="label-o" type="number"
        :error-message="oErrMsg.sCodeErrMsg" @blur="handleInputBlur('sCode')" v-model="oLoginFormData.sCode">
          <a id="sendCodeBtn" slot="button" href="javascript: void(0);" class="send-code" @click="sendCode">
            {{ sSendCodeContent }}
          </a>
        </van-field>
      </van-cell-group>

      <div class="btn-reg change-button-background">
        <van-button size="large" round type="primary" @click="submit">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  beforeDestroy() {
    clearInterval(this.nTimer);
  },
  computed: {
    sBackIcon() {
      return this.sComponent == 'info' ? 'transparent' : ''
    }
  },
  data() {
    return {
      bShowPwd: false,
      sComponent: 'info',
      sSendCodeContent: '发送验证码',
      nSecond: 0,
      nTimer: -1,
      oErrMsg: {
        sUsernameErrMsg: '',
        sPasswordErrMsg: '',
        sCodeErrMsg: ''
      },
      oLoginFormData: {
        sUsername: '',
        sPassword: '',
        sCode: ''
      }
    }
  },
  methods: {
    submit() {
      let bFlag = false;
      if(this.oLoginFormData.sUsername == '') {
        this.oErrMsg.sUsernameErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oLoginFormData.sPassword == '') {
        this.oErrMsg.sPasswordErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oLoginFormData.sCode == '') {
        this.oErrMsg.sCodeErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(bFlag) {
        return;
      }

      this.$http({
        url: '/auth/regUser',
        method: 'POST',
        data: {
          username: this.oLoginFormData.sUsername,
          password: this.oLoginFormData.sPassword,
          code: this.oLoginFormData.sCode
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.$toast.success('注册成功，请登陆');
          this.skipNewPath('login');
        }
      });
    },
    getCode(fCallback) {
      this.$http({
        url: '/auth/getCode4RegAndResetPwd',
        method: 'GET',
        params: {
          phone: this.oLoginFormData.sUsername,
          type: 'reg'
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.$toast.success('验证码已发送');
          fCallback && fCallback();
        }
      });
    },
    sendCode() {
      this.handleInputBlur('sUsername');
      if(this.oErrMsg.sUsernameErrMsg == '') {
        this.getCode(() => {
          this.nSecond = 60;
          document.querySelectorAll('#sendCodeBtn')[0].style['pointer-events'] = 'none';
          document.querySelectorAll('#sendCodeBtn')[0].style.color = '#ccc'; 
          this.sSendCodeContent = this.nSecond + '秒后重新发送验证码';
          this.nTimer = setInterval(() => {
            this.sSendCodeContent = --this.nSecond + '秒后重新发送验证码';
            if(this.nSecond == 0) {
              clearInterval(this.nTimer);
              document.querySelectorAll('#sendCodeBtn')[0] && (document.querySelectorAll('#sendCodeBtn')[0].style['pointer-events'] = 'auto');
              document.querySelectorAll('#sendCodeBtn')[0] && (document.querySelectorAll('#sendCodeBtn')[0].style.color = '#01B6AF');
              this.sSendCodeContent = '发送验证码';
            }
          }, 1000);
        });
      }
    },
    handleInputBlur(sInputName) {
      if(this.oLoginFormData[sInputName] == '') {
        this.oErrMsg[sInputName + 'ErrMsg'] = '此项不能为空';
      }
      else {
        this.oErrMsg[sInputName + 'ErrMsg'] = '';
      }
    },
    async confirmDownload(sType) {
      await this.$store.dispatch('savePic2SysGallery', {sType, oVm: this});
      this.$dialog.confirm({
        title: '提示',
        message: '已自动保存至手机相册',
        confirmButtonText: '跳过',
        cancelButtonText: '查看'
      }).then(() => {
        this.sComponent = 'form';
      }).catch(() => {
        window.plus.gallery.pick();
      });
    },
    changeShowPwd() {
      this.bShowPwd = !this.bShowPwd;
    },
    skipNewPath(sPath) {
      this.$router.push({name: sPath});
    },
    goForm() {
      this.sComponent = 'form';
      if(this.nSecond != 0) {
        this.$nextTick(() => {
          document.querySelectorAll('#sendCodeBtn')[0].style['pointer-events'] = 'none';
          document.querySelectorAll('#sendCodeBtn')[0].style.color = '#ccc';
        }); 
      }
    },
    goback(sFlag) {
      if(!sFlag) {
        this.sComponent = 'info';
      }
    }
  }
}
</script>