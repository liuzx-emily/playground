<template>
	<section>
		<h6></h6>
		<h6>使用真的select（没有用 v-model）</h6>
		<p>1 innerHTML是阻塞的。</p>
		<p>2 设置value时，如果value不能匹配上option，那么value会变为""</p>
		<p>3 设置innerHTML时，旧value失效。只看新的html中有没有selected的option，有就选中它，没有就选中第一个option</p>
		<p>4 设置value、innerHTML，都不会触发change事件</p>
		<section>
			<select ref="select_levelOne"></select>
			<select ref="select_levelTwo"></select>
			<select ref="select_levelThree"></select>
		</section>
		<p>
			<input type="button" @click="do_fuzhi(1)" value="赋值：空">
			<input type="button" @click="do_fuzhi(2)" value="赋值：河北-张家口-下花园">
			<input type="button" @click="do_fuzhi(3)" value="赋值：安徽-蚌埠-空">
			<input type="button" @click="do_fuzhi(4)" value="赋值：山东-空-空">
			<input type="button" @click="do_fuzhi(5)" value="赋值：江苏-扬州-江都">
			<input type="button" @click="do_fuzhi(6)" value="赋值：江苏-错-江都">
			<input type="button" @click="do_fuzhi(7)" value="赋值：河北-张家口-错">
			<input type="button" @click="printParam" value="打印参数">
		</p>
	</section>
</template>
<script>
	import CascadingAddress from './CascadingAddress.js'
	export default {
		data() {
			return {
				cascadingAddress1: null,
			};
		},
		mounted() {
			this.cascadingAddress1 = new CascadingAddress({
				// 是否添加 "请选择"这一空项？
				hasNullOption: true,
				// DOM元素
				elSelectLevelOne: this.$refs.select_levelOne,
				elSelectLevelTwo: this.$refs.select_levelTwo,
				elSelectLevelThree: this.$refs.select_levelThree,
			});
			// 广东 - 广州 - 海珠
			let data = { levelOne: "440000", levelTwo: "440100", levelThree: "440105", };
			this.cascadingAddress1.setValue(data);
		},
		methods: {
			do_fuzhi(type) {
				let data;
				if (type == 1) {
					data = { levelOne: "", levelTwo: "", levelThree: "", };
				} else if (type == 2) {
					// 河北-张家口-下花园
					data = { levelOne: "130000", levelTwo: "130700", levelThree: "130706", };
				} else if (type == 3) {
					// 安徽-蚌埠-空
					data = { levelOne: "340000", levelTwo: "340300", levelThree: "", };
				} else if (type == 4) {
					// 山东-空-空
					data = { levelOne: "370000", levelTwo: "", levelThree: "", };
				} else if (type == 5) {
					// 江苏-扬州-江都
					data = { levelOne: "320000", levelTwo: "321000", levelThree: "321012", };
				} else if (type == 6) {
					// 江苏-错-江都
					data = { levelOne: "410000", levelTwo: "wrong", levelThree: "321012", };
				} else if (type == 7) {
					// 河北-张家口-错
					data = { levelOne: "130000", levelTwo: "130700", levelThree: "wrong", };
				}
				this.cascadingAddress1.setValue(data);
			},
			printParam() {
				console.log(this.cascadingAddress1.toString());
			}
		}
	};
</script>