import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login')
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: () => import('../views/ResetPwd')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register')
    },
    {
      path: '/setCompanyInfo',
      name: 'setCompanyInfo',
      component: () => import('../views/SetCompanyInfo')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});
