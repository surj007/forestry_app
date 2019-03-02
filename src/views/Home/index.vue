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
  async created() {
    if(!window.$storage.get('token')) {
      this.$router.push({name: 'login'});
    }
    else {
      await this.$store.dispatch('getCompanyInfo', this);
      if(!this.$store.getters.oCompanyInfo.id) {
        this.$router.push({name: 'setCompanyInfo'});
      }
    }
  },
  data() {
    return {

    };
  }
}
</script>
