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
  </div>
</template>

<script>
export default {
  name: 'UploadPicture',
  props: {
    sPictureUrl: {
      type: String,
      required: true
    },
    fSetPicturUrl: {
      type: Function,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    upload2Oss() {
      plus.gallery.pick((filePath) => {
        this.getOssSign((oOssSign) => {
          let uploadTask = plus.uploader.createUpload(oOssSign.host, {}, () => {
            this.getSignatureUrl({
              path: oOssSign.dirPath,
              fileName: oOssSign.key + '_' + filePath.split('/')[filePath.split('/').length - 1]
            }, (sUrl) => {
              this.fSetPicturUrl && this.fSetPicturUrl(sUrl);
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
    },
    getOssSign(fCallback) {
      this.$http({
        url: `${window.baseUrl}/oss/getSign`,
        method: 'GET',
        params: {
          path: 'app_company'
        }
      }).then((res) => {
        if (res.data.code == 0) {
          fCallback && fCallback(res.data.data);
        } 
        else {
          this.$toast.fail(res.data.message);
        }
      }).catch((e) => {
        console.warn('UploadPicture getOssSign: ' + e);
        this.$toast.fail('网络错误，请重试');
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
        if(res.data.code == 0) {
          fCallback && fCallback(res.data.data);
        } 
        else {
          this.$toast.fail(res.data.message);
        }
      }).catch((e) => {
        console.warn('UploadPicture getSignatureUrl: ' + e);
        this.$toast.fail('网络错误，请重试');
      });
    },
  }
}
</script>
