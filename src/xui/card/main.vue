<style lang="less">
.x-card {
	margin: 10px 0;
	.x-card-header {
		font-size: 14px;
		background: #f5f7fa;
		color: #409eff;
		border-left: 3px solid #409eff;
		padding: 10px;
		//
		background: linear-gradient(0deg, #ccc 0%, #fff 60%, #eee 100%);
		box-shadow: 2px 2px 3px #848484;
	}
	.x-card-body {
		padding: 10px 0;
		//
		border: 1px solid #e2e2e2;
		border-top: none;
		box-shadow: 2px 1px 2px #afafaf;
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
	}
}
</style>
<template>
	<section class="x-card">
		<section class="x-card-header">
			<slot name="header">{{title}}</slot>
		</section>
		<section class="x-card-body">
			<slot></slot>
		</section>
	</section>
</template>
<script>
export default {
	install(Vue) {
		Vue.component("x-card", this);
	},
	props: {
		title: {}
	},
	data() {
		return {};
	}
}
</script>