<style lang="scss" scoped>
section {
  width: 150px;
  height: 56px;
  line-height: 56px;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #ffab91;
  box-sizing: border-box;
  color: #ffab91;
  font-size: 16px;

  &::before {
    position: absolute;
    z-index: -1;
    content: "";
    background: linear-gradient(30deg, white 20%, #ff9800 50%, white 80%);
    width: 300px;
    height: 100px;
    transition: 0.5s;
    top: -20px;
    left: -400px;
  }
}
section:hover {
  box-shadow: 0 0 5px #ffab91;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: 0.2s;
  &::before {
    left: 300px;
  }
}
</style>
<template>
  <section>炫光按钮</section>
</template>
