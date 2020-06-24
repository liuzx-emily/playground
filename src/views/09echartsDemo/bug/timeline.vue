<style scoped>
	.chart {
		display: block;
		width: 100%;
		height: 400px;
	}
</style>
<template>
	<section v-loading="loading">

		<section class="assistance">
			<p>当前节点的数据，如果比上一个节点的数据组数少。会用上一个节点对应位置的数据补齐。</p>
			<p>本demo中，最开始2015只有一条线，but当循环一圈又回到2015时，2015变成了三条线（多的那两条用的就是2019年的数据）</p>
			<p>效果：
				<input type="radio" v-model="fixBug" :value="false">原汁原味
				<input type="radio" v-model="fixBug" :value="true">处理bug
			</p>
			<p>怎么解决：获取数据之后，先处理一下，把组数少的补齐。将补充的数据的<code>value</code>设置为<code>undefined</code></p>
		</section>
		<section class="chart" ref="chart"></section>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				// 局部loading
				loading: true,
				// 调色盘
				colorArr: ["#ff7576", "#ffba75", "#75bbff", "#4ce297", ],
				// 数据
				data: [],
				fixBug: false,
			}
		},
		watch: {
			fixBug() {
				this.getData();
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
				this.data = [{
					year: '2015年',
					data: [
						{ name: "西瓜", value: [30, 59, 47, 66], },
						// { name: "苹果", value: [55, 64, 43, 71], },
						// { name: "菠萝", value: [53, 45, 22, 17], },
					]
				}, {
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
						// { name: "苹果", value: [23, 23, 53, 78], },
						// { name: "菠萝", value: [72, 2, 98, 28], },
					]
				}, {
					year: '2018年',
					data: [
						{ name: "西瓜", value: [7, 77, 4, 76], },
						{ name: "苹果", value: [71, 62, 39, 19], },
						// { name: "菠萝", value: [80, 65, 66, 67], },
					]
				}, {
					year: '2019年',
					data: [
						{ name: "西瓜", value: [83, 95, 23, 75], },
						// { name: "苹果", value: [57, 94, 57, 46], },
						// { name: "菠萝", value: [20, 25, 100, 73], },
					]
				}, ];
				// --------------------- 处理bug --------------------------
				if (this.fixBug) {
					// 首先，算出最多有几条
					let maxNumber = Math.max(...this._(this.data).map("data").map("length").value());
					// 给条数少的补上
					this._(this.data).map("data").forEach(item => {
						let len = item.length;
						for (let i = len; i < maxNumber; i++) {
							// name无所谓。value设置为undefined，在图表和tooltip中都不会出现
							item.push({ name: "占位的", value: undefined, });
						}
					});
				}
				// --------------------- 处理bug --------------------------
				this.drawChart();
			},
			// 用数据画画
			drawChart() {
				// 初始化
				let chart_obj = this.echarts.init(this.$refs.chart);
				// timeline的默认配置
				const default_timeline = {
					// 如果设置为false，那么不会显示timeline，但是功能还在。
					show: true,
					/*
					value : 数值轴，适用于连续数据
					category : 类目轴，适用于离散的类目数据
					time : 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
					*/
					axisType: 'category',
					// 默认0
					currentIndex: 0,
					autoPlay: true,
					// 是否反向播放 默认false
					rewind: false,
					// 是否循环播放，默认true
					loop: true,
					// 跳动的间隔 默认2000ms
					playInterval: 1000,
					// 拖动圆点的时候，是否实时更新视图。 默认true
					realtime: true,
					// ------------- timeline整体的位置 -------------
					// 可以是 number % 文字( 'left' 'right' 'center' / 'top' 'middle' 'bottom' )，默认'auto'
					// 设置 left:'center' right:'auto'会导致轴过长，放不下，原因未知
					left: '5%',
					top: 30,
					right: '5%',
					// bottom: 'auto',
					// 可选 vertical horizontal
					orient: 'horizontal',
					// ------------- timeline上的一个个小节点 -------------
					// 可选 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' 默认：emptyCircle
					symbol: 'diamond',
					// 可以是number，也可以是[number,number]
					symbolSize: [12, 12],
					// 有的时候，设置了symbolOffset:[0,0]会导致，图表刚刷出来时，第一个节点位置偏移。所以不要设置这项
					// symbolOffset: [0, 0],
					itemStyle: {
						color: "#fff",
						borderColor: "#caf",
						borderWidth: 3,
					},
					// ------------- timeline上当前项节点 -------------
					checkpointStyle: {
						symbol: "diamond",
						symbolSize: 15,
						// 有的时候，设置了symbolOffset:[0,0]会导致，图表刚刷出来时，第一个节点位置偏移。所以不要设置这项
						// symbolOffset: [0, 0],
						color: "#fff",
						borderColor: "#e53",
						borderWidth: 5,
					},
					// ------------- 轴线 -------------
					lineStyle: {
						show: true,
						color: '#fac',
						width: 3,
						type: 'solid',
					},
					// ------------- 文本标签 -------------
					label: {
						show: true,
						// vertical排列时，可选left right；horizontal排列时，可选top bottom。还可以指定具体number值。默认'auto'
						position: 15,
						interval: 0,
						rotate: 5,
						color: "#fac",
						fontSize: 15,
						// formatter:'',
						padding: [0, 30]
					},
					// ------------- 播放、暂停按钮 -------------
					// 可选 left right，默认left
					controlStyle: {
						show: true,
						// vertical排列时，可选left right；horizontal排列时，可选top bottom
						position: 'left',
						itemSize: 30,
						itemGap: 15,
						showPlayBtn: true,
						showPrevBtn: true,
						showNextBtn: true,
						color: '#fac',
						borderColor: "#fac",
						borderWidth: 3,
					},
					// ------------- 数据 -------------
					data: ["2016年", "2017年", "2018年", "2019年"],
				};
				// 
				let option = {
					baseOption: {
						timeline: default_timeline,
					},
					options: []
				};
				// 设置timeline的数据
				option.baseOption.timeline.data = this._.map(this.data, "year");
				// 设置options
				this.data.forEach(item => {
					option.options.push(this.getOption(item.data));
				});
				chart_obj.setOption(option);
				this.loading = false;
			},
			getOption(data) {
				// 每个series的默认配置
				const default_series_line = {
					name: '类别名称',
					type: 'line',
					// 拐点的图形，可选： 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' ，默认： emptyCircle
					symbol: "circle",
					// 拐点的大小，默认4
					symbolSize: 12,
					// 线条样式
					lineStyle: {
						// 【默认从全局调色盘 option.color 获取颜色】
						// color:"red",
						width: 4,
						type: "solid",
					},
					data: []
				};
				// 坐标轴的默认配置
				const default_axis = {
					name: "坐标轴名称",
					// 坐标轴名称的文字样式
					nameTextStyle: {
						// 默认取 axisLine.lineStyle.color。
						color: "#385b83",
						fontSize: 20,
						fontWeight: "bold",
					},
					// 坐标轴类型 category value time log 
					type: 'category',
					// 坐标轴两边留白策略。类目轴设置为true、false，和非类目轴的设置为[a,b]
					boundaryGap: false,
					// 坐标轴轴线
					axisLine: {
						lineStyle: {
							color: "#ddd",
							width: 3,
							type: "solid",
						},
					},
					// 坐标轴的刻度标签
					axisLabel: {
						// 显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』。默认auto
						interval: 0,
						// 默认取 axisLine.lineStyle.color
						color: "#777"
					},
					// 坐标轴的刻度
					axisTick: {
						show: false,
					},
					// 分割线
					splitLine: {
						// 是否显示分隔线。默认数值轴显示，类目轴不显示。
						show: true,
						lineStyle: {
							color: '#eee',
							width: 1,
						}
					},
					data: []
				};
				// 配置项
				let option = {
					color: this.colorArr,
					grid: {
						// grid左上角位置：默认80 60
						x: 130,
						y: 150,
						// grid右下角位置：默认80 60
						x2: 80,
						y2: 50,
					},
					// x轴
					xAxis: [],
					// y轴
					yAxis: [],
					// 提示框
					tooltip: {
						trigger: 'axis',
						formatter: params => {
							let str = "";
							if (params.componentType == "timeline") {
								return params.name;
							} else {
								console.log(params);
								str = params[0].name + '<br/>';
								params.forEach(item => {
									str += `${item.seriesName} :${item.value}<br/>`;
								});
							}
							return str;
						}
					},
					// 图例
					legend: {
						show: true,
						// 位置靠左，距离顶部30px，垂直排列，每项之间间距20px
						left: "left",
						top: "center",
						orient: "vertical",
						itemGap: 20,
					},
					series: []
				};
				// -------------- 设置x轴 --------------
				let xAxis = this._.cloneDeep(default_axis);
				xAxis.name = "月份";
				xAxis.type = "category";
				// 两边留白
				// xAxis.boundaryGap = true;
				// 两边不留白
				xAxis.boundaryGap = false;
				xAxis.data = ['一月', '二月', '三月', '四月'];
				// xAxis.axisPointer=true;
				option.xAxis = [xAxis];
				// -------------- 设置y轴 --------------
				let yAxis = this._.cloneDeep(default_axis);
				yAxis.name = "价格";
				yAxis.type = "value";
				yAxis.boundaryGap = [0, 0];
				option.yAxis = [yAxis];
				// -------------- 设置series --------------

				option.series = data.map(item => {
					let series = this._.cloneDeep(default_series_line);
					series.name = item.name;
					series.data = item.value;
					return series;
				});
				return option;
			}
		}
	};
</script>