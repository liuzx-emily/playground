<template>
	<section>
		<p>打印的元素不能选择限高，内部出滚动条的。</p>
		<input type="button" @click="do_exportPDF" value="导出pdf">
	</section>
</template>
<script>
	import exportPDF from './exportPDF'
	export default {
		methods: {
			do_exportPDF() {
				let obj = document.querySelector('.demo-right');
				let fileName = "哈哈";
				exportPDF(obj, fileName);
			}
		}
	};
</script>