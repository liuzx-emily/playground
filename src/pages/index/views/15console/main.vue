<style scoped></style>
<template>
	<section>
		<h6>很有用的！</h6>
		<p>1 条件断点： 先创建个正常的断点，然后"编辑断点"。</p>
		<p>2 DOM断点：右键目标元素 -> <code>Break On</code> -> 选择条件。</p>
		<p>3 如果希望重新发送 XHR 请求，但不想刷新页面或触发事件，可以在network中选中方法，右键<code>Replay XHR</code></p>
		<p>4 <code>$_</code>：上一个表达式的结果</p>
		<h6>还行吧</h6>
		<p>1 美化资源，尤其是压缩后的。在sources中，点击文件内容下面的大括号<code>pretty print</code></p>
		<p>2 在DOM元素界面，使用方向键上下可以切换元素，左右可以展开收起元素</p>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				timer: null,
			}
		},
	};
</script>