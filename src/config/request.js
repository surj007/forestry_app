import axios from 'axios';

import { delAllInfo } from '../service/auth';

window.baseUrl = 'http://47.105.67.161';
// window.baseUrl = 'http://192.168.0.110';

const request = axios.create({
  baseURL: `${window.baseUrl}:8089`,
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache'
  }
});

request.interceptors.request.use((config) => {
  config.headers['x-auth-token'] = window.$storage.get('token');

  return config;
});

request.interceptors.response.use((res) => {
  // console.log(JSON.stringify(res.data));
  if(res.config.url.includes('/auth/login')) {
    window.$storage.set('token', res.headers['x-auth-token']);
  }

  if(res.data.message == '请重新登陆') {
    console.warn('登陆超时');
    delAllInfo();
    window.$vm.$router.push({name: 'login'});
  }
  else if(res.data.code != 0) {
    console.warn(res.config.url, res.data.message);
    window.$vm.$toast.fail(res.data.message);
  }
  else {
    window.$storage.set('token', window.$storage.get('token'));
  }
  
  return res;
}, (e) => {
  console.warn('http status err: ' + JSON.stringify(e));
  window.$vm.$toast.fail('网络错误，请重试');
});

export default request;