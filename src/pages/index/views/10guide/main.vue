<style lang="less">
#driver-popover-item.beautiful-guide {
	margin-top: 10px;
	padding: 12px 15px;
	.driver-popover-title {
		font-size: 15px;
		font-weight: 400;
		margin-bottom: 15px;
	}
	.driver-popover-footer button {
		background-color: #fafafa;
		border-color: #ddd;
	}
}
</style>

<template>
	<section>
		使用<a href="https://github.com/kamranahmedse/driver.js" target="_blank" id="aaaaaa">driver.js </a>
		<el-button type="primary" @click.prevent.stop="showGuide">显示教程</el-button>
	</section>
</template>
<script>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

export default {
	data() {
		return {
			driver: null,
		}
	},
	mounted() {
		this.driver = new Driver({
			className: 'beautiful-guide',
			nextBtnText: '下一个',
			prevBtnText: '上一个',
			doneBtnText: '完成',
			closeBtnText: '关闭',

		});
		this.driver.defineSteps([
			{
				element: '#sidebarController',
				stageBackground: 'rgba(255,255,255,0.4)',
				popover: {
					title: '收缩、展开侧边栏',
				}
			},
			{
				element: '#userBox',
				stageBackground: 'rgba(255,255,255,0.4)',
				popover: {
					title: '您的用户信息',
					position: 'left'
				}
			},
		]);
	},
	methods: {
		showGuide() {
			this.driver.start();
		}
	}
};
</script>