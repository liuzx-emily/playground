<style scoped lang="less">
.box {
	box-sizing: border-box;
	// width: 300px;
	height: 100%;
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
		<gc-horizontal-scrolling :list="list" style="height:300px;">
			<template slot-scope="scope">
				<section class="box">
					<section class="box-title">{{scope.item.title}}</section>
					<section class="box-publisher">作者：{{scope.item.publisher}}</section>
					<section class="box-time">时间：{{xtools.formattingDate(scope.item.time)}}</section>
				</section>
			</template>
		</gc-horizontal-scrolling>
		<br>
		<gc-horizontal-scrolling :list="list" style="height:300px;">
			<template slot-scope="scope">
				<section class="box">
					<section class="box-title">{{scope.item.title}}</section>
					<section class="box-publisher">作者：{{scope.item.publisher}}</section>
					<section class="box-time">时间：{{xtools.formattingDate(scope.item.time)}}</section>
				</section>
			</template>
		</gc-horizontal-scrolling>
	</section>
</template>
<script>
import Vue from 'vue'
import gc_horizontal_scrolling from '~/components/horizontal-scrolling/main.vue';
Vue.use(gc_horizontal_scrolling);

export default {
	data() {
		return {
			list: []
		};
	},
	mounted() {
		setInterval(() => {
			this.list = [
				{ "title": "海军芜湖舰参加突尼斯海军成立60周年国际舰队检阅活动", "publisher": "小明", "time": "1549987200000", },
				{ "title": "守好祖国疆域一草一木（强军思想引领新征程）", "publisher": "陈余治", "time": "1549555200000", },
				{ "title": "加拿大司法部就孟晚舟案签发授权 华为：对此感到失望", publisher: "快科技", time: "1551628800000", },
				{ "title": "标题1 华为：对此感到失望", publisher: "快科技1", time: "1551628800000", },
				{ "title": "标题2 华为：对此感到失望", publisher: "快科技2", time: "1551628800000", },
				{ "title": "标题3 华为：对此感到失望", publisher: "快科技3", time: "1551628800000", },
				// { "title": "标题4 华为：对此感到失望", publisher: "快科技4", time: "1551628800000", },
				// { "title": "标题5 华为：对此感到失望", publisher: "快科技5", time: "1551628800000", },
				// { "title": "标题6 华为：对此感到失望", publisher: "快科技6", time: "1551628800000", },
				// { "title": "标题7 华为：对此感到失望", publisher: "快科技7", time: "1551628800000", },
			];
		}, 0)
	}
};
</script>