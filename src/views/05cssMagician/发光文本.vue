<style lang="scss" scoped>
	@keyframes show {
		0% {
			opacity: 0;
		}

		50% {
			text-shadow: 0 0 10px #000;
		}

		100% {
			opacity: 1;
		}

	}
	span {
		display: inline-block;
		min-width: 10px;
    min-height: 20px;
		animation-name: show;
		animation-duration: 1s;
		animation-fill-mode: both;
	}
</style>
<template>
	<section>
		<span v-for="(o,index) in msg" :key="index" :style="{'animation-delay':0.02*index+'s'}">{{o}}</span>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. A lacus vestibulum sed arcu."
			}
		}
	}
</script>

<style>

</style>