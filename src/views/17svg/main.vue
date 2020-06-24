<style lang="scss" scoped>
@keyframes magic {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.mouth {
    fill: none;
    stroke: #00B51D;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 44, 44;
    transform-origin: center;   /* transform动画时以自身中心作为基点 */
}
.eye {
    fill: none;
    fill:#aaa;
    stroke: #00B51D;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 0, 66;
    transform-origin: center; 
    
    animation-name: magic;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
</style>
<template>
	<section>
		<svg width="100" height="100">
      <circle class="eye" cx="50" cy="50" r="14"></circle>
      <!-- <circle class="mouth" cx="50" cy="50" r="14"></circle> -->
    </svg>
	</section>
</template>
<script>
	export default {

	}
</script>