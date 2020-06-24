<style lang="scss" scoped>
	.code {
		font-weight: 800;
		transition: background-color 1.5s;
		font-size: 26px;
		letter-spacing: 2px;
		.code-char {
			color: #eee;
			&.active {
				color: #4CAF50;
			}
		}
	}
	.code-success {
		background: coral;
		color: white;
	}
</style>
<template>
	<section>
		<h1>作弊码体验区！</h1>
		<ul>
			<li v-for="o in codes">
				<span v-if="o.success" class="code code-success">{{o.code}}</span>
				<span v-else class="code code-normal">
					<span v-for="(c,key) in o.code" :key="key" :class="[{active:key<o.index},'code-char']">{{c}}</span>
				</span>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				codes: [
					{ code: 'magichour', index: 0, success: false, },
					{ code: 'magictime', index: 0, success: false, },
					{ code: 'cheatcode', index: 0, success: false, },
					{ code: 'whosyourdaddy', index: 0, cb: () => { alert('哈哈！') }, success: false, },
					{ code: 'baobao', index: 0, success: false, },
					{ code: 'yaya', index: 0, success: false, },
				],
				flag: false,
			}
		},
		created() {
			document.addEventListener('keyup', e => {
				// if (this.flag) {
				// 	return;
				// }
				let index = 0;
				while (index <= this.codes.length - 1) {
					if (this.codes[index].success) {
						index++;
						continue
					}
					const res = this.checkCode(e.key, this.codes[index]);
					if (res) {
						break;
					}
					index++;
				}
			})
		},
		methods: {
			checkCode(key, codeObj) {
				const { code } = codeObj;
				if (key === code[codeObj.index]) {
					codeObj.index++;
					if (codeObj.index === code.length) {
						codeObj.success = true;
						this.flag = true;
						codeObj.cb && codeObj.cb();
						return true;
					}
				} else if (key === code[0]) {
					codeObj.index = 1;
				} else {
					codeObj.index = 0;
				}
			}
		}
	}
</script>

<style>

</style>