<style lang="scss" scoped>
$colorList: lightcoral, aquamarine, skyblue, #fff386;

@for $i from 1 through length($colorList) {
  $color: nth($colorList, $i);

  .dot:nth-child(#{$i}) {
    background: $color;
    &::before {
      animation-delay: $i * 0.2s;
    }
  }
}

@keyframes magic1 {
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
.dot {
  display: inline-block;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  position: relative;
  background: skyblue;
  margin: 20px;
  border-radius: 50%;
  &::before {
    display: inline-block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
    border-radius: inherit;
    background: inherit;
    animation-name: magic1;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    // forwards 当动画完成后，保持最后一个属性值
    // backwards 在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值
    // both 向前和向后填充模式都被应用。
    animation-fill-mode: both;
    animation-timing-function: linear;
    // animation-direction: alternate;
  }
}
</style>
<template>
  <section>
    <div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </section>
</template>
