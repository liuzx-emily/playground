<style scoped lang="less">
	.box {
		box-sizing: border-box;
		width: 300px;
		height: 80px;
		padding: 15px;
		border: 1px solid #eee;
		background: #acb;
		color: white;
		position: relative;
		.box-title {
			color: #098;
			font-size: 16px;
			line-height: 1.8;
		}
		.box-publisher {
			color: #fff;
			font-size: 14px;
			position: absolute;
			bottom: 50px;
		}
		.box-time {
			color: #fff;
			font-size: 14px;
			position: absolute;
			bottom: 20px;
		}
	}
</style>
<template>
	<section>
		<a href="https://www.swiper.com.cn/api/index.html">中文API</a>
		<horizontalScrolling :list="list">
			<template slot-scope="scope">
				<section class="box">{{scope.item}} </section>
			</template>
		</horizontalScrolling>
	</section>
</template>
<script>
	import Vue from 'vue'
	import horizontalScrolling from './horizontal-scrolling.vue';

	export default {
		components: { horizontalScrolling },
		data() {
			return {
				list: []
			};
		},
		mounted() {
			setInterval(() => {
				this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
			}, 1000)
		}
	};
</script>