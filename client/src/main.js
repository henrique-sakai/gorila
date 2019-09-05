import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import jQuery from 'jquery'
import 'popper.js'

window.$ = window.jQuery = jQuery;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

//serverBus is used to share data between components
export const serverBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
