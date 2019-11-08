import Vue from 'vue';



import '~/utils/lazyImport'



// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';

// -------------- element --------------
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'mini' });
import 'element-ui/lib/theme-chalk/index.css';


// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xtools from '~/utils/tools.js'
Vue.prototype.xtools = xtools

// router
import router from "./router/main.js"

// axios
import xaxios from '~/axios.js'
Vue.prototype.xaxios = xaxios

// store (vuex)
import store from './store/main.js'



import gc_editor from "~/components/editor/main.vue";
Vue.use(gc_editor);
import gm_upload_one_img from "~/modules/upload-one-img/main.vue";
Vue.use(gm_upload_one_img);


// -------------- xui --------------
import xui_button from "~/xui/button/main.vue";
Vue.use(xui_button);

// --------------- 注册本页面的组件和模块 ---------------

// 样式
import "./styles/main.less";

import App from './App.vue';

new Vue({
    render: h => h(App),
    // 把router实例注入到vue根实例中
    router: router,
    store: store
}).$mount('#app');