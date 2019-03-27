<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default{
  name: 'APP',
  created() {
    document.body.addEventListener('focusout', () => { 
      let userAgent = window.plus.navigator.getUserAgent().toLowerCase();
      if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0) { 
        document.body.scrollTop = document.body.scrollHeight; 
      }
    });

    this.$store.dispatch('getFileInfo', this);
    this.$store.dispatch('getBasicInfo', this);
  }
}
</script>
