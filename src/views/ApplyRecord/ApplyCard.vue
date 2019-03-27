<style lang="less" scoped>
.apply-card {
  height: 126px;
  margin: 20px 8px 0 8px;
  header {
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    img {
      width: 26px;
      height: 22px;
      margin-left: 8px;
      margin-right: 10px;
    }
    .apply-card-header {
      &__text {
        font-size: 16px;
        color: #FFF;
      }
      &__status-text {
        font-size: 14px;
        color: #FFF;
      }
    }
  }
  main {
    height: 79px;
    background: #FFF;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .apply-card-main {
      &__th {
        text-align: center;
        font-size: 14px;
        color: #999999;
        margin-bottom: 15px;
      }
      &__td {
        text-align: center;
        font-size: 16px;
        color: #333333;
      }
    }
  }
}
</style>

<template>
  <div class="apply-card">
    <header :style="{backgroundImage: `url(${backgroundImageArray[data.type]})`, backgroundSize: '100%'}">
      <div class="flex-center-xy">
        <img :src="cardIconArray[data.type]" alt="">
        <div class="apply-card-header__text">{{ typeNameArray[data.type] }}</div>
      </div>

      <div class="flex-center-xy">
        <span class="apply-card-header__status-text">{{ statusNameArray[data.status] }}</span>
        <van-icon name="arrow" size="0.7rem" color="#FFF" style="margin-right: 0.1rem" @click="skip2Detail" />
      </div>
    </header>

    <main class="flex-center-xy">
      <van-row style="width: 100%">
        <van-col span="6">
          <div class="apply-card-main__th">提交日期</div>
          <div class="apply-card-main__td">
            {{ `${new Date(data.create_time.replace(/-/g, "/")).getMonth() + 1}月${new Date(data.create_time.replace(/-/g, "/")).getDate()}日` }}
          </div>
        </van-col>

        <van-col span="6">
          <div class="apply-card-main__th">开证总量</div>
          <div class="apply-card-main__td">{{ data.amount || data.car_amount * data.every_car_amount }}m³</div>
        </van-col>

        <van-col span="6">
          <div class="apply-card-main__th">附件数</div>
          <div class="apply-card-main__td">{{ file }}</div>
        </van-col>

        <van-col span="6" v-if="data.status === 2">
          <div class="apply-card-main__th">领证窗口</div>
          <div class="apply-card-main__td">{{ data.windows }}</div>
        </van-col>
      </van-row>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ApplyCard',
  created() {
    switch (this.data.type) {
      case 0: {
        this.file = this.data.ladingPic.split(',').length + this.data.declarationPic.split(',').length + this.data.noticePic.split(',').length
        break;
      }
      case 1: {
        this.file = this.data.contractPic.split(',').length + this.data.declarationPic.split(',').length + this.data.noticePic.split(',').length
        break;
      }
      case 2: {
        this.file = this.data.picture_url ? this.data.picture_url.split(',').length : 0;
        break;
      }
      default: {
        break;
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      backgroundImageArray: [
        require('../../assets/firstCard.png'),
        require('../../assets/secondCard.png'),
        require('../../assets/thirdCard.png')
      ],
      cardIconArray: [
        require('../../assets/firstCardIcon.png'),
        require('../../assets/secondCardIcon.png'),
        require('../../assets/thirdCardIcon.png')
      ],
      typeNameArray: ['原木类开证', '板材类开证', '木材运输与植物检疫申请'],
      statusNameArray: ['', '审核中', '已审批', '未通过', '待上传照片'],
      file: 0
    }
  },
  methods: {
    skip2Detail() {
      if(this.data.type === 0) {
        this.$router.push({
          name: 'woodCert',
          params: this.data
        });
      }
      else if(this.data.type === 1) {
        this.$router.push({
          name: 'boardCert',
          params: this.data
        });
      }
      else {
        this.$router.push({
          name: 'plantCert',
          params: this.data
        });
      }
    }
  }
}
</script>