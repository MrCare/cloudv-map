import ElementUI from 'element-ui';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { router } from '@/router/index.js';
import App from '@/app.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

console.info(import.meta.env.BASE_URL);
