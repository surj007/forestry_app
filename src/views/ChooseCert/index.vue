<style lang="less" scoped>
.choose-cert {
  background: #F8F8F8;
  height: 100vh;
  &-card {
    height: 94px;
    background: #FFF;
    border-radius: 10px;
    margin: 10px 10px 0 10px;
    padding: 20px 10px 10px 10px;
    &__img {
      height: 26px;
      width: 23px;
    }
    &__title {
      color: #333333;
      font-size: 16px;
      margin-left: 10px;
    }
    &__btn {
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
      float: right;
    }
  }
  &__tips {
    color: #FF8F3B;
    font-size: 14px;
    margin-left: 10px;
    margin-top: 32px;
    margin-bottom: 0;
  }
  &__btn {
    padding: 0 15px;
    margin-top: 200px;
  }
}
</style>

<template>
  <div>
    <div class="choose-cert" v-if="component == 'chooseCert'">
      <van-nav-bar title="填写开证单" />

      <div class="choose-cert-card">
        <div class="flex-center-y">
          <img src="../../assets/cert.png" alt="" class="choose-cert-card__img">
          
          <div class="choose-cert-card__title">板材类开证</div>
        </div>
        
        <div class="choose-cert-card__btn" @click="$router.push({name: 'boardCert'})">
          修改
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="choose-cert-card">
        <div class="flex-center-y">
          <img src="../../assets/cert.png" alt="" class="choose-cert-card__img">
          
          <div class="choose-cert-card__title">原木类开证</div>
        </div>
        
        <div class="choose-cert-card__btn" @click="$router.push({name: 'woodCert'})">
          修改
          <van-icon name="arrow" />
        </div>
      </div>

      <p class="choose-cert__tips">注意: 以上开证单至少填写一项</p>

      <div class="choose-cert__btn change-button-background">
        <van-button size="large" round type="primary" :disabled="!$window.$storage.get('hasCert')" @click="component = 'confirm'">提交审核</van-button>
      </div>
    </div>

    <Confirm v-if="component == 'confirm'" sContentTop="注册成功" sContentBottom="请耐心等待审核" sBtnText="查看申请记录" :fhandleBtnClick="finishReg" />
  </div>
</template>


<script>
import Confirm from '../../components/Confirm';

export default {
  name: 'ChooseCert',
  components: {
    Confirm
  },
  data() {
    return {
      component: 'chooseCert'
    }
  },
  methods: {
    finishReg() {
      window.$storage.del('isReg');
      this.$router.push({name: 'applyRecord'});
    }
  }
}
</script>
