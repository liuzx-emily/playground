<style lang="less">
@keyframes wave {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}

#demo-wave {
	margin-top: 300px;
	margin-left: 300px;
	width: 200px;
	height: 200px;
	background: linear-gradient(0deg, #039be5, #bbdefb);
	position: relative;
	border-radius: 50%;
	overflow: hidden;
	.wave-lightblue {
		position: absolute;
		width: 500px;
		height: 500px;
		top: -350px;
		left: -150px;
		border-radius: 40%;
		background: white;
		background: rgba(255, 255, 255, 0.8);
		animation: wave 10s ease-in-out infinite;
	}
	.wave-white {
		position: absolute;
		width: 500px;
		height: 500px;
		top: -340px;
		left: -150px;
		border-radius: 40%;
		background: white;
		animation: wave 10s ease-in-out infinite;
	}
}
</style>
<template>
	<section>
		<section id="demo-wave">
			<section class="wave-lightblue" :style="{top:waveTop+'px'}"></section>
			<section class="wave-white" :style="{top:waveTop-8+'px'}"></section>
		</section>
		进度：{{percentage}}%
    <input type="range" v-model="percentage" min="0" max="100">
	</section>
</template>
<script>
export default {
	computed: {
		waveTop() {
			return -~~(300 + 2.2 * this.percentage);
		}
	},
	data() {
		return {
			percentage: 50,
		};
	}
}
</script>