<style lang="less">
	.zx-editor {
		width: 800px;
		border: 1px solid #ccc;
		margin: 0 auto;
		.content-wrap {
			height: 300px;
			overflow: auto;
			.content {
				overflow: auto; // 创建 BFC，防止 margin collapse
				min-height: 100%;
				h1, h2, h3, h4, h5, h6 {
					margin: 10px 0;
				}
				h1 {
					font-size: 30px;
				}
				a {
					text-decoration: underline;
					color: #2196f3;
					cursor: pointer;
				}
			}
		}
	}
</style>
<template>
	<section>
		<div class="zx-editor">
			<section class="toolbar">
				<!-- 按钮只能用 button，用其他标签会导致失去焦点，执行命令无效 -->
				<button type="button" v-for="(item,index) in toolbar" :key="index" @click="handleCommand(item)">{{item.label}}</button>
			</section>
			<section class="content-wrap">
				<section contenteditable="true" class="content">
					<h1 style="text-align: center;">今天天气不错</h1>
					<div>处处鸟语花香</div>
				</section>
			</section>
		</div>
	</section>
</template>

<script>
	import { toolbar } from './data'
	export default {
		data() {
			return {
				toolbar,
			}
		},
		methods: {
			handleCommand(command) {
				if (command.customedCb) {
					command.customedCb();
				} else {
					document.execCommand(command.key, false, command.args || null);
				}
			},
		}
	}
</script>

<style>

</style>