import Vue from 'vue';


// axios
import xaxios from '~/axios.js'
Vue.prototype.xaxios = xaxios

// -------------- element --------------
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'mini' });
import 'element-ui/lib/theme-chalk/index.css';


// -------------- font-awesome --------------
import 'font-awesome/css/font-awesome.css';


// -------------- 样式 --------------
import "~/styles/main.less";


// -------------- utils ----------------
import _ from 'lodash'
Vue.prototype._ = _
import xtools from '~/utils/tools.js'
Vue.prototype.xtools = xtools
import { xValidate, xElementRules } from '~/utils/xValidate.js'
Vue.prototype.xValidate = xValidate
Vue.prototype.xElementRules = xElementRules
import exportPDF from '~/utils/exportPdf'
Vue.prototype.exportPDF = exportPDF


// -------------- 自定义指令 ----------------
Vue.directive("permission", {
	// 指令的定义
	inserted(el, binding, vnode) {
		const permissionBtns = vnode.context.$store.state.permissionBtns
		const code = `${binding.arg}:btn:${{1:'add',2:'edit',3:'look',4:'delete'}[binding.value]||binding.value}`;
		const flag = _.indexOf(permissionBtns, code) != -1;
		if (flag) {
			el.classList.remove("no-permission-btn");
		} else {
			el.classList.add("no-permission-btn");
		}
	},
	update(el, binding, vnode) {
		const permissionBtns = vnode.context.$store.state.permissionBtns
		const code = `${binding.arg}:btn:${{1:'add',2:'edit',3:'look',4:'delete'}[binding.value]||binding.value}`;
		const flag = _.indexOf(permissionBtns, code) != -1;
		if (flag) {
			el.classList.remove("no-permission-btn");
		} else {
			el.classList.add("no-permission-btn");
		}
	},
});

// -------------- 插件echarts --------------
import echarts from 'echarts'
import themeChick from './echartsThemes/theme-chic.js'
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


// -------------- 注册常用组件和模块 --------------
import gc_editor from "~/components/editor/main.vue";
Vue.use(gc_editor);
import gc_form_item_pickyear from "~/components/form-item/pickyear/main.vue";
Vue.use(gc_form_item_pickyear);
import gc_form_item_pickdaterange from "~/components/form-item/pickdaterange/main.vue";
Vue.use(gc_form_item_pickdaterange);
import gc_horizontal_scrolling from '~/components/horizontal-scrolling/main.vue';
Vue.use(gc_horizontal_scrolling);
import gc_table from '~/components/table/main.vue'
Vue.use(gc_table);
import gc_treetable from '~/components/treetable/main.vue';
Vue.use(gc_treetable);
import gm_cascading_address from "~/modules/cascading-address/main.vue";
Vue.use(gm_cascading_address);
import gm_upload from "~/modules/upload/main.vue";
Vue.use(gm_upload);
import gm_upload_one_img from "~/modules/upload-one-img/main.vue";
Vue.use(gm_upload_one_img);

// -------------- xui --------------
import xui_button from "~/xui/button/main.vue";
Vue.use(xui_button);



Vue.config.productionTip = false;