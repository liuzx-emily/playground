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
import router from "./router/main.js"

// axios
import xaxios from '~/axios.js'
Vue.prototype.xaxios = xaxios

import App from './App.vue';

new Vue({
	render: h => h(App),
	// 把router实例注入到vue根实例中
	router: router,
}).$mount('#app');