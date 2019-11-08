import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: "/painting",
    component: () => import('~/pages/index/views/01painting/main.vue')
}, {
    path: "/photoEditing",
    component: () => import('~/pages/index/views/02photoEditing/main.vue')
}, 
{
    path: "/dragAndResize",
    component: () => import('~/pages/index/views/03dragAndResize/main.vue')
},
{
    path: "/dragToDelete",
    component: () => import('~/pages/index/views/04dragToDelete/main.vue')
},
{
    path: "/wave",
    component: () => import('~/pages/index/views/05wave/main.vue')
},
{
    path: "/calendar",
    component: () => import('~/pages/index/views/06calendar/main.vue')
},
{
    path: "/computeFileMd5",
    component: () => import('~/pages/index/views/07computeFileMd5/main.vue')
},
{
    path: "/horizontalScrolling",
    component: () => import('~/pages/index/views/08horizontalScrolling/main.vue')
},
{
    path: "/echartsDemo",
    component: () => import('~/pages/index/views/09echartsDemo/main.vue')
},
{
    path: "/guide",
    component: () => import('~/pages/index/views/10guide/main.vue')
},
{
    path: "/print",
    component: () => import('~/pages/index/views/11print/main.vue')
},
{
    path: "/exportPDF",
    component: () => import('~/pages/index/views/12exportPDF/main.vue')
},
{
    path: "/cssmadeShape",
    component: () => import('~/pages/index/views/13cssmadeShape/main.vue')
},
{
    path: "/manyLevelAddress",
    component: () => import('~/pages/index/views/14manyLevelAddress/main.vue')
},
{
    path: "/console",
    component: () => import('~/pages/index/views/15console/main.vue')
},
{
    path: "/canvasCloud",
    component: () => import('~/pages/index/views/16canvasCloud/main.vue')
},

];


const router = new VueRouter({
    // mode:'history',
    routes: routes,
});
export default router;