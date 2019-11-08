<style lang="less">
.x-tree-node__children {
}
.x-tree-node__expand-icon {
	vertical-align: top;
	cursor: pointer;
	color: #777;
	padding-right: 5px;
	margin-right: 5px;
	i.fa {
		font-size: 14px;
		transition: transform 0.2s;
	}
	&.is-leaf {
		color: transparent;
		cursor: default;
	}
	&.expanded {
		i.fa {
			transform: rotate(90deg);
		}
	}
}
.x-tree-node__checkbox {
	margin-right: 10px;
}
.x-tree-node__label {
	font-size: 14px;
	color: #555;
}
</style>

<template>
	<ul class="x-tree-node__children">
		<li v-for="(item,index) in formattedData" :key="index">
			<section class="x-tree-node__content" :style="paddingStyle">
				<span class="x-tree-node__expand-icon" :class="{
					'is-leaf':!item.hasChild,
					'expanded':item.showChild
					}
				" @click="expandNode(item,$event)">
					<i class="fa fa-caret-right"></i>
				</span>
				<el-checkbox class="x-tree-node__checkbox" v-model="item.checked"></el-checkbox>
				<span class="x-tree-node__label">{{item.name}} </span>
			</section>
			<submenu v-if="item.hasChild" :data="item.child" :level="level+1" v-show="item.showChild"></submenu>
		</li>
	</ul>
</template>
<script>
export default {
	// 自己调用自己，所以必须得写name！！！！
	name: 'submenu',
	props: {
		data: Array,
		level: {
			default: 0,
		}
	},
	computed: {
		paddingStyle() {
			return {
				'paddingLeft': this.level * 20 + 'px'
			};
		},
	},
	data() {
		return {
			formattedData: this.formattingData(),
		}
	},
	watch: {
		data() {
			this.formattedData = this.formattingData();
		}
	},
	mounted() { },
	methods: {
		// 格式化数据，添加属性showChild，计算属性hasChild
		formattingData() {
			// 必须要先深拷贝一下，不然就会出错，原因未知？？？？？
			let data = this._.cloneDeep(this.data);
			let formattedData = this._.map(data, (item) => {
				if (item.child && item.child.length > 0) {
					item.hasChild = true;
				} else {
					item.hasChild = false;
				}
				item.showChild = true;
				item.checked = false;
				return item;
			});
			return formattedData;
		},
		expandNode(nodeData, e) {
			if (!nodeData.hasChild) {
				return;
			}
			// const oUl = e.currentTarget.parentElement.nextElementSibling;
			// const height = oUl.getBoundingClientRect().height;
			// oUl.style.height = height + "px";
			nodeData.showChild = !nodeData.showChild;
		}
	}
};
</script>