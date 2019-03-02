<style scoped>
.resetPwd {
  margin-bottom: 20px;
}
.cancel {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 16px;
  position: absolute;
  right: 19px;
}
.title {
  font-family: 'Microsoft Yahei';
  color: #333333;
  font-size: 16px;
}
.title-wrapper {
  display: flex;
  justify-content: center;
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
  margin-bottom: 30px;
}
.send-code {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 14px;
}
.btn {
  padding: 0 15px 0 15px;
  margin-top: 48px;
}
</style>

<template>
  <div class="resetPwd">
    <div class="content" v-if="sComponent == 'content'">
      <div class="header">
        <a href="javascript: void(0);" class="cancel" @click="cancel">取消</a>
        <div class="title-wrapper">
          <span class="title">重置密码</span>
        </div>
      </div>

      <div class="img-wrapper">
        <img src="../../assets/loginTree.png" alt="" class="img" />
      </div>

      <van-cell-group class="van-hairline--bottom" :border="false">
        <van-field placeholder="请输入注册时用的手机号" left-icon="phone-o" type="number"
        :error-message="oErrMsg.sUsernameErrMsg" v-model="oLoginFormData.sUsername" 
        @blur="handleInputBlur('sUsername')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field placeholder="请输入新密码（6-18位、数字组合）" left-icon="bag-o" :right-icon="bShowPwd ? 'closed-eye' : 'eye-o'"
        :error-message="oErrMsg.sPasswordErrMsg" @click-right-icon="changeShowPwd"
        :type="bShowPwd ? '' : 'password'" v-model="oLoginFormData.sPassword" @blur="handleInputBlur('sPassword')" />
      </van-cell-group>
      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field placeholder="请再次输入新密码" left-icon="bag-o" :error-message="oErrMsg.sConfirmPasswordErrMsg"
        :type="bShowPwd ? '' : 'password'" v-model="oLoginFormData.sConfirmPassword" @blur="handleInputBlur('sConfirmPassword')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field placeholder="短信验证码" left-icon="label-o" type="number"
        :error-message="oErrMsg.sCodeErrMsg" @blur="handleInputBlur('sCode')" v-model="oLoginFormData.sCode">
          <a id="sendCodeBtn" slot="button" href="javascript: void(0);" class="send-code" @click="sendCode">
            {{ sSendCodeContent }}
          </a>
        </van-field>
      </van-cell-group>

      <div class="btn change-button-background">
        <van-button size="large" round type="primary" @click="submit">确认</van-button>
      </div>
    </div>

    <div class="confirm-component" v-if="sComponent == 'confirm'">
      <Confirm sContentTop="重置密码成功" sContentBottom="1" sBtnText="返回登录" :fhandleBtnClick="cancel" />
    </div>
  </div>
</template>

<script>
import Confirm from '../../components/Confirm';

export default {
  name: 'ResetPwd',
  components: {
    Confirm
  },
  beforeDestroy() {
    clearInterval(this.nTimer);
  },
  data() {
    return {
      bShowPwd: false,
      sSendCodeContent: '发送验证码',
      sComponent: 'content',
      nSecond: 0,
      nTimer: -1,
      oErrMsg: {
        sUsernameErrMsg: '',
        sPasswordErrMsg: '',
        sConfirmPasswordErrMsg: '',
        sCodeErrMsg: '',
      },
      oLoginFormData: {
        sUsername: '',
        sPassword: '',
        sConfirmPassword: '',
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
      if(this.oLoginFormData.sConfirmPassword == '') {
        this.oErrMsg.sConfirmPasswordErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oLoginFormData.sCode == '') {
        this.oErrMsg.sCodeErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(bFlag) {
        return;
      }

      if(this.oLoginFormData.sPassword != this.oLoginFormData.sConfirmPassword) {
        this.$toast('密码输入不一致');
        return;
      }

      this.$http({
        url: '/auth/forgetPwd',
        method: 'POST',
        data: {
          username: this.oLoginFormData.sUsername,
          password: this.oLoginFormData.sPassword,
          code: this.oLoginFormData.sCode
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.sComponent = 'confirm';
        }
      });
    },
    getCode(fCallback) {
      this.$http({
        url: '/auth/getCode4RegAndResetPwd',
        method: 'GET',
        params: {
          phone: this.oLoginFormData.sUsername,
          type: 'resetPwd'
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
    changeShowPwd() {
      this.bShowPwd = !this.bShowPwd;
    },
    cancel() {
      this.$router.push({name: 'login'});
    }
  }
}
</script>
