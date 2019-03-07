import Vue from 'vue';

Vue.directive('back', {
  bind(el){
    el.addEventListener('click', (e) => {
      window.history.back();
    });
  }
})