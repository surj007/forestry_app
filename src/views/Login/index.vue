<style scoped>
.ig-register {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 16px;
}
.ig-register-wrapper {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 20px;
  margin-top: 20px;
}
.btn {
  width: 330px;
}
.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.img {
  width: 144px;
  height: 132px;
}
.img-wrapper {
  display: flex;
  justify-content: center;
  height: 132px;
  margin-top: 17px;
  margin-bottom: 45px;
}
.forget {
  font-family: 'SourceHanSansSC-regular';
  color: #01B6AF;
  font-size: 12px;
}
.forget-wrapper {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 20px;
  margin-top: 15px;
  margin-bottom: 95px;
}
</style>
<style>
</style>

<template>
  <div class="login">
    <div class="ig-register-wrapper">
      <a href="javascript: void(0);" class="ig-register">注册</a>
    </div>

    <div class="img-wrapper">
      <img src="../../assets/loginTree.png" alt="" class="img" />
    </div>

    
    <van-cell-group>
      <van-field label="手机号" left-icon="phone-o" />
    </van-cell-group>

    <van-cell-group>
      <van-field label="登录密码" left-icon="bag-o" right-icon="closed-eye" />
    </van-cell-group>

    <div class="forget-wrapper">
      <a href="javascript: void(0);" class="forget">忘记密码</a>
    </div>
    
    <div class="btn-wrapper">
      <div class="btn">
        <van-button size="large" round type="primary">登陆</van-button>
      </div>
    </div>

    <div class="btn-wrapper">
      <a href="javascript: void(0);" class="forget">短信验证码登录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  created() {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
