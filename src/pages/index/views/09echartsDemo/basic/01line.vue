<style scoped>
.chart {
	display: block;
	width: 100%;
	height: 400px;
}
</style>
<template>
	<section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
		<el-card>
			<p>tip1：只有一组数据时，可以显示成area图：设置 series.areaStyle</p>
			<el-button type="primary" @click="getData">重新获取数据</el-button>
		</el-card>
		<section class="chart" ref="chart"></section>
	</section>
</template>
<script>
export default {
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
				{ name: "西瓜", data: [85, 129, 23, 7], },
				{ name: "苹果", data: [169, 17, 93, 76], },
				{ name: "菠萝", data: [34, 135, 15, 46], },
			];
			this.drawChart();
		},
		drawChart() {
			// 初始化
			let chart_obj = this.echarts.init(this.$refs.chart, "chic");
			// 配置项
			let option = {
				title: {
					text: "~主标题~",
				},
				legend: {},
				tooltip: {
					trigger: 'axis',
				},
			};
			// -------------- 设置x轴 --------------
			let xAxis = {
				name: '月份',
				type: 'category',
			};
			xAxis.data = ['一月', '二月', '三月', '四月'];
			option.xAxis = [xAxis];
			// -------------- 设置y轴 --------------
			let yAxis = {
				name: "价格(元)",
				type: "value",
			};
			option.yAxis = [yAxis];
			// -------------- 设置series --------------
			option.series = this.data.map((item, index) => {
				let series = {
					type: 'line',
					name: item.name,
					// tip1：只有一组数据时，可以显示成area图：设置 series.areaStyle。
					// areaStyle: {
					//     color: "coral",
					// },
					data: item.data
				};
				return series;
			});

			// 显示图表
			chart_obj.setOption(option);
			this.loading = false;
		}
	}
};
</script>