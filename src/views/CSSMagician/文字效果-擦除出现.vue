<style lang="scss" scoped>
	$width:230px;
	$height:50px;
	@keyframes slideRight {
		0% {
			left: 0;
			width: 0;
		}
		25%, 27% {
			left: 0;
			width: $width;
		}
		50%, 100% {
			left: $width;
			width: 0;
		}
	}
	@keyframes fadeIn {
		0%, 50% {
			opacity: 0;
		}
		80%, 100% {
			opacity: 1;
		}
	}
	section {
		position: relative;
		height: $height;
		.txt {
			width: $width;
			text-align: center;
			color: lightcoral;
			height: $height;
			line-height: $height;
			letter-spacing: 3px;
			animation-name: fadeIn;
			animation-duration: 3s;
			animation-fill-mode: both;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
		}
		&::before {
			content: "";
			background: lightcoral;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			z-index: -1;
			animation-name: slideRight;
			animation-duration: 3s;
			animation-fill-mode: both;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
		}
	}
</style>
<template>
	<section>
		<!-- 因为 opacity 会作用于伪元素，所以把文字单独包起来，给这个span设置opacity的变化。这样就干扰不到伪元素啦！ -->
		<span class="txt">再见 2019 你好 2020 </span>
	</section>
</template>
<script>
	export default {
		data() {
			return {

			};
		},

	}
</script>