<style lang="scss" scoped>
$base-shadow: 0 5px 0 #e0f7fa;
$start-shadow: 0px 8px 4px #26c6da;
@keyframes bouncing {
  0% {
    top: 0;
    text-shadow: $base-shadow, $start-shadow;
  }
  50% {
    top: -15px;
    text-shadow: $base-shadow, 1px 20px 6px #b2ebf2;
  }
  100% {
    top: 0;
    text-shadow: $base-shadow, $start-shadow;
  }
}
span {
  display: inline-block;
  min-width: 10px;
  min-height: 20px;
  font-size: 60px;
  font-weight: bold;
  color: #4dd0e1;
  position: relative;
  animation-name: bouncing;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.18, 0.36, 0.11, 0.98);
}
</style>
<template>
  <section>
    <span
      v-for="(o, index) in msg"
      :key="index"
      :style="{ 'animation-delay': index * 0.05 + 's' }"
      >{{ o }}</span
    >
  </section>
</template>

<script setup>
import { ref } from "vue";
const msg = ref("wonder");
</script>
