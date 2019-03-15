<style lang="less" scoped>
  .company-setting {
    background: #F8F8F8;
    height: 100vh;
    &-top-card {
      margin: 12px 8px 12px 8px;
      height: 143px;
      border-radius: 5px;
      box-shadow: 0px 0px 4px 2px rgba(230, 230, 230, 1);
      background-image: url('../../assets/companyCard.png');
      background-size: 100% 100%;
      &-header {
        &__img {
          height: 26px;
          width: 23px;
          margin: 24px 8px 0 15px;
        }
        &__text {
          font-size: 16px;
          color: #FFF;
          line-height: 23px;
          margin: 24px 44px 0 0;
        }
        &__icon {
          margin: 27px 8px 0 0;
        }
      }
      &-middle {
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        margin-left: 45px;
        font-size: 12px;
        color: #FFF;
        border-bottom: 1px solid #FFF
      }
      &-footer {
        margin-top: 13px;
        margin-left: 45px;
        color: #FFF;
        font-size: 14px;
        &__time {
          margin-left: 25px;
        }
      }
    }
    &-middle-card-wrapper {
      margin: 0 8px!important;
      .company-setting-middle-card {
        border-radius: 5px;
        box-shadow: 0px 0px 4px 2px rgba(230, 230, 230, 1);
        border: 1px solid rgba(255, 255, 255, 0);
        background: #FFF;
        box-sizing: border-box;
        height: 73px;
        &__title {
          color: #333333;
          font-size: 14px;
          margin: 13px 35px 10px 8px;
        }
        &__text {
          color: #999999;
          font-size: 12px;
          line-height: 20px;
        }
        &__amount {
          margin-left: 8px;
          color: #01B6AF;
          font-size: 20px;
        }
        &__unit {
          color: #333333;
          font-size: 16px;
        }
      }
    }
  }
</style>

<template>
  <div class="company-setting">
    <van-nav-bar title="企业管理">
      <van-icon name="bulb-o" slot="left" size="0.7rem">
        <sup class="dot"></sup>
      </van-icon>
      <van-icon name="photo-o" slot="right" size="0.65rem" @click="isShowGalleryPopup = true" />
    </van-nav-bar>

    <div class="company-setting-top-card">
      <div class="flex-space-between">
        <div class="flex-center-y">
          <img src="../../assets/companyIcon.png" alt="" class="company-setting-top-card-header__img">
          <div class="company-setting-top-card-header__text">{{ $store.getters.oCompanyInfo.name }}</div>
        </div>

        <van-icon name="arrow" color="#FFF" size="0.5rem" v-if="$window.$storage.get('user').boss === 0"
        class="company-setting-top-card-header__icon"  @click="$router.push({name: 'setCompanyInfo'})" />
      </div>

      <div class="company-setting-top-card-middle">{{ $store.getters.oCompanyInfo.code }}</div>

      <div class="flex-center-y company-setting-top-card-footer">
        <div class="company-setting-top-card-footer__text">{{ status }}</div>
        <div class="company-setting-top-card-footer__time">{{ $store.getters.oCompanyInfo.last_modify_time }}</div>
      </div>
    </div>

    <van-row gutter="10" class="company-setting-middle-card-wrapper">
      <van-col span="12">
        <div class="company-setting-middle-card">
          <div class="flex-center-y">
            <div class="company-setting-middle-card__title">可用原木量</div>
            <div class="company-setting-middle-card__text flex-center-y" @click="$router.push({name: 'woodCert'})">
              开证
              <van-icon name="arrow" />
            </div>
          </div>

          <div style="font-size: 0;">
            <span class="company-setting-middle-card__amount">{{ amount.woodCertAmount }}</span>
            <span class="company-setting-middle-card__unit">m³</span>
          </div>
        </div>
      </van-col>

      <van-col span="12">
        <div class="company-setting-middle-card">
          <div class="flex-center-y">
            <div class="company-setting-middle-card__title">可用板材量</div>
            <div class="company-setting-middle-card__text flex-center-y" @click="$router.push({name: 'boardCert'})">
              开证
              <van-icon name="arrow" />
            </div>
          </div>

          <div style="font-size: 0;">
            <span class="company-setting-middle-card__amount">{{ amount.boardCertAmount }}</span>
            <span class="company-setting-middle-card__unit">m³</span>
          </div>
        </div>
      </van-col>
    </van-row>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="clock-o" :to="{name: 'applyRecord'}">申请记录</van-tabbar-item>
      <van-tabbar-item icon="orders-o" :to="{name: 'home'}">业务办理</van-tabbar-item>
      <van-tabbar-item icon="user-o">企业管理</van-tabbar-item>
    </van-tabbar>

    <my-gallery v-model="isShowGalleryPopup" />
  </div>
</template>

<script>
import MyGallery from '../../components/MyGallery';

export default {
  name: 'CompanySetting',
  components: {
    MyGallery
  },
  created() {
    this.$store.dispatch('getCompanyInfo', this);
    this.getCertAmount();
  },
  computed: {
    status() {
      switch (this.$store.getters.oCompanyInfo.status) {
        case 1: {
          return '审核中'
        }
        case 2: {
          return '已注册'
        }
        case 3: {
          return '未通过'
        }
        case 4: {
          return '已注销'
        }
        default:
          return;
      }
    }
  },
  data() {
    return {
      active: 2,
      amount: {},
      isShowGalleryPopup: false
    }
  },
  methods: {
    getCertAmount() {
      this.$http({
        url: '/cert/getCertAmount',
        method: 'GET'
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.amount = res.data.data;
        }
      });
    }
  }
}
</script>