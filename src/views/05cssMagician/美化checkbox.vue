<style lang="scss" scoped>
	label {
		display: flex;
		font-size: 12px;
		margin: 5px 0;
		align-items: center;
		input[type="checkbox"] {
			width: 0;
			height: 0;
			margin: 0;
			padding: 0;
			position: relative;
			&::after {
				content: "";
				position: absolute;
				left: 0;
				top: -7px;
				width: 10px;
				height: 10px;
				border: 2px solid #FF5722;
			}
		}
		input[type="checkbox"]:checked::after {
			background: #009688;
			border-color: #80cbc4;
		}
		span {
			vertical-align: top;
			margin-left: 20px;
			position: relative;
			cursor: pointer;
			&::before {
				content: "";
				position: absolute;
				z-index: -1;
				top: 0;
				left: 0;
				width: 0;
				height: 100%;
				background: #ddd;
				transition: width 0.5s;
			}
		}
		// +是紧挨着，~可以不紧挨着
		input[type="checkbox"]:checked+span {
			&::before {
				width: 100%;
			}
		}
	}
</style>
<template>
	<section>
		<!-- 点击文字时，勾选 checkbox。两种方法：
    1 <label for="checkbox的id">文字</label>
    2 把文字和 checkbox 都放在 label 内
     -->
		<label v-for="item in list" :key="item.id">
			<input type="checkbox" v-model="item.checked">
			<span>{{item.label}}</span>
		</label>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					{ id: 1, label: "flex布局下margin:auto的神奇用法", checked: false },
					{ id: 2, label: "flex布局，当flex-grow之和小于1时，只能按比例分配部分剩余空间，而不是全部", checked: true },
					{ id: 3, label: "padding-top设置%，是相对于宽度的。", checked: false },
					{ id: 4, label: "animation-direction:alternate;交替运行动画", checked: false },
					{ id: 5, label: "background-position百分比的正确理解方式：图片自身的百分比位置与容器同样的百分比位置重合", checked: false },
					{ id: 6, label: "background-repeat新属性值：round和space。前者表示凑个整，后者表示留点缝", checked: false },
				]
			}
		}
	}
</script>