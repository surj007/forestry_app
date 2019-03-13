<style lang="less" scoped>
.apply-record {
  background: #f8f8f8;
  padding-top: 46px;
  padding-bottom: 65px;
  min-height: 100vh;
  &-select-wrapper {
    background: #FFF;
    height: 35px;
    .apply-record-select {
      flex: auto;
      font-size: 14px;
    }
  }
  &__radio {
    margin-left: 20px;
    & > div {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
<style>
.change-top-popup .van-popup--top {
  overflow-y: initial!important;
}
.change-radio .van-radio__label {
  font-size: 16px;
}
</style>


<template>
  <div class="apply-record">
    <van-nav-bar title="申请记录" fixed>
      <van-icon name="bulb-o" slot="left" size="0.7rem">
        <sup class="dot"></sup>
      </van-icon>
      <van-icon name="setting-o" slot="right" size="0.6rem" @click="$router.push({name: 'setting'})" />
    </van-nav-bar>

    <div class="apply-record-select-wrapper flex-center-xy">
      <div class="apply-record-select flex-center-xy" @click="showApplyType = true">
        {{ applyTypeZh }}
        <van-icon name="arrow-down" size="0.35rem" style="margin-left: 0.2rem" />
      </div>

      <div class="apply-record-select flex-center-xy" @click="showApplyStatus = true">
        {{ applyStatusZh }}
        <van-icon name="arrow-down" size="0.35rem" style="margin-left: 0.2rem" />
      </div>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="clock-o">申请记录</van-tabbar-item>
      <van-tabbar-item icon="orders-o" :to="{name: 'home'}">业务办理</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name: 'companySetting'}">企业管理</van-tabbar-item>
    </van-tabbar>

    <apply-card v-for="(item, index) in applyData" :data="item" :key="index" />

    <div class="change-top-popup change-radio">
      <van-popup v-model="showApplyType" position="bottom">
        <van-radio-group v-model="applyType" class="apply-record__radio" @change="handleApplyTypeChange">
          <van-radio name="">全部申请</van-radio>
          <van-radio name="wood">原木类申请</van-radio>
          <van-radio name="board">板材类申请</van-radio>
          <van-radio name="plant">木材运输与植物检疫申请</van-radio>
        </van-radio-group>
      </van-popup>

      <van-popup v-model="showApplyStatus" position="bottom">
        <van-radio-group v-model="applyStatus" class="apply-record__radio" @change="handleApplyStatusChange">
          <van-radio :name="0">全部状态</van-radio>
          <van-radio :name="1">审核中</van-radio>
          <van-radio :name="2">已通过</van-radio>
          <van-radio :name="3">未通过</van-radio>
        </van-radio-group>
      </van-popup>
    </div>
  </div>
</template>

<script>
import ApplyCard from './ApplyCard';

export default {
  name: 'ApplyRecord',
  components: {
    ApplyCard
  },
  created() {
    this.getCert();
  },
  computed: {
    applyTypeZh() {
      switch (this.applyType) {
        case '': {
          return '全部申请';
        }
        case 'wood': {
          return '原木类申请';
        }
        case 'board': {
          return '板材类申请';
        }
        case 'plant': {
          return '木材运输与植物检疫申请';
        }
        default: {
          return;
        }
      }
    },
    applyStatusZh() {
      switch (this.applyStatus) {
        case 0: {
          return '全部状态';
        }
        case 1: {
          return '审核中';
        }
        case 2: {
          return '已审批';
        }
        case 3: {
          return '未通过';
        }
        default: {
          return;
        }
      }
    }
  },
  data() {
    return {
      active: 0,
      showApplyType: false,
      showApplyStatus: false,
      applyType: '',
      applyStatus: 0,
      applyData: []
    }
  },
  methods: {
    getCert() {
      this.$http({
        url: '/cert/getCert',
        method: 'GET',
        params: {
          type: this.applyType,
          status: this.applyStatus
        }
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.applyData = [];
          if(res.data.data.boardCert) {
            for(let i of res.data.data.boardCert) {
              i.type = 1;
              this.applyData.push(i);
            }
          }
          if(res.data.data.woodCert) {
            for(let i of res.data.data.woodCert) {
              i.type = 0;
              this.applyData.push(i);
            }
          }
          if(res.data.data.plantCert) {
            for(let i of res.data.data.plantCert) {
              i.type = 2;
              this.applyData.push(i);
            }
          }
        }
      });
    },
    handleApplyTypeChange() {
      this.showApplyType = false;
      this.getCert();
    },
    handleApplyStatusChange() {
      this.showApplyStatus = false;
      this.getCert();
    }
  }
}
</script>