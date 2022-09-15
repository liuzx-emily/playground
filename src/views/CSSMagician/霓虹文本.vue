<style lang="scss" scoped>
	@keyframes neon {
		0% {
			text-shadow: 0 0 5px red;
		}
		40% {
			text-shadow: 0 0 5px yellow;
		}
		60% {
			text-shadow: 0 0 5px blue;
		}
		80% {
			text-shadow: 0 0 5px purple;
		}
		100% {
			text-shadow: 0 0 5px red;
		}
	}
	.neon-text {
		animation-name: neon;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
</style>
<template>
	<section class="neon-text">Lorem ipsum dolor sit amet</section>
</template>

<script>
	export default {

	}
</script>

<style>

</style>