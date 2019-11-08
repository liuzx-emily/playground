<style lang="less" scoped>
code {
	color: #2196f3;
	font-weight: bold;
}
p {
	font-size: 14px;
	line-height: 1.5;
	margin: 10px 0;
}
pre {
	margin: 10px 0;
}
</style>
<template>
	<section>
		<el-card>
			<div slot="header">
				<span>通用设置</span>
			</div>
			<el-radio-group v-model="preIndex">
				<el-radio :label="2">grid</el-radio>
				<el-radio :label="5">坐标轴设置</el-radio>
				<el-radio :label="3">legend</el-radio>
				<el-radio :label="1">lineStyle</el-radio>
				<el-radio :label="4">tooltip</el-radio>
			</el-radio-group>
			<pre v-if="preIndex==5">
                1 type：坐标轴类型。
                    category ：类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                    value ：数值轴，适用于连续数据。
                    time ：时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                    log ：对数轴。适用于对数数据。
                    
                2 boundaryGap 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
                    类目轴：true false
                        默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。            
                    非类目轴：[a,b]
                        a、b分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效。
                        
                3 minInterval 坐标轴最小间隔 
                    只在数值轴或时间轴中（type: 'value' 或 'time'）有效。
                    例如可以设置成1保证坐标轴分割刻度显示成整数。
            </pre>
			<pre v-if="preIndex==1">
                // 线条样式
                lineStyle: {
                    // 线的颜色【可以做线性渐变、径向渐变和纹理填充】
                    // color:"red",
                    // 宽度，默认2
                    width: 4,
                    // 线的类型，可选： solid dashed dotted ，默认 solid 
                    type: "solid",
                    // 图形阴影的模糊大小
                    shadowBlur: 0,
                    // 阴影颜色
                    shadowColor: "#000",
                    // 阴影水平方向上的偏移距离，默认0
                    shadowOffsetX: 0,
                    // 阴影垂直方向上的偏移距离，默认 0
                    shadowOffsetY: 0,
                },
            </pre>
			<pre v-if="preIndex==2">
                grid: {
                    // grid左上角位置：默认80 60
                    x: 80,
                    y: 70,
                    // grid右下角位置：默认80 60
                    x2: 80,
                    y2: 80,
                },
            </pre>
			<pre v-if="preIndex==3">
                // 图例
                legend: {
                    show: true,
                    // -------------------- 位置 --------------------------
                    // 可以是number，百分比，或者'left', 'center', 'right'。
                    left: "left",
                    // 可以是number，百分比，或者'top', 'middle', 'bottom'。
                    top: "30",
                    // 可以是number，百分比。
                    right: "auto",
                    // 可以是number，百分比。
                    bottom: "auto",
                    // 排列方式，可选 'horizontal' 'vertical'
                    // ---------------------------------------------------
                    orient: "vertical",
                    // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。默认10
                    itemGap: 20,
                    // 是否可以通过点击图例改变系列的显示状态
                    selectedMode: true,
                    // data 会自动从当前系列中获取。一般会取自 series.name，如 饼图 and 漏斗图 等会取自 series.data 中的 name。
                    // data: ['苹果'],
                    // 背景和边框【是整体的，不是每项的】
                    backgroundColor: "#cab",
                    borderColor: "#abc",
                    borderWidth: 5
                },
            </pre>
			<pre v-if="preIndex==4">
                // 提示框
                tooltip: {
                    /*
                    触发类型 默认item                 
                        item:主要在散点图，饼图等无类目轴的图表中使用
                        axis:坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                        none
                    */
                    trigger: 'axis',
                    formatter: function(params) {
                        return params[0].name + '&lt;br/&gt;' +
                            params[0].seriesName + ' : ' + params[0].value + '&lt;br/&gt;' +
                            params[1].seriesName + ' : ' + (params[1].value + params[0].value);
                    }
                },
            </pre>
		</el-card>
	</section>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			preIndex: 2,
		}
	},
	mounted() { },
	methods: {}
};
</script>