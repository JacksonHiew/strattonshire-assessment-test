import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: "IndexPage",
            component: () => import("@/pages/IndexPage.vue"),
        },
    ]
});

export default router;