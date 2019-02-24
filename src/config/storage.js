const storage = {
  get(key) {
    let obj = JSON.parse(window.plus.storage.getItem(key));
    if(obj && new Date() <= new Date(obj.expire)) {
      return obj.data;
    }
    else {
      window.plus.storage.removeItem(key);
      return null;
    }
  },
  set(key, value) {
    let obj = {};
    obj.data = value;
    obj.expire = new Date().setDate(new Date().getDate() + 1);
    window.plus.storage.setItem(key, JSON.stringify(obj));
  },
  del(key) {
    window.plus.storage.removeItem(key);
  }
};

export default storage;