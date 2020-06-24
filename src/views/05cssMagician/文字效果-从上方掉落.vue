<style lang="less" scoped>
	@keyframes magic3 {
		0% {
			opacity: 0;
			top: -10px;
		}
		60% {
			top: 0;
		}
		100% {
			opacity: 1;
			top: 0;
		}
	}
	.container {
		height: 30px;
		letter-spacing: 5px;
		span {
			position: relative;
			color: white;
		}
	}
	.container:hover {
		span {
			animation-name: magic3;
			animation-duration: 0.5s;
			animation-fill-mode: both;
			animation-timing-function: linear;
			animation-iteration-count: 1;
		}
	}
</style>
<template>
	<section style="background:linear-gradient(70deg, #ee9ca7, #ffdde1);padding:10px;">
		<section class="container">
			<span v-for="(item,index) in list" :key="index" :style="getTxtDelay(index)">{{item}}</span>
		</section>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				msg: "（鼠标滑上来！）葡萄美酒夜光杯，欲饮琵琶马上催。醉卧沙场君莫笑，古来征战几人回？"
			};
		},
		computed: {
			list() {
				let arr = this.msg.split("");
				return arr;
			}
		},
		methods: {
			getTxtDelay(index) {
				return {
					"animation-delay": index * 0.02 + "s",
				};
			}
		}

	}
</script>