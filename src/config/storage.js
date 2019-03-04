// const storage = {
//   get(key) {
//     let obj = JSON.parse(window.plus.storage.getItem(key));
//     if(obj && new Date().getTime() <= parseInt(obj.expire)) {
//       return obj.data;
//     }
//     else {
//       window.plus.storage.removeItem(key);
//       return null;
//     }
//   },
//   set(key, value, expire = 24 * 60 * 60 * 1000) {
//     let obj = {};
//     obj.data = value;
//     obj.expire = new Date().getTime() + expire;
//     window.plus.storage.setItem(key, JSON.stringify(obj));
//   },
//   del(key) {
//     window.plus.storage.removeItem(key);
//   }
// };

const storage = {
  get(key) {
    let obj = JSON.parse(window.sessionStorage.getItem(key));
    if(obj && new Date().getTime() <= parseInt(obj.expire)) {
      return obj.data;
    }
    else {
      window.sessionStorage.removeItem(key);
      return null;
    }
  },
  set(key, value, expire = 24 * 60 * 60 * 1000) {
    let obj = {};
    obj.data = value;
    obj.expire = new Date().getTime() + expire;
    window.sessionStorage.setItem(key, JSON.stringify(obj));
  },
  del(key) {
    window.sessionStorage.removeItem(key);
  }
};

export default storage;