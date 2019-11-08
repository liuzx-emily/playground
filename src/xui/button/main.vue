<template>
	<button type="button" class="x-button" :class="styleClass" @click="handleClick">
		<i class="fa" :class="'fa-'+icon" v-if="icon"></i>
		<span class="x-button-content" v-if="$slots.default">
			<slot></slot>
		</span>
	</button>
</template>
<script>
import './main.less'
export default {
	install(Vue) {
		Vue.component("x-button", this);
	},
	props: {
		icon: {
			default: undefined,
		},
		color: {
			default: "blue"
		},
		size: {
			default: "common"
		},
		pretty: {
			type: Boolean,
			default: true,
		}
	},
	computed: {
		styleClass() {
			return ["color-" + (this.pretty ? "pretty-" : "") + this.color, "size-" + this.size];
		}
	},
	methods: {

		handleClick(evt) {
			this.$emit('click', evt);
		}
	}
};
</script>