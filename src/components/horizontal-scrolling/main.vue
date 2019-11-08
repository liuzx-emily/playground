<style lang="less" scoped>
.container {
	position: relative;
}
.swiper-container {
	margin-left: 50px;
	margin-right: 50px;
	height: 100%;
}
</style>
<template>
	<section class="container">
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- noSwiping设为true时，可以在slide上（或其他元素）增加类名'swiper-no-swiping'，使该slide无法拖动 -->
			<swiper-slide v-for="(item,index) in list" :key="index" class="swiper-no-swiping">
				<slot :item="item"></slot>
			</swiper-slide>
			<!-- <div class="swiper-pagination" slot="pagination"></div> -->
		</swiper>
		<div :id="'swiper-button-prev-'+randomNum" class="swiper-button-prev"></div>
		<div :id="'swiper-button-next-'+randomNum" class="swiper-button-next"></div>
	</section>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	install(Vue) {
		Vue.component("gc-horizontal-scrolling", this);
	},
	components: {
		swiper,
		swiperSlide
	},
	props: {
		list: {
			type: Array,
			default: () => []
		},
		autoplay: {
			type: Boolean,
			default: false
		}
	},
	computed: {},
	data() {
		let randomNum = this.xtools.randomId();
		return {
			randomNum: randomNum,
			swiperOption: {
				// ----------------
				// noSwiping设为true时，可以在slide上（或其他元素）增加类名'swiper-no-swiping'，使该slide无法拖动
				noSwiping: true,
				// 切换速度 ms
				speed: 1500,
				// 每张之间的间隔距离 px
				spaceBetween: 20,
				// autoplay: false,
				autoplay: {
					delay: 3000,
				},
				// 一次看几张（设置了之后，会根据容器宽度、间隔来自动计算每张的宽度，很方便！）
				slidesPerView: 4,
				navigation: {
					nextEl: `#swiper-button-next-${randomNum}`,
					prevEl: `#swiper-button-prev-${randomNum}`,
				},
			}
		}
	},
	mounted() {
		// setTimeout(() => {
		//     this.swiperOption.autoplay.delay = 500;
		//     this.$refs.mySwiper.swiper.update();
		// }, 2000);
	}
};
</script>