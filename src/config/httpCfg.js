import Vue from 'vue';
import axios from 'axios';

window.cookie = null;

Vue.prototype.$http = axios.create({
  headers: {
    'Cache-Control': 'no-cache'
  }
});

function plusHttpRequest(config) {
  return new Promise((resolve, reject) => {
    let baseURL = 'http://192.168.113.16:8089';
    let xhr = new plus.net.XMLHttpRequest();

    xhr.onload = () => {
      if(config.url.indexOf('/auth/login') != -1) {
        cookie = xhr.getResponseHeader("Set-Cookie");
      }

      if(xhr.response.message == '未登录') {
        vm.$router.push({name: 'login'});
      }

      resolve({
        data: xhr.response
      });
    }
    xhr.onerror = (e) => {
      reject(e);
    }
    xhr.ontimeout = (e) => {
      reject('time out');
    }

    xhr.responseType = 'json';
    xhr.timeout = 10000;

    if(config.params) {
      config.url += '?';
      for(let i in config.params) {
        config.url += `${i}=${config.params[i]}&`;
      }
      config.url = config.url.substring(0, config.url.length - 1);
    }

    if(config.url.indexOf('http') == -1) {
      config.url = baseURL + config.url;
    }

    xhr.open(config.method, config.url);
    
    if(config.headers) {
      for(let i in config.headers) {
        xhr.setRequestHeader(i, config.headers[i]);
      }
    }
    else {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    }

    if(cookie) {
      xhr.setRequestHeader('Cookie', cookie);
    }

    if(config.data) {
      xhr.send(config.data);
    }
    else {
      xhr.send();
    }
  });
}

//Vue.prototype.$http = plusHttpRequest;