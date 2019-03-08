<style lang="less" scoped>
  .switch {
    margin-top: 10px;
  }
</style>

<template>
  <div class="set-notice">
    <van-nav-bar title="通用设置" left-arrow @click-left="$emit('close-popup')" />

    <van-switch-cell v-model="notShowNotice" title="接受新消息通知" active-color="#FFF" 
    inactive-color="#01B6AF" class="switch" :active-value="false" :inactive-value="true" @change="$window.$storage.set('notShowNotice', notShowNotice)" />
  </div>
</template>

<script>
export default {
  name: 'SetNotice',
  data() {
    return {
      notShowNotice: false
    }
  },
  methods: {
    
  }
}
</script>
