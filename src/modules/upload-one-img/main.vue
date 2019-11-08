<template>
	<div v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)" class="uploadOneImg-container">
		<!-- 上传 -->
		<el-upload action="用不到，随便填" :http-request="doUploadAttachment" :show-file-list="false" :multiple="false" class="uploadOneImg-container-uploadBtn" v-if="!readonly">
			<el-button type="primary" slot="trigger" icon="el-icon-upload">
				<template v-if="imgUrl">更换</template>
				<template v-else>上传</template>
			</el-button>
		</el-upload>
		<!-- 下载 -->
		<template v-if="imgUrl">
			<button type="button" class="el-button uploadOneImg-container-downloadBtn" @click="do_download">
				<i class="el-icon-download"></i><span>下载</span>
			</button>
			<el-button type="danger" class="uploadOneImg-container-deleteBtn" icon="el-icon-delete" v-if="!readonly && canBeDeleted" @click="do_delete">删除</el-button>
			<img :src="imgUrl" :style="imgStyle">
		</template>
	</div>
</template>
<script>
import './main.less'
export default {
	install(Vue) {
		Vue.component("gm-upload-one-img", this);
	},
	props: {
		fimgUrl: {},
		readonly: {
			type: Boolean,
			default: false
		},
		// 最大体积（MB） 
		maxSize: {
			default: 20
		},
		canBeDeleted: {
			default: true
		},
		width: {
			default: "150px"
		},
		height: {
			default: "auto"
		},
	},
	computed: {
		imgStyle() {
			return {
				width: this.width,
				height: this.height,
			}
		}
	},
	watch: {
		fimgUrl: {
			immediate: true,
			handler(value) {
				this.imgUrl = value;
			},
		},
		imgUrl(value) {
			this.$emit("update:fimgUrl", value);
		},
	},
	components: {},
	data() {
		return {
			loading: false,
			imgUrl: "",
		};
	},
	methods: {
		// -------------------------------- 上传图片 --------------------------------
		doUploadAttachment(param) {
			const file = param.file;
			// 类型验证
			if (file.type.indexOf("image") == -1) {
				this.$message({
					message: `请上传图片！`,
					type: 'error'
				});
				return;
			}
			// 大小验证
			if (file.size > this.maxSize * 1024 * 1024) {
				this.$message({
					message: `图片大小不允许超过${this.maxSize}MB！`,
					type: 'error'
				});
				return;
			}
			this.loading = true;
			var data = new FormData();
			data.append("file", file);
			data.append("fileName", file.name);
			this.xaxios({
				method: 'post',
				url: "/api/upload.do",
				data: data
			}).then(res => {
				this.imgUrl = "/api/download.do?id=" + res.data;
				this.$message({
					type: "success",
					message: "图片上传成功！"
				});
				this.loading = false;
			}).catch(error => { this.loading = false; });
		},
		do_download() {
			window.location.href = this.imgUrl;
		},
		do_delete() {
			this.imgUrl = "";
		}
	}
};
</script>