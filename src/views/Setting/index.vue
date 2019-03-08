<style lang="less" scoped>
.setting {
  background: #f8f8ff;
  height: 100vh;
  &-loading {
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 100;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
<style>
.change-cell .van-cell__title {
  display: flex;
  justify-content: center;
  color: #FF8F3B;
}
</style>


<template>
  <div class="setting">
    <van-nav-bar title="设置" left-arrow @click-left="goBack" />

    <van-cell-group style="margin-bottom: 7px">
      <van-cell title="通用设置" is-link size="large" @click="showPopup('setNotice')" />
      <van-cell title="修改密码" is-link size="large" @click="showPopup('changePassword')" />
    </van-cell-group>

    <van-cell-group style="margin-bottom: 7px">
      <van-cell title="清理缓存" is-link size="large" @click="delCache" />
    </van-cell-group>

    <van-loading color="white" class="setting-loading" size="60px" v-if="showLoading" />

    <van-cell-group style="margin-bottom: 7px">
      <van-cell title="反馈" is-link size="large" />
      <van-cell title="关于林业检疫助手" is-link size="large" />
    </van-cell-group>

    <van-cell-group>
      <van-cell title="退出登陆" size="large" class="change-cell" @click="logout" />
    </van-cell-group>

    <van-popup v-model="showPopupPage" position="right" :overlay="false">
      <change-password v-if="showPage === 'changePassword'" @close-popup="showPopupPage = false" />
      <set-notice v-if="showPage === 'setNotice'" @close-popup="showPopupPage = false" />
    </van-popup>
  </div>
</template>

<script>
import { delAllInfo } from '../../service/auth';
import ChangePassword from './ChangePassword';
import SetNotice from './SetNotice';

export default {
  name: 'Setting',
  components: {
    ChangePassword, SetNotice
  },
  data() {
    return {
      showLoading: false,
      showPopupPage: false,
      showPage: ''
    }
  },
  methods: {
    showPopup(pageType) {
      this.showPage = pageType;
      this.showPopupPage = true;
    },
    delCache() {
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
        this.$toast.success('清除缓存成功');
      }, 2000);
    },
    logout() {
      this.$http({
        url: '/auth/logout',
        method: 'GET'
      }).then((res) => {
        if(res && res.data.code == 0) {
          delAllInfo();
          this.$toast.success('退出登陆成功');
          this.$router.push({name: 'login'});
        }
      });
    },
    goBack() {
      window.history.back();
    }
  }
}
</script>
