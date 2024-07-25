<template>
  <!-- 
    在计算每个 cell 下一步状态之前，要先把 cells 深拷贝一份，用拷贝的这份算（不然就变成算着改着，后计算的 cell 取到的邻居值就不对了）

    world 要用 reactive 包一下
    
    设置 cells 元素要用 splice 
 -->
  <div>
    <div style="margin-bottom: 20px">
      <a href="https://zh.wikipedia.org/wiki/%E5%BA%B7%E5%A8%81%E7%94%9F%E5%91%BD%E6%B8%B8%E6%88%8F"
        >康威生命游戏</a
      >
      <input type="button" value="evolve" @click="handleClickEvolve" style="margin: 0 10px" />
      <input type="button" value="stop" @click="handleClickStop" />
    </div>
    <div v-for="i in world.row" class="row" :key="i">
      <div v-for="j in world.col" :key="j" class="cell" :class="getCellClass(i - 1, j - 1)"></div>
    </div>

    <p>
      （用 div 渲染，没做优化。80*80 的格子，演化间隔 1000/60 ms
      时已经能感到明显的卡顿，应该是渲染问题。）
    </p>
  </div>
</template>

<script>
import { useLifeGame } from "./useLifeGame.js";
export default {
  setup() {
    const { world, evolve, stop, isCellAlive } = useLifeGame({
      row: 50,
      col: 50,
      initialAliveCells: true,
    });

    function getCellClass(i, j) {
      return isCellAlive(i, j) ? "alive" : "dead";
    }

    const handleClickEvolve = () => evolve(1000 / 10);
    const handleClickStop = stop;
    return {
      world,
      getCellClass,
      handleClickEvolve,
      handleClickStop,
    };
  },
};
</script>
<style lang="scss" scoped>
.row {
  font-size: 0;
  .cell {
    display: inline-block;
    width: 12px;
    height: 12px;
    outline: 1px solid #eee;
    &.alive {
      background: green;
    }
  }
}
</style>
