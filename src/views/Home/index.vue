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
      if(!this.$store.getters.oCompanyInfo.id && window.$storage.get('user') && window.$storage.get('user').roles[0].id == 1) {
        this.$router.push({name: 'setCompanyInfo'});
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>
