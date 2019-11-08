<template>
	<el-date-picker v-model="year" type="year" :picker-options="yearPickerOption" :style="pickerStyle" value-format="yyyy"></el-date-picker>
</template>
<script>
export default {
	install(Vue) {
		Vue.component("gc-form-item-pickyear", this);
	},
	props: {
		fyear: {},
		// 参数：不能选择未来的年份？
		cannotBeFuture: {
			type: Boolean,
			default: true
		},
		// 宽度
		width: {
			type: String,
			default: ""
		},
	},
	watch: {
		fyear: {
			immediate: true,
			handler: function () {
				if (this.fyear) {
					this.year = this.fyear.toString();
				} else {
					this.year = "";
				}
			}
		},
		year() {
			let value;
			if (this.year) {
				value = this.year;
			} else {
				value = "";
			}
			this.$emit("update:fyear", value);
		}
	},
	data() {
		return {
			year: "",
			yearPickerOption: {
				disabledDate: (time) => {
					let flag = false;
					if (this.cannotBeFuture) {
						flag = time && (time.getFullYear() > new Date().getFullYear());
					}
					return flag;
				}
			},
		};
	},
	computed: {
		pickerStyle() {
			let style = {};
			if (this.width) {
				style.width = this.width;
			}
			return style;
		}
	},
};
</script>