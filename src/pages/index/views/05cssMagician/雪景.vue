<style lang="scss" scoped>
	$width:500px;
	$height:200px;
	.container {
		width: $width;
		height: $height;
		background: radial-gradient(ellipse at bottom, #000204 0%, #4c4c4c 100%);
		overflow: hidden;
	}

	@function random_range($min, $max) {
		$rand: random();
		$random_range: $min + floor($rand * (($max - $min) + 1));
		@return $random_range;
	}

	.container>span {
		$total: 100;
		position: absolute;
		width: 20px;
		height: 20px;
		background: lightcoral;
		border-radius: 50%;

		@for $i from 1 through $total {
			$random-x-begin: random(100) * 0.01 * $width;
			$random-x-offset: random_range(-100, 100) * 0.001 * $width;
			$random-x-yoyo: $random-x-begin + $random-x-offset;
			$random-x-end: $random-x-begin + ($random-x-offset / 2);
			$random-yoyo-time: random(100) * 0.01;
			$random-yoyo-y: $random-yoyo-time * $height;
			$random-scale: random(100) * 0.01;
			$fall-duration: random_range(10, 30) * 1s;
			$fall-delay: random(30) * -1s;

			&:nth-child(#{$i}) {
				opacity: random(10000) * 0.0001;
				transform: translate($random-x-begin, -10px) scale($random-scale);
				animation: fall-#{$i} $fall-duration $fall-delay linear infinite both;
			}

			@keyframes fall-#{$i} {
				#{percentage($random-yoyo-time)} {
					transform: translate($random-x-yoyo, $random-yoyo-y) scale($random-scale);
				}

				to {
					// 必须要加上scale
					transform: translate($random-x-end, $height) scale($random-scale);
				}
			}
		}
	}
</style>
<template>
	<section class="container">
		<span v-for="i in 100" :key="i" class="snow"></span>
	</section>
</template>
<script>
	export default {

	}
</script>