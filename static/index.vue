<style lang="less" scoped>

</style>
<style>
.active {
  opacity: 0.5!important;
}
</style>

<template>
  <div class="login">
    <van-button @touchstart.native.stop="picture">
      拍照
    </van-button>

    <van-button @touchstart.native.stop="galleryImgs">
      选照片
    </van-button>

    <div v-for="(item, index) in imgArr">
      <img :src="item" alt="" style="width: 100px;height: 100px;" @touchstart.stop.prevent="choose(item.split('/')[item.split('/').length - 1])" :class="{ active: isActive[item.split('/')[item.split('/').length - 1]] }">
      <br />
      {{ JSON.parse(store.getItem(item.split('/')[item.split('/').length - 1])).time }}
      <br />
      {{ JSON.parse(store.getItem(item.split('/')[item.split('/').length - 1])).position }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  created() {
    document.addEventListener('plusready', () => {
      this.store = plus.storage;
    }, false);
  },
  data() {
    return {
      imgArr: [],
      isActive: {},
      store: {}
    }
  },
  methods: {
    picture() {
      let camera = plus.camera.getCamera();
      camera.captureImage((capturedFile) => {
        this.position((p) => {
          let key = capturedFile.split('/')[1];
          this.store.setItem(key, JSON.stringify({position: p}));
        });
      }, 
      (err) => {}, 
      {
        
      });
    },
    galleryImgs() {
      this.imgArr = [];
      let isActive = {};
      plus.io.resolveLocalFileSystemURL('_doc', (entry) => {
        let reader = entry.createReader();
        reader.readEntries((subFiles) => {
          for (let i = 0; i < subFiles.length; i++) {
            this.imgArr.push(subFiles[i].fullPath);
            isActive[subFiles[i].name] = false;
            plus.io.resolveLocalFileSystemURL(`_doc/${subFiles[i].name}`, (entry1) => {
              entry1.getMetadata((metadata) => {
                let o = this.store.getItem(entry1.name);
                let o1 = JSON.parse(o);
                o1.time = metadata.modificationTime.toLocaleString();
                this.store.setItem(entry1.name, JSON.stringify(o1));
              });
            });
          }
          this.isActive = isActive;
        });
      });
    },
    position(cb) {
      plus.geolocation.getCurrentPosition((position) => {
        console.log(position.addresses);
        cb(position.coords);
      });
    },
    choose(item) {
      this.isActive[item] = !this.isActive[item];
    }
  }
}
</script>
