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
    <van-nav-bar title="添加业务员" right-text="跳过" fixed @click-right="$router.push({name: 'chooseCert'})" />

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
      <van-button size="large" round type="primary" @click="submit">提交</van-button>
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
      ]
    }
  },
  methods: {
    submit() {
      let flag = true;
      for(let i in this.employee) {
        if(!this.$refs['employee-card'][i].validate()) {
          flag = false;
        }
      }
      if(flag) {
        this.$http({
          url: '/employee/addEmployee',
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
          }
        });
      }
    },
    handleDelCard(index) {
      if(this.employee.length != 1) {
        this.employee.splice(index, 1);
      }
    },
    addEmployee() {
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
</script>
