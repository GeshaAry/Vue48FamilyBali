import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from '@/plugins/vuetify';
import axios from 'axios';
import VueTyperPlugin from 'vue-typer'


Vue.use(VueTyperPlugin)
Vue.component('pagination', require('laravel-vue-pagination'));


Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$baseUrl = 'http://127.0.0.1:8000';
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
