<style scoped>
.login {
  margin-bottom: 20px;
}
.register {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 16px;
}
.register-wrapper {
  display: flex;
  flex-direction: row-reverse;
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
  margin-top: 18px;
  margin-bottom: 40px;
}
.send-code {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 14px;
}
.forget {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 12px;
}
.forget-wrapper {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 19px;
  margin-top: 14px;
}
.btn {
  padding: 0 15px 0 15px;
  margin-top: 90px;
}
.login-type {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
</style>

<template>
  <div class="login">
    <div class="register-wrapper">
      <a href="javascript: void(0);" class="register">注册</a>
    </div>

    <div class="img-wrapper">
      <img src="../../assets/loginTree.png" alt="" class="img" />
    </div>

    <van-cell-group class="van-hairline--bottom" :border="false" style="margin-bottom: 20px;">
      <van-field placeholder="请输入手机号" left-icon="phone-o" 
      type="number" :error-message="oErrMsg.sUsernameErrMsg"
      v-model="oLoginFormData.sUsername" @blur="handleUsernameInputBlur">
        <span slot="button" style="color: transparent;">1</span>
      </van-field>
    </van-cell-group>

    <van-cell-group class="van-hairline--bottom" :border="false">
      <van-field placeholder="登录密码（6-18位、数字组合）" left-icon="bag-o" :error-message="oErrMsg.sPasswordErrMsg"
      :right-icon="bShowPwd ? 'closed-eye' : 'eye-o'" @click-right-icon="changeShowPwd" v-if="oLoginFormData.sLoginType == 'password'"
      :type="bShowPwd ? '' : 'password'" v-model="oLoginFormData.sPassword" @blur="handlePasswordInputBlur" />
      <van-field placeholder="短信验证码" left-icon="label-o" 
      :error-message="oErrMsg.sPasswordErrMsg" @blur="handlePasswordInputBlur"
      type="number" v-model="oLoginFormData.sPassword" v-if="oLoginFormData.sLoginType == 'code'">
        <a id="sendCodeBtn" slot="button" v-if="oLoginFormData.sLoginType == 'code'"
        href="javascript: void(0);" class="send-code" @click="sendCode">
          {{ sSendCodeContent }}
        </a>
      </van-field>
    </van-cell-group>

    <div class="forget-wrapper" v-if="oLoginFormData.sLoginType == 'password'">
      <a href="javascript: void(0);" class="forget" @click="forgetPwd">忘记密码</a>
    </div>
    <div class="forget-wrapper" style="height: 13px;" v-if="oLoginFormData.sLoginType == 'code'"></div>
     
    <div class="btn change-button-background">
      <van-button size="large" round type="primary" @click="loginSubmit">登陆</van-button>
    </div>

    <div class="login-type" v-if="oLoginFormData.sLoginType == 'password'" @click="changeLoginType('code')">
      <a href="javascript: void(0);" class="forget">短信验证码登录</a>
    </div>
    <div class="login-type" v-if="oLoginFormData.sLoginType == 'code'" @click="changeLoginType('password')">
      <a href="javascript: void(0);" class="forget">账号密码登录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      bShowPwd: false,
      sSendCodeContent: '发送验证码',
      nSecond: 0,
      oErrMsg: {
        sUsernameErrMsg: '',
        sPasswordErrMsg: ''
      },
      oLoginFormData: {
        sUsername: '',
        sPassword: '',
        sLoginType: 'password'
      }
    }
  },
  methods: {
    loginSubmit() {
      let flag = false;
      if(this.oLoginFormData.sUsername == '') {
        this.oErrMsg.sUsernameErrMsg = '此项不能为空';
        flag = true;
      }
      if(this.oLoginFormData.sPassword == '') {
        this.oErrMsg.sPasswordErrMsg = '此项不能为空';
        flag = true;
      }
      if(flag) {
        return;
      }

      this.$store.dispatch('login', {oLoginFormData: this.oLoginFormData, oVm: this});
    },
    getCode(callback) {
      this.$http({
        url: '/auth/getCode4Login',
        method: 'GET',
        params: {
          phone: this.oLoginFormData.sUsername
        }
      }).then((res) => {
        if(res.data.code == 0) {
          this.$toast.success('验证码已发送');
          callback && callback();
        }
        else {
          this.$toast.fail(res.data.message);
        }
      }).catch((e) => {
        console.log('getCode: ' + e);
        this.$toast('获取验证码错误，请联系管理员');
      });
    },
    sendCode() {
      this.handleUsernameInputBlur();
      if(this.oErrMsg.sUsernameErrMsg == '') {
        this.getCode(() => {
          this.nSecond = 60;
          document.querySelectorAll('#sendCodeBtn')[0].style['pointer-events'] = 'none';
          document.querySelectorAll('#sendCodeBtn')[0].style.color = '#ccc'; 
          this.sSendCodeContent = this.nSecond + '秒后重新发送验证码';
          let timer = setInterval(() => {
            this.sSendCodeContent = --this.nSecond + '秒后重新发送验证码';
            if(this.nSecond == 0) {
              clearInterval(timer);
              document.querySelectorAll('#sendCodeBtn')[0] && (document.querySelectorAll('#sendCodeBtn')[0].style['pointer-events'] = 'auto');
              document.querySelectorAll('#sendCodeBtn')[0] && (document.querySelectorAll('#sendCodeBtn')[0].style.color = '#01B6AF');
              this.sSendCodeContent = '发送验证码';
            }
          }, 1000);
        });
      }
    },
    handleUsernameInputBlur() {
      if(this.oLoginFormData.sUsername == '') {
        this.oErrMsg.sUsernameErrMsg = '此项不能为空';
      }
      else {
        this.oErrMsg.sUsernameErrMsg = '';
      }
    },
    handlePasswordInputBlur() {
      if(this.oLoginFormData.sPassword == '') {
        this.oErrMsg.sPasswordErrMsg = '此项不能为空';
      }
      else {
        this.oErrMsg.sPasswordErrMsg = '';
      }
    },
    changeLoginType(type) {
      this.oLoginFormData = {
        sUsername: '',
        sPassword: '',
        sLoginType: type
      };
      this.oErrMsg = {
        sUsernameErrMsg: '',
        sPasswordErrMsg: ''
      }
      if(this.nSecond != 0 && type == 'code') {
        this.$nextTick(() => {
          document.querySelectorAll('#sendCodeBtn')[0].style['pointer-events'] = 'none';
          document.querySelectorAll('#sendCodeBtn')[0].style.color = '#ccc';
        }); 
      }
    },
    changeShowPwd() {
      this.bShowPwd = !this.bShowPwd;
    },
    forgetPwd() {
      this.$router.push({name: 'resetPwd'});
    }
  }
}
</script>
