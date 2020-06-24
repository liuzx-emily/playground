<style lang="scss">
	@keyframes charging {
		0% {
			height: 0;
			border-radius: 0 0 3px 3px;
			background: red;
			filter: drop-shadow(0 0 2px red);
		}
		20% {
			background: red;
			filter: drop-shadow(0 0 2px red);
		}
		21% {
			background: #34B458;
			filter: drop-shadow(0 0 2px #34B458);
		}
		95% {
			border-radius: 0;
		}
		100% {
			height: 100%;
			border-radius: 8px 8px 3px 3px;
			background: #34B458;
			filter: drop-shadow(0 0 2px #34B458);
		}
	}

	.battery {
		margin-top: 20px;
		width: 50px;
		height: 100px;
		border-radius: 8px 8px 3px 3px;
		filter: drop-shadow(0 0 2px #aaa);
		background: white;
		position: relative;
	}
	.battery::before {
		position: absolute;
		content: "";
		width: 20px;
		height: 8px;
		left: 50%;
		margin-left: -10px;
		top: -8px;
		background: #f5f5f5;
		border-radius: 2px 2px 0 0;
	}
	.battery::after {
		position: absolute;
		content: "";
		left: 0;
		right: 0;
		bottom: 0;
		animation-name: charging;
		animation-duration: 2s;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		// 来回交替进行
		animation-direction: alternate;
	}
	.battery:hover::after {
    // 动画是可以暂停的
		animation-play-state: paused;
	}
</style>
<template>
	<section>
		<div class="battery"></div>
	</section>
</template>
<script>
	export default {

	}
</script>