<style lang="scss" scoped>
@keyframes wave {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.ball {
  width: 100px;
  height: 100px;
  background: linear-gradient(0deg, #f08080 20%, #ffffff 100%);
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.wave {
  position: absolute;
  width: 200px;
  height: 200px;
  left: -50px;
  border-radius: 40%;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  animation: wave 10s linear infinite;
  border-radius: 10px solid #eee;
}
</style>
<template>
  <section>
    <section class="ball">
      <!-- 不能用伪元素，因为无法控制伪元素的top（伪元素的 top 属性不能用 attr 动态控制，因为现在只有 content 支持 attr） -->
      <section class="wave" :style="{ top: waveTop + 'px' }"></section>
    </section>
    <input type="range" v-model="percentage" min="0" max="100" />
  </section>
</template>
<script>
export default {
  computed: {
    waveTop() {
      return -~~(100 + 1.05 * this.percentage);
    },
  },
  data() {
    return {
      percentage: 50,
    };
  },
};
</script>
