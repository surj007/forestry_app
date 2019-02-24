import axios from 'axios';

const request = axios.create({
  timeout: 10000,
  headers: {
    'Cache-Control': 'no-cache'
  }
});

function plusRequest(config) {
  return new Promise((resolve, reject) => {
    let xhr = new window.plus.net.XMLHttpRequest();

    xhr.onload = () => {
      if(config.url.indexOf('/auth/login') != -1) {
        window.$storage.set('Cookie', xhr.getResponseHeader('Set-Cookie'));
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
      let flag = false;

      for(let i in config.headers) {
        if(i == 'Content-Type') {
          flag = true;
        }

        xhr.setRequestHeader(i, config.headers[i]);
      }

      if(!flag) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      }
    }
    else {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    }

    if(config.url.indexOf('/auth/login') == -1 && window.$storage.get('Cookie')) {
      xhr.setRequestHeader('Cookie', window.$storage.get('Cookie'));
    }

    if(config.data) {
      xhr.send(config.data);
    }
    else {
      xhr.send();
    }
  });
}

export default request;