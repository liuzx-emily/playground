import Vue from 'vue';

// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';

// import ElementUI from 'element-ui';
// Vue.use(ElementUI, { size: 'mini' });
import { Loading } from 'element-ui'
Vue.use(Loading.directive)
import 'element-ui/lib/theme-chalk/index.css';

// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xtools from '~/utils/tools.js'
Vue.prototype.xtools = xtools

// router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routeList = [
  { routePath: 'painting', componentPath: '01painting', name: "canvas 画板" },
  { routePath: 'photoEditing', componentPath: '02photoEditing', name: "canvas 图片处理" },
  { routePath: 'canvasCloud', componentPath: '03canvasCloud', name: "canvas 云朵" },
  { routePath: 'canvas-pretty-gauge', componentPath: '04canvas-pretty-gauge', name: "canvas 漂亮的仪表盘" },
  { routePath: 'cssMagician', componentPath: '05cssMagician', name: "css 各种神奇效果" },
  { routePath: 'calendar', componentPath: '06calendar', name: "日历组件" },
  { routePath: 'tree', componentPath: '07tree', name: "tree（很粗糙！）" },
  { routePath: 'horizontalScrolling', componentPath: '08horizontalScrolling', name: "横向滚动" },
  { routePath: 'echartsDemo', componentPath: '09echartsDemo', name: "echarts" },
  { routePath: 'print', componentPath: '10print', name: "打印局部" },
  { routePath: 'exportExcel', componentPath: '11exportExcel', name: "导出excel" },
  { routePath: 'exportPDF', componentPath: '12exportPDF', name: "导出pdf" },
  { routePath: 'greetingInSnow', componentPath: '13greetingInSnow', name: "css 雪中的问候" },
  { routePath: 'manyLevelAddress', componentPath: '14manyLevelAddress', name: "多级地址组件" },
  { routePath: 'console', componentPath: '15console', name: "console（已经掌握了）" },
  { routePath: 'editor', componentPath: '16editor', name: "自制editor" },
  { routePath: 'svg', componentPath: '17svg', name: "svg（未完成）" },
  { routePath: 'yaogan', componentPath: '18摇杆', name: "摇杆" },
  { routePath: 'cheatCodes', componentPath: '19cheatCodes', name: "作弊码" },
  { routePath: 'typingGame', componentPath: '20打字游戏', name: "打字游戏" },
];
const router = new VueRouter({
  mode: 'history',
  routes: routeList.map(i => {
    return {
      path: '/' + i.routePath,
      component: () => import(`~/views/${i.componentPath}/main.vue`)
    };
  })
});

// axios
import xaxios from '~/axios.js'
Vue.prototype.xaxios = xaxios

// echarts
import echarts from 'echarts'
import themeChick from '~/utils/echartsThemes/theme-chic.js'
echarts.registerTheme("chic", themeChick);
import { bind as sizeSensor, clear } from 'size-sensor';
Vue.prototype.echarts = echarts
Vue.prototype.chartResizeWhenWidthChange = domElement => {
  sizeSensor(domElement, element => {
    let echartsObj = echarts.getInstanceByDom(element);
    if (echartsObj) {
      echartsObj.resize();
    }
  });
}

import App from './App.vue';

new Vue({
  render: h => h(App),
  // 把router实例注入到vue根实例中
  router: router,
  data() {
    return {
      navList: routeList.map(i => {
        return {
          name: i.name,
          code: '/' + i.routePath,
        };
      })
    }
  },
}).$mount('#app');