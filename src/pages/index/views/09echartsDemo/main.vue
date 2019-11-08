<template>
	<section>
		<el-radio-group v-model="mode">
			<el-radio :label="1">instuctions</el-radio>
			<el-radio :label="2">basic</el-radio>
			<el-radio :label="3">advanced</el-radio>
			<el-radio :label="4">echarts的所有bug</el-radio>
		</el-radio-group>
		<section style="padding:10px 0;">
			<instructions v-if="mode==1" />
			<chartBasic v-if="mode==2" />
			<chartAdvanced v-if="mode==3" />
			<chartBug v-if="mode==4" />
		</section>
	</section>
</template>
<script>
import Vue from 'vue'
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



import instructions from './instructions/main.vue'
import chartBasic from './basic/main.vue'
import chartAdvanced from './advanced/main.vue'
import chartBug from './bug/main.vue'
export default {
	components: { instructions, chartBasic, chartAdvanced, chartBug },
	data() {
		return {
			// 1说明 2basic 3advanced 4bug
			mode: 2,
		}
	},
	mounted() { },
	methods: {}
};
</script>