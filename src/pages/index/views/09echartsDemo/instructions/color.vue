<style scoped>
code {
	color: #2196f3;
	font-weight: bold;
	font-size: 12px;
}
.color {
	width: 54px;
	height: 20px;
	margin: 0 7px 0 7px;
}
</style>
<template>
	<section>
		<el-card>
			<section slot="header">调色盘</section>
			<!-- card body -->
			<pre style="white-space:nowrap;">
	        	colorArr:<code>{{this.colorArr}}</code>,
	    	</pre>
			<section style="margin-left:70px;">
				<span v-for="color in colorArr" :key="color" :style="{background:color}" class="color"></span>
			</section>
		</el-card>
	</section>
</template>
<script>
export default {
	data() {
		return {
			colorArr: ["#ff7576", "#ffba75", "#75bbff", "#4ce297", "#01a6a6", "#fbc533", "#f89046", "#aad571", "#33cca1", "#fc7e4b", "#3585f6", "#9575cd", "#FB8C00", "#D84315", "#607d8b", "#e6a23c", "#f56c6c", "#795548", "#9d8eb7", "#F9A825"],
		}
	}
};
</script>