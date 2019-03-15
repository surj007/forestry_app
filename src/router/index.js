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
      path: '/setEmployee',
      name: 'setEmployee',
      component: () => import('../views/SetEmployee')
    },
    {
      path: '/chooseCert',
      name: 'chooseCert',
      component: () => import('../views/ChooseCert')
    },
    {
      path: '/woodCert',
      name: 'woodCert',
      component: () => import('../views/WoodCert')
    },
    {
      path: '/boardCert',
      name: 'boardCert',
      component: () => import('../views/BoardCert')
    },
    {
      path: '/plantCert',
      name: 'plantCert',
      component: () => import('../views/PlantCert')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Setting')
    },
    {
      path: '/companySetting',
      name: 'companySetting',
      component: () => import('../views/CompanySetting')
    },
    {
      path: '/applyRecord',
      name: 'applyRecord',
      component: () => import('../views/ApplyRecord')
    },
    {
      path: '/certUpload',
      name: 'certUpload',
      component: () => import('../views/CertUpload')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});
