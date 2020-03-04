<style lang="less" scoped>
	@keyframes magic {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes slideLeft {
		0% {
			left: 248px;
			opacity: 0.5;
		}
		90%, 100% {
			left: -90px;
		}
	}
	@keyframes slideRight {
		0% {
			right: 296px;
			opacity: 0.5;
		}
		90%, 100% {
			right: -50px;
		}
	}
	section.container {
		margin: 0 auto;
		position: relative;
		text-align: center;
		color: white;
		font-size: 40px;
		&::before, &::after {
			display: inline-block;
			content: "♥";
			position: absolute;
			top: 0px;
			animation-duration: 2s;
			animation-timing-function: ease-out;
			// 动画效果 前后填充！
			animation-fill-mode: both;
			animation-iteration-count: infinite;
		}
		&::before {
			animation-name: slideLeft;
		}
		&::after {
			animation-name: slideRight;
		}
		span {
			animation-name: magic;
			animation-duration: 2s;
			animation-iteration-count: infinite;
			// 动画开始前(delay阶段)、动画结束后，分别填充动画开始、结束帧的效果！
			animation-fill-mode: both;
			letter-spacing: 5px;
			// 让空格能显示出来！！
			white-space: pre;
		}
	}
</style>
<template>
	<section style="background:lightcoral;padding:5px 150px;">
		<section class="container">
			<span v-for="(item,index) in list" :key="index" :style="getTxtDelay(item)">{{item.value}}</span>
		</section>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				msg: "再见，2019  你好，2020。"
			};
		},
		computed: {
			list() {
				let middle = ~~(this.msg.length / 2);
				let arr = this.msg.split("").map((value, index) => {
					return {
						value: value,
						delay: Math.abs(index - middle)
					};
				});
				return arr;
			},
		},
		methods: {
			getTxtDelay(data) {
				return {
					"animation-delay": data.delay * 0.1 + "s",
				};
			},
			// get
		}

	}
</script>