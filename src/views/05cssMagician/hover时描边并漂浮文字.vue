<style lang="scss" scoped>
	$height: 40px;
	$border-width:3px;
	$ease-in-duration:0.25s;
	$ease-out-duration:0.45s;
	$ease-in-exponential: cubic-bezier(0.95, 0.05, 0.795, 0.035);
	$ease-out-exponential: cubic-bezier(0.19, 1, 0.22, 1);
	button {
		width: 120px;
		margin-left: 20px;
		margin-top: 20px;
		background: none;
		border: none;
		position: relative;
		height: $height;
		line-height: $height;
		cursor: pointer;
		overflow: hidden;
		.btn-borders {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			&>* {
				position: absolute;
				background: #0d47a1;
			}
			.border-original {
				width: 100%;
				height: 100%;
				border: $border-width solid #00BCD4;
				box-sizing: border-box;
				background: none;
			}
			.border-top {
				top: 0;
				left: 0;
				width: 0;
				height: $border-width;
			}
			.border-right {
				right: 0;
				bottom: 0;
				width: $border-width;
				height: 0;
			}
			.border-bottom {
				bottom: 0;
				left: 0;
				width: 0;
				height: $border-width;
			}
			.border-left {
				left: 0;
				bottom: 0;
				width: $border-width;
				height: 0;
			}
			// unhover
			.border-left, .border-bottom {
				transition: $ease-out-duration $ease-out-exponential $ease-in-duration;
			}
			.border-top, .border-right {
				transition: $ease-in-duration $ease-in-exponential;
			}
		}
		.btn-text {
			transition: opacity 0.3s 0.2s; // unhover
		}
		&::after {
			content: attr(data-text);
			position: absolute;
			left: 0;
			right: 0;
			top: $height;
			line-height: $height;

			transition: top 0.5s, opacity 0.3s; // unhover
			opacity: 0;
		}
	}
	button:hover {
		.border-left, .border-right {
			height: $height;
		}
		.border-bottom, .border-top {
			width: 100%;
		}
		// hover
		.border-left, .border-bottom {
			transition: $ease-in-duration $ease-in-exponential;
		}
		.border-top, .border-right {
			transition: $ease-out-duration $ease-out-exponential $ease-in-duration;
		}
		.btn-text {
			opacity: 0;
			transition: opacity 0.3s;
		}
		&::after {
			top: 0;
			opacity: 1;
		}
	}
</style>
<template>
	<section>
		<button data-text="Just a Game">
			<div class="btn-borders">
				<div class="border-original"></div>
				<div class="border-top"></div>
				<div class="border-right"></div>
				<div class="border-bottom"></div>
				<div class="border-left"></div>
			</div>
			<span class="btn-text">Just a Game</span>
		</button>
	</section>
</template>

<script>
	export default {

	}
</script>

<style>

</style>