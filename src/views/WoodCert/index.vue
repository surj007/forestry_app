<style lang="less" scoped>
.wood-cert {
  background: #f8f8ff;
  margin-top: 46px;
  overflow: hidden;
  padding-bottom: 36px;
  &-status {
    min-height: 60px;
    font-size: 14px;
    color: #FFF;
    &-top {
      margin-left: 18px;
      padding-top: 8px;
      padding-right: 8px;
      &__img {
        margin-right: 8px;
        height: 22px;
        width: 22px;
      }
    }
    &-bottom {
      margin: 4px 0 0 48px;
      padding-bottom: 6px;
    }
  }
  &-card {
    margin: 10px 10px 0 10px;
    background: #FFF;
    border-radius: 10px;
    &__header {
      border-bottom: 1px dashed #999999;
      height: 55px;
      padding: 0 10px;
      .wood-cert-card {
        &__img {
          height: 26px;
          width: 23px;
        }
        &__title {
          color: #333333;
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
    &__tips {
      color: #FF8F3B;
      font-size: 14px;
      padding-bottom: 42px;
    }
  }
  &__btn {
    margin-top: 40px;
    padding:0 15px;
  }
  .title-pic {
    font-family: 'SourceHanSansSC-regular';
    font-size: 14px;
    color: #333333;
    &:after {
      content: ' *';
      color: red;
    }
  }
  .add-btn {
    font-size: 14px;
    margin-top: 17px;
    margin-left: 10px;
  }
}
</style>

<template>
  <div class="wood-cert">
    <van-nav-bar title="原木类开证" left-arrow @click-left="goBack" fixed />

    <div class="wood-cert-status" v-if="formData.status" :style="{backgroundColor: statusObject[formData.status].backgroundColor}">
      <div class="flex-center-y wood-cert-status-top">
        <img :src="statusObject[formData.status].img" alt="" class="wood-cert-status-top__img">
        <span style="word-break: break-all;">{{ statusObject[formData.status].text }}</span>
      </div>
      <p class="wood-cert-status-bottom">{{ formData.create_time }}</p>
    </div>

    <div class="wood-cert-card">
      <div class="wood-cert-card__header flex-center-y">
        <img src="../../assets/cert.png" alt="" class="wood-cert-card__img">
        
        <div class="wood-cert-card__title">原木类开证单</div>
      </div>

      <div style="margin-left: 12px;">
        <p class="title-pic" style="margin: 0;padding-top: 37px;">1.太仓出入境检验检疫局进境散装木材准运通知单</p>

        <div style="margin-bottom: 10px;">
          <a href="javascript: void(0);" class="add-btn" @click="formData.noticePic.push('')" v-if="!$route.params.create_time">+新增</a>
          <a href="javascript: void(0);" class="add-btn" v-if="!$route.params.create_time" 
          @click="formData.noticePic.length == 1 ? formData.noticePic.splice(formData.noticePic.length - 1, 0) : formData.noticePic.splice(formData.noticePic.length - 1, 1)">- 删除</a>
        </div>

        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;flex-wrap: wrap;">
            <upload-picture v-for="(item, index) in formData.noticePic" :key="index" :index="index" :canUpload="!$route.params.create_time"
            :sPictureUrl="item" :fSetPicturUrl="setNoticePictureUrl" style="margin-left: 10px;margin-bottom: 10px;" />
          </div>
        </van-cell-group>

        <p class="title-pic" style="margin: 0 0 22px 0;padding-top: 37px;">
          2.进口小提单
          <a href="javascript: void(0);" class="add-btn" @click="formData.ladingPic.push('')" v-if="!$route.params.create_time">+新增</a>
          <a href="javascript: void(0);" class="add-btn" v-if="!$route.params.create_time" 
          @click="formData.ladingPic.length == 1 ? formData.ladingPic.splice(formData.ladingPic.length - 1, 0) : formData.ladingPic.splice(formData.ladingPic.length - 1, 1)">- 删除</a>
        </p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;flex-wrap: wrap;">
            <upload-picture v-for="(item, index) in formData.ladingPic" :key="index" :index="index" :canUpload="!$route.params.create_time"
            :sPictureUrl="item" :fSetPicturUrl="setLadingPictureUrl" style="margin-left: 10px;margin-bottom: 10px;" />
          </div>
        </van-cell-group>

        <p class="title-pic" style="margin: 0;padding-top: 37px;">
          3.中华人民共和国海关进口货物报关单
        </p>

        <div style="margin-bottom: 10px;">
          <a href="javascript: void(0);" class="add-btn" @click="formData.declarationPic.push('')" v-if="!$route.params.create_time">+新增</a>
          <a href="javascript: void(0);" class="add-btn" v-if="!$route.params.create_time" 
          @click="formData.declarationPic.length == 1 ? formData.declarationPic.splice(formData.declarationPic.length - 1, 0) : formData.declarationPic.splice(formData.declarationPic.length - 1, 1)">- 删除</a>
        </div>

        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;flex-wrap: wrap;">
            <upload-picture v-for="(item, index) in formData.declarationPic" :key="index" :index="index" :canUpload="!$route.params.create_time"
            :sPictureUrl="item" :fSetPicturUrl="setDeclarationPictureUrl" style="margin-left: 10px;margin-bottom: 10px;" />
          </div>
        </van-cell-group> 

        <van-cell-group class="van-hairline--bottom" :border="false" style="padding: 20px 0;">
          <van-field label="总量" placeholder="请输入总量" @blur="handleInputBlur('amount')"
          v-model="formData.amount" required :error-message="errMsg.amountErrMsg" :readonly="$route.params.create_time">
            <span slot="button" style="color: #333333;">m³</span>
          </van-field>
        </van-cell-group>

        <p class="wood-cert-card__tips">注：此次开证总量</p>
      </div>
    </div>

    <div class="wood-cert__btn change-button-background">
      <van-button size="large" round type="primary" @click="submit" v-if="!$route.params.create_time">提交</van-button>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/UploadPicture';

export default {
  name: 'WoodCert',
  components: {
    UploadPicture
  },
  created() {
    window.scrollTo(0, 0);
    if(this.$route.params.create_time) {
      this.formData = this.$route.params;
      this.formData.noticePic = this.$route.params.noticePic.split(',');
      this.formData.ladingPic = this.$route.params.ladingPic.split(',');
      this.formData.declarationPic = this.$route.params.declarationPic.split(',');
      this.statusObject['2'].text = `审核已通过，请至城厢镇林业局${this.formData.windows}号窗口领取`;
      this.statusObject['3'].text = `审核未通过，被拒原因: ${this.formData.refuse_reason}`;
    }
  },
  data() {
    return {
      formData: {
        noticePic: [''],
        ladingPic: [''],
        declarationPic: [''],
        amount: ''
      },
      errMsg: {
        amountErrMsg: ''
      },
      statusObject: {
        1: {
          img: require('../../assets/statusWait.png'),
          backgroundColor: '#01B6AF',
          text: '已提交，等待工作人员审核'
        },
        2: {
          img: require('../../assets/statusHappy.png'),
          backgroundColor: '#01B6AF',
          text: ''
        },
        3: {
          img: require('../../assets/statusSad.png'),
          backgroundColor: '#FF8F3B',
          text: ''
        }
      }
    }
  },
  methods: {
    submit() {
      if(this.validate()) {
        let data = JSON.parse(JSON.stringify(this.formData));
        data.ladingPic = data.ladingPic.toString();
        data.declarationPic = data.declarationPic.toString();
        data.noticePic = data.noticePic.toString();

        this.$http({
          url: '/cert/addWoodCert',
          method: 'POST',
          data
        }).then((res) => {
          if(res && res.data.code == 0) {
            this.$toast.success('添加原木类开证单成功');
            window.$storage.set('hasCert', true);
            if(window.$storage.get('isReg')) {
              this.$router.push({name: 'chooseCert'});
            }
            else {
              this.$router.push({name: 'home'});
            }
          }
        });
      }
    },
    handleInputBlur(inputName) {
      if(this.formData[inputName] == '') {
        this.errMsg[inputName + 'ErrMsg'] = '此项不能为空';
      }
      else {
        this.errMsg[inputName + 'ErrMsg'] = '';
      }
    },
    validate() {
      let bFlag = true;
      if(this.formData.amount == '') {
        this.errMsg.amountErrMsg = '此项不能为空';
        bFlag = false;
      }
      for(let i of this.formData.noticePic) {
        if(i == '') {
          this.$toast('太仓出入境检验检疫局进境散装木材准运通知单不能有为空的项');
          return false;
        }
      }
      for(let i of this.formData.ladingPic) {
        if(i == '') {
          this.$toast('进口小提单不能有为空的项');
          return false;
        }
      }
      for(let i of this.formData.declarationPic) {
        if(i == '') {
          this.$toast('中华人民共和国海关进口货物报关单不能有为空的项');
          return false;
        }
      }

      return bFlag;
    },
    setNoticePictureUrl(index, url) {
      this.$set(this.formData.noticePic, index, url);
    },
    setLadingPictureUrl(index, url) {
      this.$set(this.formData.ladingPic, index, url);
    },
    setDeclarationPictureUrl(index, url) {
      this.$set(this.formData.declarationPic, index, url);
    },
    goBack() {
      window.history.back();
    }
  }
}
</script>
