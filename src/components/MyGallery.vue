<style lang="less" scoped>
.my-gallery {
  &-popup {
    transform: initial;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
  &-content {
    margin-top: 52px;
    margin-bottom: 10px;
    overflow: hidden;
    &__title {
      margin: 5px 5px 5px 10px;
      font-size: 20px;
      color: #101010;
    }
    &__img {
      width: 100px;
      height: 100px;
      margin: 5px 5px 5px 10px;
      flex: 0 0 auto;
      &--active {
        opacity: 0.5!important;
        border: 3px solid #01B6AF;
      }
    }
  }
}
</style>

<template>
  <div class="my-gallery">
    <van-popup class="my-gallery-popup" v-model="value" position="right" :overlay="false">
      <van-nav-bar title="相册" left-arrow right-text="删除" @click-left="$emit('input', false)" @click-right="delPicture" fixed style="position: fixed;top: 0;" />

      <div class="my-gallery-content">
        <div v-for="(item, index) in imageObject" :key="index">
          <p class="my-gallery-content__title">{{ index }}</p>
          <div style="display: flex;flex-wrap: wrap;">
            <img v-for="(v, i) in item" :class="{ 'my-gallery-content__img': true, 'my-gallery-content__img--active': activePicture.name === v.name }"
            :key="i" @click="choosePicture(v, i)" alt="" v-lazy="v.url">
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MyGallery',
  created() {
    this.getGalleryImage();
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      imageObject: {},
      activePicture: {}
    }
  },
  methods: {
    getGalleryImage() {
      window.plus.io.resolveLocalFileSystemURL('_doc', (dirEntry) => {
        let reader = dirEntry.createReader();
        reader.readEntries((subFiles) => {
          for (let i = 0; i < subFiles.length; i++) {
            window.plus.io.resolveLocalFileSystemURL(`_doc/${subFiles[i].name}`, (fileEntry) => {
              fileEntry.getMetadata((metadata) => {
                let time = metadata.modificationTime.toLocaleString().split(',')[0]
                if(this.imageObject[time]) {
                  this.imageObject[time].push({
                    name: subFiles[i].name,
                    time: metadata.modificationTime.toLocaleString(),
                    url: subFiles[i].fullPath
                  });
                }
                else {
                  this.imageObject[time] = [];
                  this.imageObject[time].push({
                    name: subFiles[i].name,
                    time: metadata.modificationTime.toLocaleString(),
                    url: subFiles[i].fullPath
                  });
                }
              });
            });
          }
        });
      });
    },
    delPicture() {
      if(this.activePicture.name) {
        window.plus.io.resolveLocalFileSystemURL(window.plus.io.convertAbsoluteFileSystem(this.activePicture.url), (fileEntry) => {
          fileEntry.remove(() => {
            this.imageObject[this.activePicture.time.split(',')[0]].splice(this.activePicture.index, 1);
            this.$forceUpdate();
          });
        });
      }
    },
    choosePicture(picture, index) {
      if(this.activePicture.name === picture.name) {
        this.activePicture = {};
      }
      else {
        this.activePicture = picture;
        this.activePicture.index = index;
      }
    }
  }
}
</script>