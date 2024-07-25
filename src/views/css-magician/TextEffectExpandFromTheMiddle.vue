<style lang="scss" scoped>
@keyframes magic {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slideLeft {
  0% {
    left: 135px;
    opacity: 0.5;
  }
  90%,
  100% {
    left: -50px;
  }
}
@keyframes slideRight {
  0% {
    right: 135px;
    opacity: 0.5;
  }
  90%,
  100% {
    right: -50px;
  }
}
section.container {
  width: 100%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  color: white;
  font-size: 40px;
  &::before,
  &::after {
    display: inline-block;
    content: "♥";
    position: absolute;
    top: 0px;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    // 动画效果 前后填充！
    animation-fill-mode: both;
    animation-iteration-count: infinite;
  }
  &::before {
    animation-name: slideLeft;
  }
  &::after {
    animation-name: slideRight;
  }
  .text {
    animation-name: magic;
    animation-duration: 2s;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    // 动画开始前(delay阶段)、动画结束后，分别填充动画开始、结束帧的效果！
    animation-fill-mode: both;
    letter-spacing: 5px;
  }
}
</style>
<template>
  <section style="background: linear-gradient(to right, #ffafbd, #ffc3a0); padding: 20px 100px">
    <section class="container">
      <span v-for="(item, index) in list" :key="index" :style="getTxtDelay(item)" class="text">{{
        item.value
      }}</span>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      msg: "你好，脆脆鲨",
    };
  },
  computed: {
    list() {
      let middle = ~~(this.msg.length / 2);
      let arr = this.msg.split("").map((value, index) => {
        return {
          value: value,
          delay: Math.abs(index - middle),
        };
      });
      return arr;
    },
  },
  methods: {
    getTxtDelay(data) {
      return {
        "animation-delay": data.delay * 0.1 + "s",
      };
    },
  },
};
</script>
