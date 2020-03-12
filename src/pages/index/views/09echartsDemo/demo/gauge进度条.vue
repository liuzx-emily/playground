<style scoped>
	.chart {
		width: 100%;
		height: 200px;
	}
</style>
<template>
	<section v-loading="loading">
		<section class="assistance">
			<p>gauge 做不了一个完整的圆环</p>
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
				this.data = { name: "苹果", value: 68, color: "lightcoral" };
				this.drawChart();
			},
			drawChart() {
				// 初始化
				let chart_obj = this.echarts.init(this.$refs.chart);
				let option = {
					series: [{
						type: 'gauge',
						center: ['50%', '90%'],
						radius: 90,
						startAngle: 180,
						endAngle: 0,
						splitLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							show: false,
						},
						detail: {
							show: true,
							offsetCenter: [0, -10],
							formatter: '{value}%',
							color: this.data.color,
							fontSize: 28,
							fontWeight: 'bold',
						},
						pointer: {
							show: false,
						},
						axisLine: {
							lineStyle: {
								width: 15,
								// 颜色区间
								color: [
									[0, this.data.color],
									[this.data.value / 100, this.data.color],
									[1, "lightgray"],
								]
							}
						},
						data: [{ name: this.data.name, value: this.data.value }]
					}]
				};
				// 显示图表
				chart_obj.setOption(option);
				this.loading = false;
			}
		}
	};
</script>