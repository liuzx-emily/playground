<style lang="scss" scoped>
.poem{
  		font-weight: 800;
		transition: background-color 1.5s;
		font-size: 26px;
		letter-spacing: 2px;
			color: #aaa;
}
	.poem-char {
		min-width: 5px;
		&.active {
			color: #4CAF50;
		}
	}
</style>
<template>
	<section>
		<span class="poem">
			<span v-for="(c,key) in poem" :key="key" :class="[{active:key<poemIndex},'poem-char']">{{c}}</span>
		</span>
	</section>
</template>

<script>
	import poem from './poem'
	export default {
		data() {
			return {
				poem: poem,
				poemIndex: 0
			}
		},
		created() {
			document.addEventListener('keyup', e => {
				if (e.key.toLowerCase() === this.poem[this.poemIndex].toLowerCase()) {
					this.poemIndex++
				}
			})
		},
	}
</script>

<style>

</style>