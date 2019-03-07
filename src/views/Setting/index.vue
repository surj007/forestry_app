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
      <van-cell title="修改密码" is-link size="large" />
    </van-cell-group>

    <van-cell-group style="margin-bottom: 7px">
      <van-cell title="清理缓存" is-link size="large" @click="delCache" />
    </van-cell-group>

    <van-cell-group style="margin-bottom: 7px">
      <van-cell title="反馈" is-link size="large" />
      <van-cell title="关于林业检疫助手" is-link size="large" />
    </van-cell-group>

    <van-loading color="white" class="setting-loading" size="60px" v-if="showLoading" />

    <van-cell-group>
      <van-cell title="退出登陆" size="large" class="change-cell" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      showLoading: false
    }
  },
  methods: {
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
        method: 'POST'
      }).then((res) => {
        this.$toast.success('退出登陆成功');
      });
    },
    goBack() {
      window.history.back();
    }
  }
}
</script>
