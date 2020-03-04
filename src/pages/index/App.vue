<style lang="scss">
	.demo-left {
		display: inline-block;
		vertical-align: top;
		width: 300px;
		box-sizing: border-box;

		a {
			display: block;
			text-decoration: none;
			color: black;
			padding: 10px 0;
			border-bottom: 2px solid #eee;

			&.router-link-active {
				background: burlywood;
			}
		}
	}

	.demo-right {
		display: inline-block;
		width: calc(100% - 300px);
	}
	span {
		display: inline-block;
	}
</style>
<template>
	<div id="app">
		<nav class="demo-left">
			<router-link v-for="item in navList" :key="item.code" :to="item.code">{{item.name}}</router-link>
		</nav>
		<router-view :key="$route.fullPath" class="demo-right"></router-view>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navList: [
					{ name: "css 各种神奇效果", code: "/cssMagician" },
					{ name: "css 雪中的问候", code: "/greetingInSnow" },
					{ name: "canvas 云朵", code: "/canvasCloud" },
					{ name: "canvas 画板", code: "/painting" },
					{ name: "canvas 图片处理", code: "/photoEditing" },
					{ name: "echarts", code: "/echartsDemo" },
					{ name: "横向滚动", code: "/horizontalScrolling" },
					{ name: "打印局部", code: "/print" },
					{ name: "导出pdf", code: "/exportPDF" },
					{ name: "多级地址组件", code: "/manyLevelAddress" },
					{ name: "console（已经掌握了）", code: "/console" },
					{ name: "svg（未完成）", code: "/svg" },
					{ name: "日历组件（未完成）", code: "/calendar" },
					{ name: "引导教程（未完成）", code: "/guide" },
					{ name: "dragAndResize（未完成）", code: "/dragAndResize" },
				],
			};
		},
	};
</script>