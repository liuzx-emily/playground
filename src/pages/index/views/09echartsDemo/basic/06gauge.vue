<style scoped>
.chart {
	width: 100%;
	height: 500px;
}
</style>
<template>
	<section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
		<el-card>
			<el-button class="size-common" type="primary" @click="getData">重新获取数据</el-button>
		</el-card>
		<section class="chart" ref="chart"></section>
	</section>
</template>
<script>
export default {
	props: {},
	data() {
		return {
			// 局部loading
			loading: true,
			// 数据
			data: [],
		}
	},
	mounted() {
		// 当容器的宽度变化时，重新画画
		this.chartResizeWhenWidthChange(this.$refs.chart);
		this.getData();
	},
	methods: {
		getData() {
			this.loading = true;
			// 先销毁之前的图
			this.echarts.dispose(this.$refs.chart);
			this.data = [
				{ name: "苹果", value: 94 },
				{ name: "橘子", value: 71 },
				// { name: "菠萝", value: 76 },
				// { name: "西瓜", value: 85 },
			];
			this.drawChart();
		},
		drawChart() {
			// 初始化
			let chart_obj = this.echarts.init(this.$refs.chart, "chic");
			let option = {
				title: {
					text: "~主标题~",
				},
				legend: {},
				tooltip: {
					trigger: 'item',
				},
			};
			// 设置series
			let series = {
				type: 'gauge',
				data: this.data,
			};
			option.series = [series];
			// 显示图表
			chart_obj.setOption(option);
			this.loading = false;
		}
	}
};
</script>