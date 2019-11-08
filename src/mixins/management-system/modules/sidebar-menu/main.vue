<template>
	<!-- 如果level从1开始，那么最高级菜单，也有padding-left。 -->
	<submenu :data="data" :level="1" />
</template>
<script>
import submenu from './submenu.vue'
import './main.less'
export default {
	install(Vue) {
		Vue.component("sidebar-menu", this);
	},
	components: { submenu },
	props: {
		data: {
			type: Array,
			default: () => { return []; }
		},
	},
};
</script>