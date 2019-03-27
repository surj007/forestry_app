<style lang="less" scoped>
.set-employee {
  background: #F8F8F8;
  margin-top: 46px;
  overflow: auto;
  &-add-employee {
    height: 61px;
    border-radius: 10px;
    background: #FFF;
    margin: 20px 10px 0 10px;
    &__text {
      color: #C7C7C7;
      font-size: 14px;
    }
  }
  &-btn {
    padding: 0 15px 0 15px;
    margin-top: 52px;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <div class="set-employee">
    <van-nav-bar title="修改业务员" left-arrow @click-left="$router.push({name: 'setCompanyInfo'})" fixed v-if="!$window.$storage.get('isReg')" />
    <van-nav-bar title="添加业务员" right-text="跳过" fixed @click-right="$router.push({name: 'chooseCert'})" v-else />

    <employee-card ref="employee-card" v-for="(item, index) in employee" :key="index" v-model="employee[index]" :index="index" @del-card="handleDelCard" />

    <div class="set-employee-add-employee flex-center-xy" v-if="employee.length == 1" @click="addEmployee">
      <div class="set-employee-add-employee__text">
        <van-icon name="plus" />
        <span>
          添加一位业务员
        </span>
      </div>
    </div>

    <div class="set-employee-btn change-button-background">
      <van-button size="large" round type="primary" @click="submit" v-if="$store.getters.oCompanyInfo.status === 2 || $store.getters.oCompanyInfo.status === 3 || $window.$storage.get('isReg')">提交</van-button>
      <van-button size="large" round type="primary" @click="$router.push({name: 'companySetting'})" v-if="$store.getters.oCompanyInfo.status === 1 || $store.getters.oCompanyInfo.status === 4">返回</van-button>
    </div>
  </div>
</template>

<script>
import EmployeeCard from './EmployeeCard';

export default {
  name: 'SetEmployee',
  components: {
    EmployeeCard
  },
  created() {
    if(!window.$storage.get('isReg')) {
      this.getEmployee();
    }
  },
  data() {
    return {
      employee: [
        {
          name: '',
          username: '',
          socialSecurityPic: '',
          cardFrontPic: '',
          cardOppositePic: ''
        }
      ],
      employeeInit: []
    }
  },
  methods: {
    getEmployee() {
      this.$http({
        url: '/employee/getEmployee',
        method: 'GET'
      }).then((res) => {
        if(res && res.data.code == 0) {
          this.employeeInit = JSON.parse(JSON.stringify(res.data.data));
          this.employee = res.data.data || [
            {
              name: '',
              username: '',
              socialSecurityPic: '',
              cardFrontPic: '',
              cardOppositePic: ''
            }
          ];
        }
      });
    },
    submit() {
      if(window.$underscore.isEqual(this.employeeInit, this.employee)) {
        this.$router.push({name: 'companySetting'});
        return;
      }

      let flag = true;
      for(let i in this.employee) {
        if(!this.$refs['employee-card'][i].validate()) {
          flag = false;
        }
      }
      if(flag) {
        this.$http({
          url: '/employee/editEmployee',
          method: 'POST',
          data: {
            employee: this.employee
          }
        }).then((res) => {
          if(res && res.data.code == 0) {
            this.$toast.success('修改业务员成功');
            if(window.$storage.get('isReg')) {
              this.$router.push({name: 'chooseCert'});
            }
            else {
              this.$router.push({name: 'companySetting'});
            }
          }
        });
      }
    },
    handleDelCard(index) {
      if(this.employee.length != 1 && this.$store.getters.oCompanyInfo.status !== 1 && this.$store.getters.oCompanyInfo.status !== 4) {
        this.employee.splice(index, 1);
      }
    },
    addEmployee() {
      if (this.$store.getters.oCompanyInfo.status !== 1 && this.$store.getters.oCompanyInfo.status !== 4) {
        this.employee.push({
          name: '',
          username: '',
          socialSecurityPic: '',
          cardFrontPic: '',
          cardOppositePic: ''
        });
      }
    }
  }
}
</script>
