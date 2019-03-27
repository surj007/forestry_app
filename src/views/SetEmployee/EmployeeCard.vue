<style lang="less" scoped>
  .employee-card {
    background: #FFF;
    margin: 20px 10px 0 10px;
    border-radius: 10px;
    height: 428px;
    padding: 20px 32px 64px 32px;
    box-sizing: border-box;
    &__icon {
      color: #333333;
      font-size: 16px;
      position: absolute;
      left: 310px;
    }
    &__title {
      color: #333333;
      font-size: 16px;
      &--required {
        &:after {
          content: '*';
          color: red;
        }
      }
    }
    &__tips {
      display: block;
      color: #FF8F3B;
      font-size: 14px;
      margin-top: 12px;
    }
  }
</style>

<template>
  <div class="employee-card">
    <van-icon name="cross" class="employee-card__icon" @click="$emit('del-card', index)" />

    <div>
      <span class="employee-card__title">个人信息</span>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-bottom: 20px;margin-top: 10px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" placeholder="请输入业务员姓名" left-icon="contact" required v-model="value.name"
        :error-message="errMsg.nameErrMsg" @blur="handleInputBlur('name')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-bottom: 20px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" placeholder="请输入业务员手机号" left-icon="phone-o" required v-model="value.username"
        :error-message="errMsg.usernameErrMsg" @blur="handleInputBlur('username')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>
    </div>

    <div>
      <span class="employee-card__title employee-card__title--required">附件添加</span>

      <span class="employee-card__tips">1.所在公司6个月社保证明（法人股东除外）</span>
      <span class="employee-card__tips">2.清晰的身份证正反面照片</span>

      <van-cell-group :border="false" style="margin-top: 20px;">
        <div style="display: flex;">
          <upload-picture style="margin-right: 15px;" :sPictureUrl="value.socialSecurityPic" :fSetPicturUrl="setSocialSecurityPictureUrl":canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
          <upload-picture style="margin-right: 15px;" :sPictureUrl="value.cardFrontPic" :fSetPicturUrl="setCardFrontPictureUrl":canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
          <upload-picture :sPictureUrl="value.cardOppositePic" :fSetPicturUrl="setCardOppositePictureUrl":canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/UploadPicture';

export default {
  name: 'EmployeeCard',
  components: {
    UploadPicture
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      errMsg: {
        nameErrMsg: '',
        usernameErrMsg: ''
      }
    }
  },
  methods: {
    handleInputBlur(inputName) {
      console.log(JSON.stringify(this.value));
      if(this.value[inputName] == '') {
        this.errMsg[inputName + 'ErrMsg'] = '此项不能为空';
      }
      else {
        this.errMsg[inputName + 'ErrMsg'] = '';
      }
    },
    validate() {
      let flag = true;
      if(this.value.name == '') {
        this.errMsg.nameErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.value.username == '') {
        this.errMsg.usernameErrMsg = '此项不能为空';
        flag = false;
      }
      if(!flag) {
        return flag;
      }

      if(this.value.socialSecurityPic == '') {
        flag = false;
      }
      if(this.value.cardFrontPic == '') {
        flag = false;
      }
      if(this.value.cardOppositePic == '') {
        flag = false;
      }
      if(!flag) {
        this.$toast('请提交社保证明和身份证正反面照片');
        return flag;
      }

      return flag;
    },
    setSocialSecurityPictureUrl(sUrl) {
      this.value.socialSecurityPic = sUrl;
    },
    setCardFrontPictureUrl(sUrl) {
      this.value.cardFrontPic = sUrl;
    },
    setCardOppositePictureUrl(sUrl) {
      this.value.cardOppositePic = sUrl;
    }
  }
}
</script>