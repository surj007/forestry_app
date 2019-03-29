<style lang="less" scoped>
.cert-upload {
  background: #f8f8ff;
  margin-top: 46px;
  overflow: hidden;
  &-card {
    margin: 10px 10px 0 10px;
    background: #FFF;
    border-radius: 10px;
    &__header {
      border-bottom: 1px dashed #999999;
      height: 55px;
      padding: 0 10px;
      .cert-upload-card {
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
      line-height: 25px;
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
  <div class="cert-upload">
    <van-nav-bar title="上传车辆运输照片" left-arrow @click-left="$router.push('applyRecord')" fixed />

    <div class="cert-upload-card">
      <div class="cert-upload-card__header flex-center-y">
        <img src="../../assets/cert.png" alt="" class="cert-upload-card__img">
        
        <div class="cert-upload-card__title">木材运输与植物检疫申请</div>
      </div>

      <div style="margin-left: 12px;">
        <p class="title-pic" style="margin: 0 0 22px 0;padding-top: 37px;">
          附件图片
          <a href="javascript: void(0);" class="add-btn" @click="formData.picture_url.push('')">+新增</a>
          <a href="javascript: void(0);" class="add-btn" @click="delItem">- 删除</a>
        </p>
        <van-cell-group class="van-hairline--bottom" :border="false" style="padding-bottom: 26px;">
          <div style="display: flex;flex-wrap: wrap;">
            <upload-picture v-for="(item, index) in formData.picture_url" :key="index" :index="index" uploadType="cert"
            :sPictureUrl="item" :fSetPicturUrl="setNoticePictureUrl" style="margin-left: 10px;margin-bottom: 10px;" />
          </div>
        </van-cell-group>

        <p class="cert-upload-card__tips">请上传真实的装车照片，如发现虚假照片后果自负。同一车牌，24小时内不能重复提交</p>
      </div>
    </div>

    <div class="cert-upload__btn change-button-background">
      <van-button size="large" round type="primary" @click="submit">上传图片</van-button>
    </div>
  </div>
</template>

<script>
import UploadPicture from '../../components/UploadPicture';

export default {
  name: 'CertUpload',
  components: {
    UploadPicture
  },
  data() {
    return {
      formData: {
        picture_url: [''],
        picture_location: [''],
        picture_time: ['']
      }
    }
  },
  methods: {
    submit() {
      if(this.validate()) {
        let data = {
          picture_url: this.formData.picture_url.toString(),
          picture_location: this.formData.picture_location.toString(),
          picture_time: this.formData.picture_time.join('@'),
          id: this.$route.query.id
        };

        this.$http({
          url: '/cert/addPlantCertPicture',
          method: 'POST',
          data
        }).then((res) => {
          if(res && res.data.code === 0) {
            this.$toast.success('上传车辆运输图片成功');
            this.$router.push({name: 'applyRecord'});
          }
        });
      }
    },
    validate() {
      for(let i of this.formData.picture_url) {
        if(i === '') {
          this.$toast('附件图片不能有为空的项');
          return false;
        }
      }

      return true;
    },
    delItem() {
      if(this.formData.picture_url.length > 1) {
        this.formData.picture_url.splice(this.formData.picture_url.length - 1, 1);
        this.formData.picture_location.splice(this.formData.picture_location.length - 1, 1);
      }
    },
    setNoticePictureUrl(index, url, time, name) {
      this.$set(this.formData.picture_url, index, url);
      this.formData.picture_time[index] = time;
      this.formData.picture_location[index] = window.$storage.get('picture')[name];
    }
  }
}
</script>