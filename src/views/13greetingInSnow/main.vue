<style lang="scss" scoped>
	#snow-with-greeting {
		position: fixed;
		top: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
		font-family: Raleway;
		// background: lightcoral;
		// background: radial-gradient(circle, #f6b0b0 0%, lightcoral 100%);
		background: radial-gradient(circle, #222 0%, #000 100%);
	}
	@function randomInRange($min, $max) {
		@return $min+random($max - $min);
	}
	@for $i from 1 through 200 {
		$opacity: random(100)*0.01;
		$scale: randomInRange(20, 100)*0.01;
		$x-start: random(100);
		$x-offset: randomInRange(-5, 5);
		@keyframes snow-fall-#{$i} {
			0% {
				left: $x-start * 1vw;
				top: 0;
			}
			50% {
				left: ($x-start + $x-offset) * 1vw;
				top: 50vh;
			}
			100% {
				left: ($x-start + $x-offset / 2) * 1vw;
				top: 100vh;
			}
		}
		.snow:nth-child(#{$i}) {
			animation-name: snow-fall-#{$i};
			animation-delay: -$i * 0.1s;
			opacity: $opacity;
			transform: scale($scale);
		}
	}
	.snow {
		position: fixed;
		width: 20px;
		height: 20px;
		// background: white;
		background: lightcoral;
		animation-duration: 15s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		border-radius: 50%;
	}
</style>
<style lang="scss" scoped>
	@keyframes txt-fadeIn {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
	@keyframes heart-slideLeft {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
			left: 5%;
		}
	}
	@keyframes heart-slideRight {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
			left: 90%;
		}
	}
	h1 {
		position: fixed;
		top: 50%;
		left: 3%;
		right: 0;
		text-align: center;
		font-size: 180px;
		margin-top: -150px;
		letter-spacing: 30px;
		// color: white;
		color: #ffd7d7;
		&::before, &::after {
			content: "♥";
			position: absolute;
			top: 0;
			animation-duration: 1s;
			animation-timing-function: linear;
			animation-fill-mode: both;
			left: 50%;
			margin-left: -45px;
		}
		&::before {
			animation-name: heart-slideLeft;
		}
		&::after {
			animation-name: heart-slideRight;
		}
	}
	h1>span {
		animation-name: txt-fadeIn;
		animation-duration: 0.8s;
		animation-timing-function: linear;
		animation-fill-mode: both;
		white-space: pre;
	}
</style>
<template>
	<div id="snow-with-greeting">
		<!-- 下雪 -->
		<span class="snow" v-for="item in 200" :key="item"></span>
		<!-- 你好 2010 -->
		<h1>
			<span v-for="(item,index) in list" :key="index" :style="getAnimationDelay(index)">{{item}}</span>
		</h1>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: "Hello 2020"
			};
		},
		computed: {
			list() {
				return this.msg.split("");
			}
		},
		methods: {
			getAnimationDelay(index) {
				let middle = ~~(this.list.length / 2);
				return {
					"animation-delay": 0.1 + 0.1 * Math.abs(middle - index) + "s",
				};
			}
		}
	};
</script>