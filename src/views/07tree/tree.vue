<style lang="less">
	.x-tree {}
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
	<div :class="[level==0?'x-tree':'x-tree-node-children']">
		<div v-for="(item,index) in formattedData" :key="index" class="x-tree-node">
			<section class="x-tree-node-content" :style="paddingStyle">
				<span class="x-tree-node__expand-icon" :class="{'is-leaf':!item._hasChild,'expanded':item._showChild}" @click="expandNode(item,$event)">
					<i class="fa fa-caret-right"></i>
				</span>
				<input type="checkbox" class="x-tree-node__checkbox" v-model="item._checked">
				<span class="x-tree-node__label">{{item.name}}</span>
			</section>
			<x-tree v-if="item._hasChild" :data="item.child" :level="level+1" v-show="item._showChild"></x-tree>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'x-tree', // 自己调用自己，必须写name！！
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
		watch: {
			data: {
				immediate: true,
				handler() {
					this.getFormattedData();
				}
			}
		},
		data() {
			return {
				formattedData: []
			}
		},
		methods: {
			getFormattedData() {
				this.formattedData = this.data.map(item => {
					const data = this._.cloneDeep(item); // 因为不想动 props 传来的数据，所以 clone 一份
					data._hasChild = !!(item.child && item.child.length > 0); // 因为是新 clone 的数据，所以添加属性时不需要用 Vue.set()
					data._showChild = true;
					data._checked = false;
					return data;
				});
			},
			expandNode(nodeData, e) {
				if (!nodeData._hasChild) {
					return;
				}
				nodeData._showChild = !nodeData._showChild;
			}
		}
	};
</script>