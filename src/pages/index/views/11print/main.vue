<template>
	<section>
		<el-card class="smallCard">
			<div slot="header">
				为什么不能用<code>@media print</code>？
			</div>
			<!-- card body -->
			<p>要点1：某些元素，当外层宽度变化时，内部宽度变化是通过js来调整的。比如：<span class="highlight">element的table组件</span>，每个列的宽度是用js算出来的。<span class="highlight">echarts图表</span>，如果容器尺寸发生了变化，需要用js手动重绘。</p>
			<p>要点2：@media print是打印界面弹出后才生效，而此时页面中的js进程是<span class="highlight">阻塞</span>的。</p>
			<p>结论1：如果@media print中设置的css改变了外层宽度，那么要点1中提到的元素，宽度是不会变化的。所以<span class="highlight">在打印的时候，不能让宽度发生变化。</span>即<span class="highlight">打印前的容器宽度w1 == 打印时的容器宽度w2</span></p>
			<hr>
			<p>要点3：w1= 当前窗口宽度w3-当前侧边栏宽度w4。而w3和w4都是不能确定的。所以w1也是不能确定的。</p>
			<p>要点4：w2会根据纸张宽度走。可以通过设置纸张宽度<code>@page{size:宽 高}</code>来控制w2。</p>
			<p>结论2：虽然w2可以控制，但是w1不可控制。所以，单纯用css不能保证w1==w2</p>
			<p>结论：单纯用@media print不能实现效果！</p>
		</el-card>
		<el-card class="smallCard">
			<div slot="header">
				那用什么？
			</div>
			<!-- card body -->
			<p>思路：虽然用@media print无法保证w1==w2。但是如果能用其他方式实现w1==w2，那么是最简单的了，因为不需要处理宽度变化。</p>
			<p>方法：<span class="highlight">每次打印前获取w1，将w2设置为w1。</span></p>
			<p>需要注意的点：将<code>#columnContainer</code>的限高去掉，将滚动释放到页面级别</p>
			<p>其他：打印出的内容靠左，不居中。没找到原因</p>
			<p style="color:red;font-weight:bold;font-size:18px;">打印是真难控制，而且可能有兼容性问题。如果不是特殊要求，别用这个功能。</p>
		</el-card>
		<el-button type="success" class="size-common" @click="do_print">打印</el-button>
		<section style="outline:2px solid black">

			<!-- <view2></view2> -->
		</section>
	</section>
</template>
<script>
// import view2 from '~/pages/index/views/03pluginDemo/01echarts/main.vue'
export default {
	// components: {  view2 },
	data() {
		return {};
	},
	watch: {},
	mounted() { },
	methods: {

		do_print(type) {
			let width = document.querySelector('#mainContentWrap').getBoundingClientRect().width;
			console.log(width);
			let oStyle = document.createElement("style");
			oStyle.setAttribute("id", "printstyle");
			oStyle.innerHTML = `
                #topbar {
                    display: none;
                }
                #columnContainer {
                    width: ${width}px !important;
                    height: auto !important;                    
                }
                #sidebarWrap {
                    display: none !important;
                }
                #mainContentWrap {
                    margin: 0 !important;               
                }                
                @page {
                    size: ${width}px ${width * 1.4}px;
                }
            `;
			document.body.appendChild(oStyle);
			// 开个定时器，等一下上面的操作执行完。不然一旦print，所有进程会被阻塞
			setTimeout(() => {
				window.print();
				// 在print期间，一切进程是阻塞的。所以只有打印窗口关掉后，才会执行下面的内容
				document.getElementById('printstyle').remove();
			}, 50);
		}
	}
};
</script>
<!-- table {
    width: ${width}px !important;                   
}
tr {
    width: ${width}px !important;               
} -->