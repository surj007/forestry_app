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
.btn {
  padding: 0 15px 0 15px;
  margin-top: 90px;
}
</style>

<template>
  <div class="register">
    <div class="login-wrapper">
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
        <a href="javascript: void(0);" @click="confirmDownload('notice')">下载《林业植物检疫监管告知书》</a>
        <a href="javascript: void(0);" @click="confirmDownload('promise')">下载《承诺书》</a>
      </div>

      <div class="btn change-button-background">
        <van-button size="large" round type="primary" @click="sComponent = 'form'">已下载</van-button>
      </div>
    </div>

    <div class="form-component" v-if="sComponent == 'form'">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      sComponent: 'info'
    }
  },
  methods: {
    confirmDownload(type) {
      this.savePic2SysGallery(type);
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
    savePic2SysGallery(type) {
      window.plus.gallery.save(`_www/image/${type}.png`);
    },
    skipNewPath(path) {
      this.$router.push({name: path});
    }
  }
}
</script>
