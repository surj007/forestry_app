<style lang="less" scoped>
.uploadPicture {
  border: 1px dashed #999999;
  height: 63px;
  width: 63px;
  .img {
    height: 63px;
    width: 63px;
  }
}
</style>

<template>
  <div class="uploadPicture flex-center-xy" @click="upload2Oss">
    <van-icon name="plus" v-if="sPictureUrl == ''" />

    <img class="img" :src="sPictureUrl" v-if="sPictureUrl != ''" />

    <my-gallery v-model="isShowGalleryPopup" from="upload" @upload="handleSelfGalleryUpload">
  </div>
</template>

<script>
import MyGallery from './MyGallery';

export default {
  name: 'UploadPicture',
  components: {
    MyGallery
  },
  props: {
    sPictureUrl: {
      type: String,
      required: true
    },
    fSetPicturUrl: {
      type: Function,
      default: null
    },
    index: {
      type: Number
    },
    canUpload: {
      type: Boolean,
      default: true
    },
    uploadType: {
      type: String,
      default: 'system'
    }
  },
  data() {
    return {
      isShowGalleryPopup: false
    }
  },
  methods: {
    upload2Oss() {
      if(this.canUpload) {
        if(this.uploadType === 'system') {
          window.plus.gallery.pick((filePath) => {
            this.$toast('正在上传图片，请稍候');
            this.getOssSign((oOssSign) => {
              let uploadTask = window.plus.uploader.createUpload(oOssSign.host, {}, () => {
                this.getSignatureUrl({
                  path: oOssSign.dirPath,
                  fileName: oOssSign.key + '_' + filePath.split('/')[filePath.split('/').length - 1]
                }, (sUrl) => {
                  if(this.index != undefined) {
                    this.fSetPicturUrl && this.fSetPicturUrl(this.index, sUrl);
                  }
                  else {
                    this.fSetPicturUrl && this.fSetPicturUrl(sUrl);
                  }
                });
              });
              uploadTask.addData("key",  oOssSign.dirPath + oOssSign.key + '_' + '${filename}');
              uploadTask.addData("ossAccessKeyId", oOssSign.ossAccessKeyId);
              uploadTask.addData("policy", oOssSign.policy);
              uploadTask.addData("Signature", oOssSign.Signature);
              uploadTask.addData("host", oOssSign.host);
              uploadTask.addData("success_action_status", oOssSign.success_action_status);
              let res = uploadTask.addFile(filePath, {key: 'file'});
              uploadTask.start();
            });
          }, () => {}, {
            multiple: false
          });
        }
        else {
          this.isShowGalleryPopup = true;
        }
      }
    },
    handleSelfGalleryUpload(picture) {
      this.$toast('正在上传图片，请稍候');
      this.getOssSign((oOssSign) => {
        let uploadTask = window.plus.uploader.createUpload(oOssSign.host, {}, () => {
          this.getSignatureUrl({
            path: oOssSign.dirPath,
            fileName: oOssSign.key + '_' + picture.url.split('/')[picture.url.split('/').length - 1]
          }, (sUrl) => {
            if(this.index != undefined) {
              this.fSetPicturUrl && this.fSetPicturUrl(this.index, sUrl, picture.time, picture.name);
            }
            else {
              this.fSetPicturUrl && this.fSetPicturUrl(sUrl);
            }
            this.isShowGalleryPopup = false;
          });
        });
        uploadTask.addData("key",  oOssSign.dirPath + oOssSign.key + '_' + '${filename}');
        uploadTask.addData("ossAccessKeyId", oOssSign.ossAccessKeyId);
        uploadTask.addData("policy", oOssSign.policy);
        uploadTask.addData("Signature", oOssSign.Signature);
        uploadTask.addData("host", oOssSign.host);
        uploadTask.addData("success_action_status", oOssSign.success_action_status);
        let res = uploadTask.addFile(picture.url, {key: 'file'});
        uploadTask.start();
      });
    },
    getOssSign(fCallback) {
      this.$http({
        url: `${window.baseUrl}/oss/getSign`,
        method: 'GET',
        params: {
          path: 'image/app_company/'
        }
      }).then((res) => {
        if (res && res.data.code == 0) {
          fCallback && fCallback(res.data.data);
        }
      });
    },
    getSignatureUrl(oData, fCallback) {
      this.$http({
        url: `${window.baseUrl}/oss/getSignatureUrl`,
        method: 'GET',
        params: {
          path: oData.path,
          fileName: oData.fileName
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          fCallback && fCallback(res.data.data);
        }
      });
    },
  }
}
</script>
