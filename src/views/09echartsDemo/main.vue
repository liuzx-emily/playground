<style lang="scss" scoped>
	/deep/ .assistance {
		background: #f5f5f5;
		padding: 10px;
		p {
			font-size: 12px;
			line-height: 1;
		}
		label {
			font-size: 12px;
			input[type="radio"] {
				vertical-align: top;
			}
		}
		pre {
			background: #263238;
			color: white;
		}
	}
</style>
<template>
	<section>
		<label v-for="item in componentList" :key="'label'+item.name">
			<input type="radio" :value="item.name" v-model="mode">{{item.label}}
		</label>
		<component v-for="item in componentList" :key="'component'+item.name" v-bind:is="item.component" ref="charts" v-show="mode==item.name"></component>
	</section>
</template>
<script>



	import instructions from './instructions'
	import chartLine from './demo/line.vue'
	import chartBar from './demo/bar.vue'
	import chartPie from './demo/pie.vue'
	import chartDoublePie from './demo/doublePie.vue'
	import chartGauge from './demo/gauge.vue'
	import chartCircleProgress from './demo/gauge进度条.vue'
	import chartSunburst from './demo/sunburst.vue'
	import chartTimeline from './demo/timeline.vue'
	import chartManyPie from './demo/manypie.vue'

	import bugTimeline from './bug/timeline.vue'
	import bugDataset from './bug/dataset.vue'
	import bugTree from './bug/tree.vue'

	const componentList = [
		{ component: instructions, name: "instructions", label: "说明" },
		{ component: chartLine, name: "chartLine", label: "折线(line area)" },
		{ component: chartBar, name: "chartBar", label: "柱(bar stack)" },
		{ component: chartPie, name: "chartPie", label: "pie" },
		{ component: chartDoublePie, name: "chartDoublePie", label: "嵌套饼" },
		{ component: chartGauge, name: "chartGauge", label: "gauge" },
		{ component: chartCircleProgress, name: "chartCircleProgress", label: "gauge进度条" },
		{ component: chartSunburst, name: "chartSunburst", label: "旭日图" },
		{ component: chartTimeline, name: "chartTimeline", label: "timeline" },
		{ component: chartManyPie, name: "chartManyPie", label: "many pie" },
		{ component: bugTimeline, name: "bugTimeline", label: "timeline" },
		{ component: bugDataset, name: "bugDataset", label: "【bug】dataset" },
		{ component: bugTree, name: "bugTree", label: "【bug】tree" },
	];

	const registerComponents = {};
	componentList.forEach(c => {
		registerComponents[c.name] = c.component;
	})
	export default {
		components: registerComponents,
		data() {
			return {
				mode: componentList[0].name,
				componentList,
			}
		},
	};
</script>