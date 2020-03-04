<style scoped>
	.chart {
		width: 100%;
		height: 300px;
	}
</style>
<template>
	<section v-loading="loading">
		<section class="assistance">
			<input type="button" value="重新获取数据" @click="getData">
		</section>
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
					{ name: "苹果", value: 34 },
					{ name: "橘子", value: 24 },
					{ name: "菠萝", value: 15 },
					{ name: "西瓜", value: 21 },
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
				// 每个series
				const series = {
					name: "整个饼图的名称",
					type: 'pie',
					center: ['50%', '65%'],
					radius: [40, '55%'],
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