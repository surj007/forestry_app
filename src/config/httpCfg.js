import Vue from 'vue';
import axios from 'axios';

window.cookie = null;
window.baseUrl = 'http://localhost';

Vue.prototype.$http = axios.create({
  headers: {
    'Cache-Control': 'no-cache'
  }
});

function plusHttpRequest(config) {
  return new Promise((resolve, reject) => {
    let xhr = new plus.net.XMLHttpRequest();

    xhr.onload = () => {
      if(config.url.indexOf('/auth/login') != -1) {
        window.cookie = xhr.getResponseHeader('Set-Cookie');
      }

      if(xhr.response.message == '请重新登陆') {
        vm.$router.push({name: 'login'});
      }

      resolve({
        data: xhr.response
      });
    }
    xhr.onerror = (e) => {
      reject('http err: ' + e);
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
      config.url = `${window.baseUrl}:8089` + config.url;
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

    if(window.cookie) {
      xhr.setRequestHeader('Cookie', window.cookie);
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