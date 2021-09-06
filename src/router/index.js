import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: '首页' },
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
    //     meta: { title: '开发必读' },
    // },
];

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.VITE_SOME_KEY,
    routes,
});

export {
    router,
    routes,
};
