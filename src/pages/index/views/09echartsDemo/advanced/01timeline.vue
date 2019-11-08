<style scoped>
.chart {
	display: block;
	width: 100%;
	height: 400px;
}
</style>
<template>
	<section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
		<el-alert type="info" title="getOption方法中，需要哪种图就去basic中复制相应的设置。"></el-alert>
		<el-alert type="info" title="timeline本身有bug：数据不全时，图表会显示出上一个节点的数据。具体见bug专题"></el-alert>
		<el-button class="size-common" type="primary" @click="getData">重新获取数据</el-button>
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
		// this.getData();
	},
	methods: {
		// 获取数据并画画
		getData() {
			this.loading = true;
			// 先销毁之前的图
			this.echarts.dispose(this.$refs.chart);
			this.data = [{
				year: '2016年',
				data: [
					{ name: "西瓜", value: [85, 129, 23, 7], },
					{ name: "苹果", value: [169, 17, 93, 76], },
					{ name: "菠萝", value: [34, 135, 15, 46], },
				]
			}, {
				year: '2017年',
				data: [
					{ name: "西瓜", value: [79, 96, 7, 31], },
					{ name: "苹果", value: [23, 23, 53, 78], },
					{ name: "菠萝", value: [72, 2, 98, 28], },
				]
			}, {
				year: '2018年',
				data: [
					{ name: "西瓜", value: [7, 77, 4, 76], },
					{ name: "苹果", value: [71, 62, 39, 19], },
					{ name: "菠萝", value: [80, 65, 66, 67], },
				]
			}, {
				year: '2019年',
				data: [
					{ name: "西瓜", value: [83, 95, 23, 75], },
					{ name: "苹果", value: [57, 94, 57, 46], },
					{ name: "菠萝", value: [20, 25, 100, 73], },
				]
			}, {
				year: '2020年',
				data: [
					{ name: "西瓜", value: [38, 59, 32, 57], },
					{ name: "苹果", value: [75, 49, 75, 64], },
					{ name: "菠萝", value: [34, 62, 16, 78], },
				]
			},];
			this.drawChart();
		},
		// 用数据画画
		drawChart() {
			// 初始化
			let chart_obj = this.echarts.init(this.$refs.chart, "chic");
			// 
			let option = {
				baseOption: {
					timeline: {
						// 如果设置为false，那么不会显示timeline，但是功能还在。
						show: true,
                        /*
                        value : 数值轴，适用于连续数据
                        category : 类目轴，适用于离散的类目数据
                        time : 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                        */
						axisType: 'category',
					},
				},
				options: []
			};
			// 设置timeline的数据
			option.baseOption.timeline.data = this._.map(this.data, "year");
			// 设置options
			this.data.forEach(item => {
				option.options.push(this.getOption(item.data));
			})
			chart_obj.setOption(option);
			this.loading = false;
		},
		getOption(data) {
			// 配置项
			let option = {
				title: {
					text: "~主标题~",
				},
				legend: {},
				// 提示框
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
			option.series = data.map(item => {
				let series = {
					type: 'line',
					name: item.name,
					data: item.value
				};
				return series;
			});
			return option;
		}
	}
};
</script>