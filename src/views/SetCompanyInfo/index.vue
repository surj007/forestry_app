<style lang="less" scoped>
.setCompanyInfo {
  margin-top: 46px;
  overflow: auto;
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
  .info {
    margin-bottom: 40px;
    .title {
      margin: 25px 0 10px 9px;
      font-family: 'SourceHanSansSC-bold';
      font-size: 16px;
      color: #333333;
    }
    .checkbox-label {
      font-size: 14px;
      margin: 13px 0 0 10px;
    }
    .btn-info {
      padding: 0 15px 0 15px;
      margin-top: 92px;
    }
  }
  .picture {
    .card {
      margin: 20px 10px 0 10px;
      height: 720px;
      border-radius: 10px;
      background: #FFFFFF;
      padding: 0 34px 0 34px;
      .img {
        height: 63px;
        width: 63px;
      }
      .title-pic {
        font-family: 'SourceHanSansSC-regular';
        font-size: 16px;
        color: #333333;
        &:after {
          content: ' *';
          color: red;
        }
      }
      .tip-pic {
        margin: 0 0 22px 0;
        font-family: 'SourceHanSansSC-regular';
        font-size: 14px;
        color: #FF8F3B;
      }
      .download {
        font-family: 'SourceHanSansSC-regular';
        font-size: 14px;
        color: #01B6AF;
      }
      .download-title {
        margin: 25px 0 22px 0;
      }
    }
    .btn-pic {
      padding: 0 15px 0 15px;
      margin-top: 112px;
      padding-bottom: 20px;
    }
  }
}
</style>

<template>
  <div class="setCompanyInfo" :style="{background: sComponent == 'picture' ? '#F8F8F8' : '#FFFFFF'}">
    <van-nav-bar fixed left-arrow @click-left="$router.push({name: 'companySetting'})" title="企业信息" v-if="!$window.$storage.get('isReg') && sComponent === 'info'" />
    <van-nav-bar fixed :left-arrow="sComponent == 'info' ? false : true" @click-left="sComponent = 'info'" :title="sComponent == 'info' ? '企业信息' : '企业证件照上传'" v-else />

    <div class="setCompanyInfo-status" v-if="oFormData.status" :style="{backgroundColor: statusObject[oFormData.status].backgroundColor}">
      <div class="flex-center-y setCompanyInfo-status-top">
        <img :src="statusObject[oFormData.status].img" alt="" class="setCompanyInfo-status-top__img">
        <span style="word-break: break-all;">{{ statusObject[oFormData.status].text }}</span>
      </div>
      <p class="setCompanyInfo-status-bottom">{{ oFormData.last_modify_time }}</p>
    </div>

    <div class="info" v-if="sComponent == 'info'">
      <p class="title">企业基本信息</p>

      <van-cell-group class="van-hairline--bottom" :border="false">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="企业名称" placeholder="请输入企业名称" required 
        v-model="oFormData.name" :error-message="oErrMsg.nameErrMsg" @blur="handleInputBlur('name', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="企业法人" placeholder="请输入法人姓名" required v-model="oFormData.corporation" 
        :error-message="oErrMsg.corporationErrMsg" @blur="handleInputBlur('corporation', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="信用代码" placeholder="请输入信用代码" required v-model="oFormData.code" 
        :error-message="oErrMsg.codeErrMsg" @blur="handleInputBlur('code', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="联系电话" placeholder="请输入联系电话" required v-model="oFormData.phone" 
        :error-message="oErrMsg.phoneErrMsg" @blur="handleInputBlur('phone', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="企业地址" placeholder="请输入企业地址" required v-model="oFormData.address" 
        :error-message="oErrMsg.addressErrMsg" @blur="handleInputBlur('address', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="仓储地点" placeholder="请输入仓储地点，以逗号分隔" required type="textarea" rows="2" v-model="oFormData.store"
        :error-message="oErrMsg.storeErrMsg" @blur="handleInputBlur('store', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="企业类型" required disabled :error-message="oErrMsg.companyTypeErrMsg" @blur="handleInputBlur('companyType', 'array')">
          <van-checkbox-group :disabled="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" slot="button" v-model="oFormData.companyType">
            <template v-for="(item, index) in $store.getters.oBasicInfo['企业类型'].info">
              <van-checkbox :key="index" style="margin-bottom: 7px;" :name="item" shape="square">{{ item }}</van-checkbox>
            </template>
          </van-checkbox-group>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="原料来源" required disabled :error-message="oErrMsg.sourceErrMsg" @blur="handleInputBlur('source', 'array')">
          <van-checkbox-group :disabled="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" slot="button" v-model="oFormData.source">
            <template v-for="(item, index) in $store.getters.oBasicInfo['原料来源'].info">
              <van-checkbox :key="index" style="margin-bottom: 7px;" :name="item" shape="square">{{ item }}</van-checkbox>
            </template>
          </van-checkbox-group>
        </van-field>
      </van-cell-group>

      <van-checkbox :disabled="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" class="checkbox-label" shape="square" v-model="oFormData.outCityCompany">
        省（市）外企业主要：
      </van-checkbox>
      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" placeholder="请输入企业名称，以逗号分隔" type="textarea" rows="2" v-model="oFormData.outCityCompanyName">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="（木材）原料主要品种" placeholder="请输入原料主要品种，以逗号分隔" 
        required type="textarea" rows="2" v-model="oFormData.kind" 
        :error-message="oErrMsg.kindErrMsg" @blur="handleInputBlur('kind', 'string')">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <p class="title">企业生产能力</p>

      <van-row>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false">
            <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="台锯数量" placeholder="数量" v-model="oFormData.saw">
              <span slot="button" style="color: #333333;">套</span>
            </van-field>
          </van-cell-group>
        </van-col>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false">
            <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="日生产量 " placeholder="生产量" v-model="oFormData.sawOutput">
              <span slot="button" style="color: #333333;">m³</span>
            </van-field>
          </van-cell-group>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
            <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="其他设备" placeholder="数量" v-model="oFormData.other">
              <span slot="button" style="color: #333333;">套</span>
            </van-field>
          </van-cell-group>
        </van-col>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
            <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="日生产量 " placeholder="生产量" v-model="oFormData.otherOutput">
              <span slot="button" style="color: #333333;">m³</span>
            </van-field>
          </van-cell-group>
        </van-col>
      </van-row>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="主要产品" placeholder="请输入主要产品" v-model="oFormData.product">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <p class="title">产品销售</p>

      <van-cell-group class="van-hairline--bottom" :border="false">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="主要销售区域" placeholder="请输入销售区域名称" v-model="oFormData.saleArea">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" label="月销售量" placeholder="请输入销售量" v-model="oFormData.saleMount">
          <span slot="button" style="color: #333333;">m³</span>
        </van-field>
      </van-cell-group>

      <p class="title">备注</p>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field :readonly="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4" placeholder="请输入备注" type="textarea" rows="2" v-model="oFormData.remark">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <div class="btn-info change-button-background">
        <van-button size="large" round type="primary" @click="next">下一步</van-button>
      </div>
    </div>

    <div class="picture" v-if="sComponent == 'picture'">
      <div class="card">
        <p class="title-pic" style="margin: 0 0 22px 0;padding-top: 37px;">企业营业执照</p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <upload-picture :sPictureUrl="oFormData.licencePic" :fSetPicturUrl="setLicencePictureUrl" :canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
        </van-cell-group>

        <p class="title-pic" style="margin: 25px 0 10px 0;">法人身份证</p>
        <p class="tip-pic">需上传清晰的身份证正反面照片</p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;">
            <upload-picture :sPictureUrl="oFormData.cardFrontPic" :fSetPicturUrl="setCardFrontPictureUrl" style="margin-right: 15px;" :canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
            <upload-picture :sPictureUrl="oFormData.cardOppositePic" :fSetPicturUrl="setCardOppositePictureUrl" :canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
          </div>
        </van-cell-group>

        <div class="flex-space-between">
          <p class="title-pic download-title">林业植物检疫监管告知书</p>
          <p class="download download-title" @click="savePic2SysGallery('林业植物检疫监管告知书')">下载</p>
        </div>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <upload-picture :sPictureUrl="oFormData.notificationPic" :fSetPicturUrl="setNotificationPictureUrl" :canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
        </van-cell-group>

        <div class="flex-space-between">
          <p class="title-pic download-title">木材调运检疫开证承诺书</p>
          <p class="download download-title" @click="savePic2SysGallery('木材调运检疫开证承诺书')">下载</p>
        </div>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <upload-picture :sPictureUrl="oFormData.commitPic" :fSetPicturUrl="setCommitPictureUrl" :canUpload="!($store.getters.oCompanyInfo.status == 1 || $store.getters.oCompanyInfo.status == 4)" />
        </van-cell-group>
      </div>

      <div class="btn-pic change-button-background">
        <van-button size="large" round type="primary" @click="submit" v-if="$store.getters.oCompanyInfo.status === 2 || $store.getters.oCompanyInfo.status === 3 || $window.$storage.get('isReg')">提交企业信息</van-button>
        <van-button 
          size="large" 
          round 
          type="primary" 
          @click="$router.push({name: 'setEmployee'})" 
          v-if="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4"
        >
            查看业务员信息
          </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/UploadPicture';

export default {
  name: 'SetCompanyInfo',
  components: {
    UploadPicture
  },
  created() {
    if(!window.$storage.get('isReg')) {
      this.oFormData = JSON.parse(JSON.stringify(this.$store.getters.oCompanyInfo));
      this.statusObject['3'].text = `审核未通过，被拒原因: ${this.oFormData.refuse_reason}`;
    }
  },
  data() {
    return {
      sComponent: 'info',
      oFormData: {
        id: 0,
        name: '',
        corporation: '',
        code: '',
        phone: '',
        address: '',
        store: '',
        companyType: [],
        source: [],
        outCityCompany: false,
        outCityCompanyName: '',
        kind: '',
        saw: '',
        sawOutput: '',
        other: '',
        otherOutput: '',
        product: '',
        saleArea: '',
        saleMount: '',
        remark: '',
        licencePic: '',
        cardFrontPic: '',
        cardOppositePic: '',
        notificationPic: '',
        commitPic: ''
      },
      oErrMsg: {
        nameErrMsg: '',
        corporationErrMsg: '',
        codeErrMsg: '',
        phoneErrMsg: '',
        addressErrMsg: '',
        storeErrMsg: '',
        companyTypeErrMsg: '',
        sourceErrMsg: '',
        kindErrMsg: ''
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
          text: '已注册'
        },
        3: {
          img: require('../../assets/statusSad.png'),
          backgroundColor: '#FF8F3B',
          text: ''
        },
        4: {
          img: require('../../assets/statusSad.png'),
          backgroundColor: '#FF8F3B',
          text: '已注销'
        }
      }
    }
  },
  methods: {
    submit() {
      if(window.$underscore.isEqual(this.oFormData, this.$store.getters.oCompanyInfo)) {
        this.$router.push({name: 'setEmployee'});
        return;
      }

      if(this.validatePicForm()) {
        return;
      }

      let data = JSON.parse(JSON.stringify(this.oFormData));
      data.companyType = data.companyType.toString();
      data.source = data.source.toString();
      data.outCityCompany = data.outCityCompany ? 1 : 0;

      this.$http({
        url: '/company/editCompany',
        method: 'POST',
        data
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.$toast.success('提交企业信息成功');
          this.$router.push({name: 'setEmployee'});
        }
      });
    },
    handleInputBlur(sInputName, type) {
      if(type == 'string' && this.oFormData[sInputName] == '') {
        this.oErrMsg[sInputName + 'ErrMsg'] = '此项不能为空';
      }
      else if(type == 'array' && this.oFormData[sInputName].length == 0) {
        this.oErrMsg[sInputName + 'ErrMsg'] = '此项不能为空';
      }
      else {
        this.oErrMsg[sInputName + 'ErrMsg'] = '';
      }
    },
    validateInfoForm() {
      let bFlag = false;
      if(this.oFormData.name == '') {
        this.oErrMsg.nameErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.corporation == '') {
        this.oErrMsg.corporationErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.phone == '') {
        this.oErrMsg.phoneErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.address == '') {
        this.oErrMsg.addressErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.store == '') {
        this.oErrMsg.storeErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.companyType.length == 0) {
        this.oErrMsg.companyTypeErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.source.length == 0) {
        this.oErrMsg.sourceErrMsg = '此项不能为空';
        bFlag = true;
      }
      if(this.oFormData.kind == '') {
        this.oErrMsg.kindErrMsg = '此项不能为空';
        bFlag = true;
      }


      return bFlag;
    },
    validatePicForm() {
      if(this.oFormData.licencePic == '') {
        this.$toast('请提交企业营业执照照片');
        return true;
      }
      if(this.oFormData.cardFrontPic == '') {
        this.$toast('请提交法人身份证正反面照片');
        return true;
      }
      if(this.oFormData.cardOppositePic == '') {
        this.$toast('请提交法人身份证正反面照片');
        return true;
      }
      if(this.oFormData.notificationPic == '') {
        this.$toast('请提交林业植物检疫监管告知书照片');
        return true;
      }
      if(this.oFormData.commitPic == '') {
        this.$toast('请提交木材调运检疫开证承诺书照片');
        return true;
      }

      return false;
    },
    next() {
      if(this.validateInfoForm()) {
        return;
      }

      this.sComponent = 'picture';
    },
    setLicencePictureUrl(sUrl) {
      this.oFormData.licencePic = sUrl;
    },
    setCardFrontPictureUrl(sUrl) {
      this.oFormData.cardFrontPic = sUrl;
    },
    setCardOppositePictureUrl(sUrl) {
      this.oFormData.cardOppositePic = sUrl;
    },
    setNotificationPictureUrl(sUrl) {
      this.oFormData.notificationPic = sUrl;
    },
    setCommitPictureUrl(sUrl) {
      this.oFormData.commitPic = sUrl;
    },
    async savePic2SysGallery(sType) {
      await this.$store.dispatch('savePic2SysGallery', {sType, oVm: this});
      this.$toast.success('已下载至手机相册');
    }
  }
}
</script>
