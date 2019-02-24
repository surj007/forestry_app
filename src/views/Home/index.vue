<style lang="less" scoped>

</style>

<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    if(!window.plus.storage.getItem('Cookie')) {
      this.$router.push({name: 'login'});
    }
  },
  data() {
    return {

    };
  }
}
</script>
