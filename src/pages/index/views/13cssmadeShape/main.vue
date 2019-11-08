<style scoped lang="less">
@w: 100px;
@w1: 10px;
@w2: 8px;
@w3: 12px;
.demo1 {
	width: @w;
	height: @w;
	box-sizing: border-box;
	background: #ff7576;
	border: @w1 dashed #f9efe4;
	position: relative;
	border-radius: 5px;
}
.demo1:before {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: #f7fdff;
	border: @w2 dashed #c8e6c9;
}
.demo1:after {
	content: "";
	position: absolute;
	left: @w2;
	right: @w2;
	top: @w2;
	bottom: @w2;
	background: #76ccf3;
	border: @w3 dashed #fbf9f3;
}
</style>
<template>
	<section class="demo1"></section>
</template>
<script>
export default {

};
</script>