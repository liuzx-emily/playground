<template>
	<section>
		<keep-alive>

			<el-tabs v-model="activeTabName" @tab-click="tabClick">
				<el-tab-pane v-for="(item,index) in views" :key="index" :label="item.label" ref="tabs">
					<component v-bind:is="item.component" ref="charts"></component>
				</el-tab-pane>
			</el-tabs>
		</keep-alive>
	</section>
</template>
<script>
import chartLine from './01line.vue'
import chartBar from './03bar.vue'
import chartPie from './05pie.vue'
import chartGauge from './06gauge.vue'
import chartSunburst from './07sunburst.vue'
export default {
	components: { chartLine, chartBar, chartPie, chartGauge, chartSunburst },
	data() {
		return {
			activeTabName: "0",
			views: [
				{ component: chartLine, label: "折线图(line area)" },
				{ component: chartBar, label: "柱状图(bar stack)" },
				{ component: chartPie, label: "饼图" },
				{ component: chartGauge, label: "仪表盘" },
				{ component: chartSunburst, label: "旭日图" },
			]
		}
	},
	mounted() {
		// mounted 中无法保证所有子孙都渲染完成，加上 $nextTick 就可以保证了。
		this.$nextTick(() => {
			// 确保tab已经加载完成，能取到tab.index
			let tab = this.$refs.tabs[+this.activeTabName];
			this.tabClick(tab);
		});
	},
	methods: {
		tabClick(tab) {
			let ref = this.$refs.charts[tab.index];
			// ref.getData();
			this.$nextTick(() => {
				// ref.getData();
			});
		}
	}
};
</script>