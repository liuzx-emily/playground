<style scoped>
	.chart {
		display: block;
		width: 100%;
		height: 500px;
	}
</style>
<template>
	<section v-loading="loading">
		<section class="assistance">
			<p>演示：多个pie在一张图上渲染，且pie的数量不确定。（重点：计算每个饼图的圆心位置）</p>
			<p>为了给legend腾地儿，计算每个小饼的y的时候，往下挪一点</p>
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
				// 调色盘
				colorArr: ["#01a6a6", "#fbc533", "#aad571", "#f89046", "#33cca1", "#fc7e4b", "#3585f6", "#9575cd", "#FB8C00", "#D84315", "#607d8b", "#e6a23c", "#f56c6c", "#795548", "#9d8eb7", "#F9A825", ],
				// 数据
				data: [],
				// ----------------------
				// 每行放几个
				count_per_row: 6,
				// 每个pie有多大
				each_pie_size: 200
			}
		},
		computed: {
			// 总共有几行
			row_number() {
				return Math.ceil(this.data.length / this.count_per_row);
			}
		},
		mounted() {
			// 当容器的宽度变化时，重新画画
			this.chartResizeWhenWidthChange(this.$refs.chart);
			this.getData();
		},
		methods: {
			// 获取数据并画画
			getData() {
				this.loading = true;
				// 先销毁之前的图
				this.echarts.dispose(this.$refs.chart);
				this.data = [
					{ name: "苹果", value: 54 },
					{ name: "橘子", value: 44 },
					{ name: "菠萝", value: 35 },
					{ name: "西瓜", value: 30 },
					{ name: "玉米", value: 17 },
					{ name: "香蕉", value: 11 },
					{ name: "西葫芦", value: 31 },
					{ name: "牛肉", value: 20 },
					{ name: "土豆", value: 65 },
					{ name: "菜花", value: 10 },
					{ name: "芹菜", value: 20 },
					{ name: "鸡蛋", value: 39 },
					{ name: "西红柿", value: 54 },
					{ name: "魔芋", value: 63 },
				];
				this.drawChart();
			},
			// 用数据画画
			drawChart() {
				// 初始化
				let chart_obj = this.echarts.init(this.$refs.chart);
				// 设置height
				let element = this.$refs.chart;
				let elementHeight = this.each_pie_size * this.row_number
				element.style.height = elementHeight + "px";
				// 初始化
				let option = {
					// legend颜色会用这个color
					color: this.colorArr,
					legend: {
						orient: 'horizontal',
						x: 'center',
						y: 10,
						// 和每个series的name对应
						data: this._.map(this.data, "name"),
					},
					series: []
				};
				_.forEach(this.data, (item, index) => {
					index += 1;
					// 在第几行
					let row = Math.ceil(index / this.count_per_row);
					// 在第几列
					let col = index - (row - 1) * this.count_per_row;
					// 计算位置(y向下挪一点，给legend腾地儿)
					let x = (2 * col - 1) / (2 * this.count_per_row) * 100;
					let y = (2 * row - 1) / (2 * this.row_number) * 95 + 5;
					// console.log(`第${index}个，在第${row}行，第${col}列，圆心在 (${x}%,${y}%)`);
					let this_series = {
						// 这里的name，是整个饼图的name。为了在legend中显示的
						name: item.name,
						type: 'pie',
						// 圆心位置，默认['50%', '50%'] 。可以设置成像素值[400,300]
						center: [x + "%", y + "%"],
						// 半径，默认 [0, '75%']。可以设置成像素值[60, 80]
						radius: [40, 70],
						data: [{
								name: "",
								value: item.value,
								itemStyle: {
									color: this.colorArr[(index - 1) % this.colorArr.length],
								},
								// 文字 放在环的里面
								label: {
									show: true,
									position: 'center',
									fontSize: 16,
									formatter: function(params) {
										return `${item.name}\n${params.value}%`;
									},
								},
							}, {
								name: '',
								value: 100 - item.value,
								itemStyle: {
									color: '#000',
								},
								label: {
									show: false,
								},
								labelLine: {
									show: false,
								},

							},

						]
					};
					option.series.push(this_series)
				});
				// 显示图表
				chart_obj.setOption(option);
				this.loading = false;
			}
		}
	};
</script>