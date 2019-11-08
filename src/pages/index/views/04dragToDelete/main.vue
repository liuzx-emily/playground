<style lang="less" scoped>
div {
	display: inline-block;
	width: 200px;
	height: 150px;
	background: lavender;
	vertical-align: top;
	margin: 0 5px;
}
i.fa {
	font-size: 50px;
	padding: 15px 20px;
	border: 2px solid #03a9f4;
	color: #03a9f4;
}
</style>

<template>
	<section>
		<section class="beDragged">
			<div draggable v-for="i in 5" :key="i" :data-index="i">hello{{i}}</div>
		</section>
		<i class="fa fa-trash" id="trashBin"></i>
		<hr>
		<i class="fa fa-upload" id="uploadBox"></i>
	</section>
</template>
<script>
// 被拖拽的5个div的外层容器
let containerEle;
export default {
	data() {
		return {}
	},
	mounted() {
		this.init_dragToDelete();
		this.init_dragToUpload();
	},
	methods: {
		init_dragToDelete() {
			containerEle = document.querySelector(".beDragged");
			// 删除-被拖走的元素
			containerEle.addEventListener("dragstart", e => {
				e.dataTransfer.setData("eleIndex", e.target.dataset.index);
			});
			containerEle.addEventListener("dragend", e => {

			});
			// 删除-目的地元素
			const trashBinELe = document.querySelector("#trashBin");
			trashBinELe.addEventListener("dragover", e => {
				e.preventDefault();
				trashBinELe.innerHTML = "松开删除";
			});
			trashBinELe.addEventListener("dragleave", e => {
				trashBinELe.innerHTML = "";
			});
			trashBinELe.addEventListener("drop", e => {
				e.preventDefault();
				trashBinELe.innerHTML = "";
				const eleIndex = e.dataTransfer.getData("eleIndex");
				const ele = containerEle.querySelector(`[data-index="${eleIndex}"]`);
				containerEle.removeChild(ele);
			});
		},
		init_dragToUpload() {
			const uploadBoxEle = document.querySelector("#uploadBox");
			uploadBoxEle.addEventListener("dragover", e => {
				e.preventDefault();
				uploadBoxEle.innerHTML = "松手上传";
			});
			uploadBoxEle.addEventListener("dragleave", e => {
				uploadBoxEle.innerHTML = "";
			});
			uploadBoxEle.addEventListener("drop", e => {
				e.preventDefault();
				uploadBoxEle.innerHTML = "上传啦~";
				Array.from(e.dataTransfer.files).forEach(file => {
					if (!file.type.includes("image")) {
						return;
					}
					var fr = new FileReader();
					fr.onload = () => {
						var oImg = document.createElement('img');
						oImg.src = fr.result;
						oImg.style.width = '80px';
						this.$el.appendChild(oImg);
					};
					fr.readAsDataURL(file);
				});
			});
		},
	},
}
</script>

