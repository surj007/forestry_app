<style lang="less" scoped>
  .field {
    padding: 0 10px 0 5px;
  }
  .btn {
    margin-top: 160px;
    padding: 0 15px;
  }
</style>

<template>
  <div class="change-password">
    <van-nav-bar title="修改密码" left-arrow @click-left="$emit('close-popup')" />

    <div class="field">
      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 50px;">
        <van-field placeholder="请输入当前密码" :error-message="errMsg.currentPasswordErrMsg"
        :right-icon="showPassword ? 'closed-eye' : 'eye-o'" @click-right-icon="showPassword = !showPassword"
        :type="showPassword ? '' : 'password'" v-model="formData.currentPassword" @blur="handleInputBlur('currentPassword')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 20px;">
        <van-field placeholder="请输入新密码" :error-message="errMsg.newPasswordErrMsg"
        :type="showPassword ? '' : 'password'" v-model="formData.newPassword" @blur="handleInputBlur('newPassword')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 20px;">
        <van-field placeholder="请再次输入新密码" :error-message="errMsg.confirmPasswordErrMsg"
        :type="showPassword ? '' : 'password'" v-model="formData.confirmPassword" @blur="handleInputBlur('confirmPassword')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>
    </div>

    <div class="btn change-button-background">
      <van-button size="large" round type="primary" @click="submit">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      showPassword: false,
      errMsg: {
        currentPasswordErrMsg: '',
        newPasswordErrMsg: '',
        confirmPasswordErrMsg: ''
      },
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submit() {
      if(this.validate()) {
        this.$http({
          url: '/auth/changePassword',
          method: 'POST',
          data: this.formData
        }).then((res) => {
          if(res && res.data.code == 0) {
            this.$toast.success('修改密码成功');
            this.$emit('close-popup');
          }
        });
      }
    },
    validate() {
      let flag = true;
      if(this.formData.currentPassword == '') {
        this.errMsg.currentPasswordErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.newPassword == '') {
        this.errMsg.newPasswordErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.confirmPassword == '') {
        this.errMsg.confirmPasswordErrMsg = '此项不能为空';
        flag = false;
      }
      if(!flag) {
        return flag;
      }

      if(this.formData.newPassword != this.formData.confirmPassword) {
        this.$toast.fail('新密码输入不一致');
      }

      return flag;
    },
    handleInputBlur(inputName) {
      if(this.formData[inputName] === '') {
        this.errMsg[inputName + 'ErrMsg'] = '此项不能为空';
      }
      else {
        this.errMsg[inputName + 'ErrMsg'] = '';
      }
    }
  }
}
</script>