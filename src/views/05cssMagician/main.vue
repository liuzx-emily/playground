<style lang="less" scoped>
	.flex-box {
		display: flex;
		flex-wrap: wrap;
	}
</style>
<template>
	<section>
		<section class="flex-box">
			<bouncing3DText />
			<oneElementCheckedPattern />
			<beautifyCheckbox />
			<waveInBall />
			<flareBtn />
			<pulseHalo />
			<snow />
			<textExpandFromTheCenter />
			<textDropFromAbove />
			<textEraseEmerging />
			<roundedSlidingNav />
			<charging />
			<buttonHoverBorderStrokeWithFloatText />
			<superCoolWhirl />
			<glowingText />
			<neonText />
		</section>
	</section>
</template>
<script>
	import oneElementCheckedPattern from './一个元素实现格纹.vue'
	import beautifyCheckbox from './美化checkbox.vue'
	import waveInBall from './球中波浪.vue'
	import flareBtn from './炫光按钮.vue'
	import pulseHalo from './脉冲光环.vue'
	import snow from './雪景.vue'
	import textExpandFromTheCenter from './文字效果-从中间展开.vue'
	import textDropFromAbove from './文字效果-从上方掉落.vue'
	import textEraseEmerging from './文字效果-擦除出现.vue'
	import roundedSlidingNav from './圆角滑动导航.vue'
	import charging from './充电.vue'
	import buttonHoverBorderStrokeWithFloatText from './hover时描边并漂浮文字.vue'
	import superCoolWhirl from './转圈圈.vue'
	import glowingText from './发光文本.vue'
	import neonText from './霓虹文本.vue'
	import bouncing3DText from './伪3D文本.vue'
	export default {
		components: {
			oneElementCheckedPattern,
			beautifyCheckbox,
			waveInBall,
			flareBtn,
			snow,
			pulseHalo,
			textExpandFromTheCenter,
			textDropFromAbove,
			textEraseEmerging,
			roundedSlidingNav,
			charging,
			buttonHoverBorderStrokeWithFloatText,
			superCoolWhirl,
			glowingText,
			neonText,
			bouncing3DText,
		}
	}
</script>