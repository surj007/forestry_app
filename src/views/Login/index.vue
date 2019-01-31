<style lang="less" scoped>

</style>
<style>

</style>

<template>
  <div class="login">
    <van-button @touchstart.native.stop="show = true">
      弹出默认键盘
    </van-button>

    <van-button @touchstart.native.stop="picture">
      拍照
    </van-button>

    <van-button @touchstart.native.stop="galleryImgs">
      选照片
    </van-button>

    <van-button @touchstart.native.stop="position">
      定位
    </van-button>

    <van-number-keyboard
      :show="show"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      show: true
    }
  },
  methods: {
    onInput(value) {
      this.$toast(value);
    },
    onDelete() {
      this.$toast('delete');
    },
    picture() {
      let cmr = plus.camera.getCamera();
      cmr.captureImage(function(p) {
        plus.io.resolveLocalFileSystemURL(p, function(entry) {
          compressImage(entry.toLocalURL(),entry.name);
        }, function(e) {
          plus.nativeUI.toast("读取拍照文件错误：" + e.message);
        });
      }, function(e) {
      }, {
        filter: 'image'
      });
    },
    galleryImgs() {
      plus.gallery.pick(function(e) {
        let name = e.substr(e.lastIndexOf('/') + 1);
        compressImage(e,name);
      }, function(e) {
      }, {
        filter: "image"
      });
    },
    position() {
      plus.geolocation.getCurrentPosition(function(p){
        alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
        console.log('Geolocation info: ' + JSON.stringify(p));
        this.$toast(JSON.stringify(p.coords));
      }, function(e){
        console.log('Gelocation Error: code - ' + e.code + '; message - ' + e.message);
      } );
    }
  }
}
</script>
