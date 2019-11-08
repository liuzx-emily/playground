<style scoped lang="less">
.vdr.active {
	outline: 5px solid red;
}
</style>
<template>
	<vdr :active.sync="data.active" :w="data.width" :h="data.height" :x="data.x" :y="data.y" :parent="true" :isConflictCheck="false" @activated="onActivated" @deactivated="onDeactivated" @resizestop="onResizestop" @mousedown.native.stop @dragstop="onDragstop" :preventDeactivation="true" :id="containerId">
		<!-- 内容 -->
		<section v-html="data.content"></section>
		<!-- 子内容 -->
		<magicComponent v-for="(item,index) in data.children" :key="index" :data="item"></magicComponent>
	</vdr>  
</template>
<script>
import vdr from '../vdr/components/vue-draggable-resizable.vue'
import '../vdr/components/vue-draggable-resizable.css'
// import vdr from 'vue-draggable-resizable-gorkys'
// import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import { render_background, render_border, } from './utils.js'
export default {
	name: "magicComponent",
	components: { vdr, },
	inject: ["treeStore"],
	props: ["data"],
	created() {
		this.data.vueInstance = this;
	},
	watch: {
		"data.active"(active) {
			if (active) {
				this.treeStore.setCurrentKey(this.data.id);
			}
		}
	},
	data() {
		return {
			containerId: "container-" + this.xtools.randomId(),
		}
	},
	computed: {
		containerEle() {
			return document.querySelector('#' + this.containerId);
		},
	},
	mounted() {
		render_background(this);
		render_border(this);
	},
	methods: {
		onActivated() {
			this.data.active = true;
		},
		onDeactivated() {
			this.data.active = false;
		},
		onResizestop(left, top, width, height) {
      console.log(this.data);
			this.data.x = left;
			this.data.y = top;
			this.data.width = width;
			this.data.height = height;
		},
		onDragstop(left, top) {
			this.data.x = left;
			this.data.y = top;
		},
	}
};
</script>