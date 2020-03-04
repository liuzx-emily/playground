<style lang="scss" scoped>
	section {
		width: 150px;
    height: 30px; 
		text-align: center;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border: 2px solid #FFAB91;
		box-sizing: border-box;
		&::before {
			position: absolute;
			z-index: -1;
			content: "";
			background: linear-gradient(30deg, white 0, #f16e45 50%, white 100%);
			width: 100%;
			height: 100%;
			transition: 0.5s;
			top: 0;
			left: -100%;
		}
	}
	section:hover {
		box-shadow: 0 0 5px #FFAB91;
		&::before {
			left: 100%;
		}
	}
</style>
<template>
	<section>炫光按钮</section>
</template>
<script>
	export default {}
</script>