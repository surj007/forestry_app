<style lang="less" scoped>
.img {
  width: 132px;
  height: 132px;
}
.img-wrapper {
  display: flex;
  justify-content: center;
  height: 132px;
  margin-top: 127px;
  margin-bottom: 28px;
}
.content {
  font-family: 'SourceHanSansSC-regular';
  color: #999999;
  text-align: center;
  p {
    margin: 0;
  }
}
.btn {
  padding: 0 15px 0 15px;
  margin-top: 50px;
}
.hide {
  color: transparent;
}
</style>

<template>
  <div class="confirm">
    <div class="img-wrapper">
      <img src="../assets/confirm.png" alt="" class="img" />
    </div>

    <div class="content">
      <p style="font-size: 18px;">{{ sContentTop }}</p>
      <p style="font-size: 16px;margin-top: 15px;" :class="{hide: sContentBottom == '1'}">{{ sContentBottom }}</p>
    </div>

    <div class="btn change-button-background">
      <van-button size="large" round type="primary" @click="fhandleBtnClick">{{ sBtnText }}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    sContentTop: {
      type: String,
      required: true
    },
    sContentBottom: {
      type: String,
      required: true
    },
    sBtnText: {
      type: String,
      required: true
    },
    fhandleBtnClick: {
      type: Function,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
