<style lang="less" scoped>
  .home {
    background: #F8F8F8;
    height: 100vh;
    &-card {
      margin: 10px 8px 0 8px;
      padding-top: 20px;
      border-radius: 5px;
      height: 110px;
      background-size: 100% 100%;
      &--first {
        background-image: url('../../assets/firstCard.png');
      }
      &--second {
        background-image: url('../../assets/secondCard.png');
      }
      &--third {
        background-image: url('../../assets/thirdCard.png');
      }
      &__title {
        color: #FFF;
        font-size: 20px;
        margin: 0 8px;
      }
      &__btn {
        color: #FFF;
        font-size: 14px;
        border: 1px solid #FFF;
        border-radius: 5px;
        height: 26px;
        width: 69px;
        float: right;
        margin: 15px 8px 0 0;
      }
    }
  }
</style>
<style>
  .change-tabbar-icon .van-tabbar-item__icon {
    border-radius: 100%;
    width: 47px;
    height: 47px;
    background: #01B6AF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-size: 25px;
    margin: 0;
    margin-top: 1px;
  }
</style>


<template>
  <div class="home">
    <van-nav-bar title="业务办理">
      <van-icon name="bulb-o" slot="left" size="0.7rem">
        <sup class="dot"></sup>
      </van-icon>
      <van-icon name="setting-o" slot="right" size="0.6rem" @click="$router.push({name: 'setting'})" />
    </van-nav-bar>

    <div class="home-card home-card--first">
      <p class="home-card__title">原木类开证</p>
      <div class="home-card__btn flex-center-xy" @click="skipNewUrl('woodCert')">申请</div>
    </div>

    <div class="home-card home-card--second">
      <p class="home-card__title">板材类开证</p>
      <div class="home-card__btn flex-center-xy" @click="skipNewUrl('boardCert')">申请</div>
    </div>

    <div class="home-card home-card--third">
      <p class="home-card__title">木材运输证与植物检疫申请</p>
      <div class="home-card__btn flex-center-xy" @click="skipNewUrl('plantCert')">申请</div>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="clock-o" :to="{name: 'applyRecord'}">申请记录</van-tabbar-item>
      <van-tabbar-item icon="photograph" class="change-tabbar-icon flex-center-xy" @click="takePicture"></van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name: 'companySetting'}">企业管理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  async created() {
    if(!window.$storage.get('token')) {
      this.$router.push({name: 'login'});
    }
    else {
      await this.$store.dispatch('getCompanyInfo', this);
      if(!this.$store.getters.oCompanyInfo.id && window.$storage.get('user') && window.$storage.get('user').roles[0].id == 1) {
        window.$storage.set('isReg', true, 50 * 365 * 24 * 3600 * 1000);
        this.$router.push({name: 'setCompanyInfo'});
      }
    }
  },
  mounted () {
    let userAgent = window.plus.navigator.getUserAgent().toLowerCase();
    if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0) { 
      document.body.scrollTop = document.body.scrollHeight; 
    }
  },
  data() {
    return {
      active: 1
    }
  },
  methods: {
    takePicture() {
      window.plus.geolocation.getCurrentPosition((position) => {
        let camera = window.plus.camera.getCamera();
        camera.captureImage((capturedFile) => {
          window.$storage.merge('picture', {
            [capturedFile.split('/')[1]]: position.addresses
          });
        });
      }, (error) => {
        console.warn('get position err: ' + error.message);
        this.$toast('请开启定位功能后，再进行拍照');
      });
    },
    skipNewUrl (path) {
      if (this.$store.getters.oCompanyInfo.status == 2) {
        this.$router.push({name: path})
      }
      else {
        this.$toast('请在企业信息通过审核后再办理此项业务');
      }
    },
  }
}
</script>
