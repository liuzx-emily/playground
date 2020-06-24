<style lang="scss" scoped>
	section {
		font-size: 14px;
		code {
			color: #2196f3;
			font-weight: bold;
			margin: 0 5px;
		}
	}
</style>
<template>
	<section>
		<p>需求：左侧是导航，右边是内容。只打印右边的内容。</p>
		<h6>为什么不能用<code>@media print</code>？</h6>
		<p>前提1：某些元素，当外层宽度变化时，内部宽度变化是通过 js 来调整的。比如<code>el-table</code>，每个列的宽度是用 js 算出来的。echarts 图表，如果容器尺寸发生了变化，需要用 js 手动重绘。</p>
		<p>前提2：<code>@media print</code>是打印界面弹出后才生效，而此时页面中的js进程是阻塞的。</p>
		<p>结论1：如果@media print中设置的css改变了外层宽度，那么前提1中提到的元素，宽度是不会变化的。所以在打印的时候，不能让宽度发生变化。即打印前的容器宽度w1 === 打印时的容器宽度w2</p>
		<p>前提3：w1= 当前窗口宽度w3-当前侧边栏宽度w4。而w3和w4都是不能确定的。所以w1也是不能确定的。</p>
		<p>前提4：w2会根据纸张宽度走。可以通过设置纸张宽度<code>@page{size:宽 高}</code>来控制w2。</p>
		<p>结论2：虽然w2可以控制，但是w1不可控制。所以，单纯用css不能保证w1==w2</p>
		<p>结论：单纯用@media print不能实现效果！</p>
		<h6>那用什么？</h6>
		<p>每次打印前获取w1，将w2设置为w1。(注意要将右边内容的滚动释放到页面级别)</p>
		<p>其他：打印出的内容靠左，不居中。没找到原因</p>
		<p style="color:red;font-weight:bold;font-size:18px;">打印难控制，有兼容性问题。如果不是特殊要求，别用这个功能。</p>
		<input type="button" @click="do_print" value="打印">
	</section>
</template>
<script>
	export default {
		data() {
			return {};
		},
		watch: {},
		mounted() {},
		methods: {
			do_print(type) {
				// 获取 w1
				let width = document.querySelector('.demo-right').getBoundingClientRect().width;
				let oStyle = document.createElement("style");
				oStyle.setAttribute("id", "printstyle");
				oStyle.innerHTML = `
          .demo-left {
            display: none !important;
          }              
          .demo-right {
            display:block;
            width: ${width}px !important;
            margin:0 auto;
            height: auto !important;
            background:#eee;            
          }
          @page {
            size: ${width}px ${width * 1.4}px;
          }
      `;
				document.body.appendChild(oStyle);
				window.print();
				// 在print期间，一切进程是阻塞的。所以只有打印窗口关掉后，才会执行下面的内容
				document.getElementById('printstyle').remove();

			}
		}
	};
</script>