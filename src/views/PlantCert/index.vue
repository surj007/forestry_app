<style lang="less" scoped>
.plant-cert {
  background: #f8f8ff;
  margin-top: 46px;
  overflow: hidden;
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
      .plant-cert-card {
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
  }
  &-btn {
    padding: 0 15px 0 15px;
    margin-top: 112px;
    margin-bottom: 20px;
  }
  .title-pic {
    font-family: 'SourceHanSansSC-regular';
    font-size: 14px;
    color: #333333;
    margin: 0 0 10px 15px;
    padding-top: 10px;
  }
}
</style>

<template>
  <div class="plant-cert">
    <van-nav-bar title="木材运输与植物检疫申请" left-arrow @click-left="goBack" fixed />

    <div class="plant-cert-status" v-if="formData.status" :style="{backgroundColor: statusObject[formData.status].backgroundColor}">
      <div class="flex-center-y plant-cert-status-top">
        <img :src="statusObject[formData.status].img" alt="" class="plant-cert-status-top__img">
        <span style="word-break: break-all;">{{ statusObject[formData.status].text }}</span>
      </div>
      <p class="plant-cert-status-bottom">{{ formData.create_time }}</p>
    </div>

    <div class="plant-cert-card">
      <div class="plant-cert-card__header flex-center-y">
        <img src="../../assets/cert.png" alt="" class="plant-cert-card__img">
        
        <div class="plant-cert-card__title">木材运输与植物检疫申请单</div>
      </div>

      <van-cell-group class="van-hairline--bottom change-center-y-cell__value change-cell-title-width-default" :border="false">
        <van-field label="植物来源（产地）" placeholder="请输入产地" input-align="right"
        v-model="formData.producing_area" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-center-y-cell__value change-cell-title-width-large" :border="false">
        <van-field label="植物产品来源（加工地）" placeholder="请输入加工地" input-align="right" 
        v-model="formData.processing_area" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-cell__value" :border="false">
        <van-field label="植物产品名称" disabled>
          <van-radio-group v-model="formData.plant_name" slot="button">
            <van-radio v-for="(item, index) in $store.getters.oBasicInfo['植物产品名称'].info"
            :key="index" :name="item" style="margin-bottom: 7px;">{{ item }}</van-radio>
          </van-radio-group>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-cell__value" :border="false">
        <van-field label="品种" disabled>
          <van-radio-group v-model="formData.variety" slot="button">
            <van-radio v-for="(item, index) in $store.getters.oBasicInfo['品种'].info"
            :key="index" :name="item" style="margin-bottom: 7px;">{{ item }}</van-radio>
          </van-radio-group>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__error-message" :border="false">
        <van-field label="车船数" placeholder="车船数" input-align="right" required
        v-model="formData.car_amount" :error-message="errMsg.car_amountErrMsg" @blur="handleInputBlur('car_amount')">
          <span slot="button" style="color: #323233;">辆</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__error-message" :border="false">
        <van-field label="每车/船" placeholder="多少立方米" input-align="right" required
        v-model="formData.every_car_amount" :error-message="errMsg.every_car_amountErrMsg" @blur="handleInputBlur('every_car_amount')">
          <span slot="button" style="color: #323233;">m³</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-center-y-cell__value" :border="false">
        <van-field label="包装方式" placeholder="请输入包装方式" input-align="right" 
        v-model="formData.packaging" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-center-y-cell__value" :border="false">
        <van-field label="规格" placeholder="请输入规格" input-align="right" 
        v-model="formData.standard" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message change-cell-title-width-default" :border="false">
        <van-field label="收货单位（个人）" placeholder="请输入收货单位" input-align="right" required
        v-model="formData.receive_person" :error-message="errMsg.receive_personErrMsg" @blur="handleInputBlur('receive_person')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-cell__value change-field__error-message change-cell-title-width-default" :border="false">
        <van-field label="收货单位详细地址" disabled>
          <van-radio-group v-model="formData.receive_address_type" slot="button" class="flex-center-y">
            <van-radio :name="0">省内</van-radio>
            <van-radio :name="1" style="margin-left: 10px;">省外</van-radio>
          </van-radio-group>
        </van-field>
        <van-field placeholder="请输入收货单位详细地址" type="textarea" rows="3" required
        v-model="formData.receive_address" :error-message="errMsg.receive_addressErrMsg" @blur="handleInputBlur('receive_address')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message change-cell-title-width-large" :border="false">
        <van-field label="收货单位（个人）电话" placeholder="请输入电话" input-align="right" required
        v-model="formData.phone" :error-message="errMsg.phoneErrMsg" @blur="handleInputBlur('phone')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message change-cell-title-width-large" :border="false">
        <van-field label="收货联系人身份证号码" placeholder="请输入收货联系人身份证号码" input-align="right" required
        v-model="formData.person_id" :error-message="errMsg.person_idErrMsg" @blur="handleInputBlur('person_id')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message" :border="false">
        <van-field label="日期" placeholder="按年-月-日输入（中间要加横线）" input-align="right" required
        v-model="formData.date_time" :error-message="errMsg.date_timeErrMsg" @blur="handleInputBlur('date_time')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body" :border="false">
        <van-field label="申请人" placeholder="请输入申请人" input-align="right"
        v-model="formData.apply_person" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message" :border="false">
        <van-field label="承运人" placeholder="请输入承运人" input-align="right" required
        v-model="formData.transport_person" :error-message="errMsg.transport_personErrMsg" @blur="handleInputBlur('transport_person')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message" :border="false">
        <van-field label="对应报检单号" placeholder="请输入报检单号" input-align="right" required
        v-model="formData.report_number" :error-message="errMsg.report_numberErrMsg" @blur="handleInputBlur('report_number')" />
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom change-field__body change-field__error-message" :border="false">
        <van-field label="车牌号" placeholder="请输入车牌号" input-align="right" required type="textarea" rows="2"
        v-model="formData.car_number" :error-message="errMsg.car_numberErrMsg" @blur="handleInputBlur('car_number')" />
      </van-cell-group>

      <div v-if="formData.picture_url">
        <p class="title-pic">
          车辆照片
        </p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;flex-wrap: wrap;">
            <upload-picture v-for="(item, index) in formData.picture_url.split(',')" :key="index" :index="index" :canUpload="false"
            :sPictureUrl="item" style="margin-left: 10px;margin-bottom: 10px;" />
          </div>
        </van-cell-group>
      </div>
    </div>

    <div class="plant-cert-btn change-button-background">
      <van-button size="large" round type="primary" @click="submit" v-if="!this.$route.params.create_time">提交</van-button>
      <van-button size="large" round type="primary" @click="skipNewPath" v-if="this.$route.params.create_time && this.$route.params.status === 4">上传照片</van-button>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/UploadPicture';

export default {
  name: 'PlantCert',
  components: {
    UploadPicture
  },
  created() {
    if(this.$route.params.create_time) {
      this.formData = this.$route.params;
      this.statusObject['2'].text = `审核已通过，请至城厢镇林业局${this.formData.windows}号窗口领取`;
      this.statusObject['3'].text = `审核未通过，被拒原因: ${this.formData.refuse_reason}`;

      if(this.formData.status === 4) {
        this.$dialog.confirm({
          title: '提示',
          message: '您的开证审核已通过，请尽快上传装车照片',
          confirmButtonText: '上传',
          cancelButtonText: '取消'
        }).then(() => {
          this.skipNewPath();
        }).catch(() => {
          
        });
      }
    }
  },
  data() {
    let self = this;
    return {
      formData: {
        producing_area: '',
        processing_area: '',
        plant_name: this.$store.getters.oBasicInfo['植物产品名称'].info[0],
        variety: this.$store.getters.oBasicInfo['品种'].info[0],
        car_amount: '',
        every_car_amount: '',
        packaging: '',
        standard: '',
        receive_person: '',
        receive_address_type: 0,
        receive_address: '',
        phone: '',
        person_id: '',
        date_time: '',
        apply_person: '',
        transport_person: '',
        report_number: '',
        car_number: ''
      },
      errMsg: {
        car_amountErrMsg: '',
        every_car_amountErrMsg: '',
        receive_personErrMsg: '',
        receive_addressErrMsg: '',
        phoneErrMsg: '',
        person_idErrMsg: '',
        date_timeErrMsg: '',
        transport_personErrMsg: '',
        report_numberErrMsg: '',
        car_numberErrMsg: ''
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
        },
        4: {
          img: require('../../assets/statusHappy.png'),
          backgroundColor: '#01B6AF',
          text: '审核已通过，请立即上传装车照片'
        },
      }
    }
  },
  methods: {
    submit() {
      if(this.validate()) {
        let data = JSON.parse(JSON.stringify(this.formData));

        this.$http({
          url: '/cert/addPlantCert',
          method: 'POST',
          data
        }).then((res) => {
          if(res && res.data.code === 0) {
            this.$toast.success('添加木材运输证与植物检疫申请成功');
            this.goBack();
          }
        });
      }
    },
    validate() {
      let flag = true;

      if(this.formData.car_amount == '') {
        this.errMsg.car_amountErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.every_car_amount == '') {
        this.errMsg.every_car_amountErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.receive_person == '') {
        this.errMsg.receive_personErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.phone == '') {
        this.errMsg.phoneErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.person_id == '') {
        this.errMsg.person_idErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.date_time == '') {
        this.errMsg.date_timeErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.transport_person == '') {
        this.errMsg.transport_personErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.report_number == '') {
        this.errMsg.report_numberErrMsg = '此项不能为空';
        flag = false;
      }
      if(this.formData.car_number == '') {
        this.errMsg.car_numberErrMsg = '此项不能为空';
        flag = false;
      }

      return flag;
    },
    handleInputBlur(inputName) {
      if(this.formData[inputName] === '') {
        this.errMsg[inputName + 'ErrMsg'] = '此项不能为空';
      }
      else {
        this.errMsg[inputName + 'ErrMsg'] = '';
      }
    },
    goBack() {
      window.history.back();
    },
    skipNewPath() {
      this.$router.push({
        name: 'certUpload',
        query: {
          id: this.formData.id
        }
      });
    }
  }
}
</script>