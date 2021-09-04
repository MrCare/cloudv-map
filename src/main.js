import Vue from 'vue';
import App from '@/app.vue';
import { router } from '@/router/index.js';
import store from '@/store/index.js';

import '@/assets/css/index.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
