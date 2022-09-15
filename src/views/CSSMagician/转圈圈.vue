<style lang="scss" scoped>
	@keyframes whirl {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.super-cool-whirl {
		width: 100px;
		height: 100px;
		position: relative;
    font-size: 12px;
		&::before, &::after {
			position: absolute;
			border-radius: 50%;
			content: "";
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			box-shadow: -3px -5px 0px #00bcd4 inset;

			animation-name: whirl;
			animation-duration: 1.5s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
		&::before {
			filter: blur(1px);
		}
		&::after {
			filter: blur(4px);
		}
	}
</style>
<template>
	<section class="super-cool-whirl">
    两个叠加，设置不同的 blur ，特别酷
  </section>
</template>

<script>
	export default {

	}
</script>

<style>

</style>