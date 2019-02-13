<style lang="less" scoped>
.setCompanyInfo {
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
    <van-nav-bar :left-arrow="sComponent == 'info' ? false : true" @click-left="sComponent = 'info'" :title="sComponent == 'info' ? '企业信息' : '企业证件照上传'" />

    <div class="info" v-if="sComponent == 'info'">
      <p class="title">企业基本信息</p>

      <van-cell-group class="van-hairline--bottom" :border="false">
        <van-field label="企业名称" placeholder="请输入企业名称" required v-model="oFormData.name">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="企业法人" placeholder="请输入法人姓名" required v-model="oFormData.corporation">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="联系电话" placeholder="请输入联系电话" required v-model="oFormData.phone">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="企业地址" placeholder="请输入企业地址" required v-model="oFormData.address">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="仓储地点" placeholder="请输入仓储地点，以逗号分隔" required type="textarea" rows="2" v-model="oFormData.store">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="企业类型" required disabled>
          <van-checkbox-group slot="button" style="display: flex;" v-model="oFormData.companyType">
            <van-checkbox style="margin-right: 15px;" name="木材加工" shape="square">木材加工</van-checkbox>
            <van-checkbox name="木材销售" shape="square">木材销售</van-checkbox>
          </van-checkbox-group>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="原料来源" required disabled>
          <van-checkbox-group slot="button" v-model="oFormData.source">
            <van-checkbox style="margin-bottom: 7px;" name="太仓港口" shape="square">太仓港口</van-checkbox>
            <van-checkbox style="margin-bottom: 7px;" name="常熟港口" shape="square">常熟港口</van-checkbox>
            <van-checkbox style="margin-bottom: 7px;" name="上海港口" shape="square">上海港口</van-checkbox>
            <van-checkbox name="本地企业" shape="square">本地企业</van-checkbox>
          </van-checkbox-group>
        </van-field>
      </van-cell-group>

      <van-checkbox class="checkbox-label" shape="square" v-model="oFormData.outCityCompany">
        省（市）外企业主要：
      </van-checkbox>
      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field placeholder="请输入企业名称，以逗号分隔" type="textarea" rows="2" v-model="oFormData.outCityCompanyName">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="（木材）原料主要品种" placeholder="请输入原料主要品种，以逗号分隔" required type="textarea" rows="2" v-model="oFormData.kind">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <p class="title">企业生产能力</p>

      <van-row>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false">
            <van-field label="台锯数量" placeholder="数量" v-model="oFormData.saw">
              <span slot="button" style="color: #333333;">套</span>
            </van-field>
          </van-cell-group>
        </van-col>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false">
            <van-field label="日生产量 " placeholder="生产量" v-model="oFormData.sawOutput">
              <span slot="button" style="color: #333333;">m3</span>
            </van-field>
          </van-cell-group>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
            <van-field label="其他设备" placeholder="数量" v-model="oFormData.other">
              <span slot="button" style="color: #333333;">套</span>
            </van-field>
          </van-cell-group>
        </van-col>
        <van-col span="12">
          <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
            <van-field label="日生产量 " placeholder="生产量" v-model="oFormData.otherOutput">
              <span slot="button" style="color: #333333;">m3</span>
            </van-field>
          </van-cell-group>
        </van-col>
      </van-row>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="主要产品" placeholder="请输入主要产品" v-model="oFormData.product">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <p class="title">产品销售</p>

      <van-cell-group class="van-hairline--bottom" :border="false">
        <van-field label="主要销售区域" placeholder="请输入销售区域名称" v-model="oFormData.saleArea">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field label="月销售量" placeholder="请输入销售量" v-model="oFormData.saleMount">
          <span slot="button" style="color: #333333;">m3</span>
        </van-field>
      </van-cell-group>

      <p class="title">备注</p>

      <van-cell-group class="van-hairline--bottom" :border="false" style="margin-top: 1px;">
        <van-field placeholder="请输入备注" type="textarea" rows="2" v-model="oFormData.remark">
          <span slot="button" style="color: transparent;">1</span>
        </van-field>
      </van-cell-group>

      <div class="btn-info change-button-background">
        <van-button size="large" round type="primary" @click="sComponent = 'picture'">下一步</van-button>
      </div>
    </div>

    <div class="picture" v-if="sComponent == 'picture'">
      <div class="card">
        <p class="title-pic" style="margin: 0 0 22px 0;padding-top: 37px;">企业营业执照</p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <upload-picture :sPictureUrl="oFormData.licencePic" :fSetPicturUrl="setLicencePictureUrl" />
        </van-cell-group>

        <p class="title-pic" style="margin: 25px 0 10px 0;">法人身份证</p>
        <p class="tip-pic">需上传清晰的身份证正反面照片</p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;">
            <upload-picture :sPictureUrl="oFormData.cardFrontPic" :fSetPicturUrl="setCardFrontPictureUrl" style="margin-right: 15px;" />
            <upload-picture :sPictureUrl="oFormData.cardOppositePic" :fSetPicturUrl="setCardOppositePictureUrl" />
          </div>
        </van-cell-group>

        <div class="flex-space-between">
          <p class="title-pic download-title">林业植物检疫监管告知书证</p>
          <p class="download download-title" @click="savePic2SysGallery('notice')">下载</p>
        </div>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <upload-picture :sPictureUrl="oFormData.notificationPic" :fSetPicturUrl="setNotificationPictureUrl" />
        </van-cell-group>

        <div class="flex-space-between">
          <p class="title-pic download-title">木材调运检疫开证承诺书</p>
          <p class="download download-title" @click="savePic2SysGallery('promise')">下载</p>
        </div>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <upload-picture :sPictureUrl="oFormData.commitPic" :fSetPicturUrl="setCommitPictureUrl" />
        </van-cell-group>
      </div>

      <div class="btn-pic change-button-background">
        <van-button size="large" round type="primary" @click="submit">提交企业信息</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/UploadPicture';

export default {
  components: {
    UploadPicture
  },
  data() {
    return {
      sComponent: 'picture',
      oFormData: {
        id: 0,
        name: '',
        corporation: '',
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
      }
    }
  },
  methods: {
    submit() {
      let data = JSON.parse(JSON.stringify(this.oFormData));
      data.companyType = data.companyType.toString();
      data.source = data.source.toString();
      data.outCityCompany = data.outCityCompany ? 1 : 0;

      this.$http({
        url: '/company/editCompany',
        method: 'POST',
        data
      }).then((res) => {
        if(res.data.code == 0) {
          this.$toast.success('提交企业信息成功');
        }
        else {
          this.$toast.fail(res.data.message);
        }
      }).catch((e) => {
        console.error('setCompanyInfo submit: ' + e);
        this.$toast('网络错误，请重试');
      });
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
    savePic2SysGallery(sType) {
      window.plus.gallery.save(`_www/image/${sType}.png`);
      this.$toast.success('已下载至手机相册');
    }
  }
}
</script>
