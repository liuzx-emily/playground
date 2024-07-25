<style lang="scss" scoped>
$w: 100px;
$w1: 10px;
$w2: 10px;
$w3: 10px;
section {
  width: $w;
  height: $w;
  box-sizing: border-box;
  background: #ff7576;
  border: $w1 dashed #f9efe4;
  position: relative;
  border-radius: 5px;
}
section::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f7fdff;
  border: $w2 dashed #c8e6c9;
}
section::after {
  content: "";
  position: absolute;
  left: $w2;
  right: $w2;
  top: $w2;
  bottom: $w2;
  background: #ff7576;
  border: $w3 dashed #fbf9f3;
}
</style>
<template>
  <section></section>
</template>
