<script setup>
import { cloneDeep, forEach } from "lodash";
import p5 from "p5";
import "./assets/p5.collide2d"; // register collide methods on p5.prototype
import { useLinkGame } from "./composable/useLinkGame";
import { onMounted } from "vue";

const {
  imageNames,
  cells,
  newGame,
  checkIsGameSuccess,
  checkNeedShuffle,
  hint,
  shuffleGame,
  checkIsConnectable,
  isSameCell,
  tempDisplayConnectingLines,
  tempDisplayEliminatedCells,
  addTempDisplayItem,
} = useLinkGame();
newGame();

let hintingCells;
function isHintingCell(cell) {
  return hintingCells && hintingCells.find((o) => isSameCell(o, cell));
}
const imageMaps = {};
onMounted(() => {
  new p5(function (p) {
    p.setup = function () {
      p.createCanvas(320, 560);
    };

    p.preload = function () {
      imageNames.forEach((name) => {
        const url = new URL(`./assets/svg/${name}.svg`, import.meta.url).href;
        imageMaps[name] = p.loadImage(url);
      });
    };

    p.draw = function () {
      p.clear();
      p.strokeWeight(1);
      cells.forEach((cell) => {
        drawImageCell(cell);
      });

      // draw active cell border
      cells
        .filter((o) => o.active)
        .forEach((o) => {
          p.strokeWeight(2);
          p.stroke("red");
          p.noFill();
          p.rect(o.x * 40 + 1, o.y * 40 + 1, 40 - 2);
        });

      // draw tempDisplayEliminatedCells
      forEach(tempDisplayEliminatedCells.value, ([cell1, cell2]) => {
        drawImageCell(cell1);
        drawImageCell(cell2);
      });

      // draw tempDisplayConnectingLines
      forEach(tempDisplayConnectingLines.value, (connectingLine) => {
        for (let i = 0; i <= connectingLine.length - 2; i++) {
          const dot1 = connectingLine[i];
          const dot2 = connectingLine[i + 1];
          p.stroke("red");
          p.strokeWeight(2);
          p.line(dot1.x * 40 + 20, dot1.y * 40 + 20, dot2.x * 40 + 20, dot2.y * 40 + 20);
        }
      });

      function drawImageCell(cell) {
        if (cell.imgId) {
          const isHintingCellFlag = isHintingCell(cell);
          // 底色
          p.noStroke();
          p.fill(isHintingCellFlag ? "#ff5722" : "#f8f0b8");
          p.rect(cell.x * 40 + 2, cell.y * 40 + 2, 36);
          // 里框
          p.stroke("#ffe0b2");
          p.noFill();
          p.rect(cell.x * 40 + 4, cell.y * 40 + 4, 32);
          // 立体感
          p.fill("#e1ad85");
          p.noStroke();
          p.quad(
            ...[cell.x * 40 + 2, cell.y * 40 + 1],
            ...[cell.x * 40 + 2, (cell.y + 1) * 40 - 1],
            ...[cell.x * 40 - 2, (cell.y + 1) * 40 - 3],
            ...[cell.x * 40 - 2, cell.y * 40 + 6]
          );
          p.image(imageMaps[cell.imgId], cell.x * 40 + 4, cell.y * 40 + 4);
        }
      }
    };
    p.touchEnded = function () {
      hintingCells = null;
      const targetCell = cells.find(
        (cell) =>
          cell.imgId && p.collidePointRect(p.mouseX, p.mouseY, cell.x * 40, cell.y * 40, 40, 40)
      );
      if (!targetCell) {
        return;
      }
      const activeCell = cells.find((cell) => cell.active);
      if (!activeCell) {
        targetCell.active = true;
        return;
      }
      if (isSameCell(targetCell, activeCell)) {
        return;
      }
      const connectingLine = checkIsConnectable(activeCell, targetCell);
      if (connectingLine) {
        addTempDisplayItem({ type: "connectingLine", value: connectingLine, time: 150 });
        addTempDisplayItem({
          type: "eliminatedCells",
          value: [cloneDeep(activeCell), cloneDeep(targetCell)],
          time: 150,
        });
        activeCell.imgId = undefined;
        activeCell.active = false;
        targetCell.imgId = undefined;
        if (checkIsGameSuccess()) {
          alert("赢了！");
        } else if (checkNeedShuffle()) {
          console.log("自动洗牌");
          shuffleGame();
        }
      } else {
        activeCell.active = false;
        targetCell.active = true;
      }
    };
  }, "target");
});
function handleClickHint() {
  hintingCells = hint();
}
</script>

<template>
  <p>
    <a href="https://liuzx-emily.github.io/blog/#/post/7fdb72d6-180c-4ef2-9d0e-08358f7c3364">
      《p5.js 写个连连看》
    </a>
  </p>
  <section style="width: 320px">
    <section class="controls">
      <input type="button" value="洗牌" @click="shuffleGame" />
      <input type="button" value="提示" @click="handleClickHint" />
      <input type="button" value="新游戏" @click="newGame" />
    </section>
    <div id="target"></div>
  </section>
</template>
<style lang="scss" scoped>
.controls {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  input[type="button"] {
    font-size: 15px;
  }
}
#target {
  background: white;
  height: 560px;
  :deep(canvas) {
    background: #f9f3f3;
    display: block;
  }
}
</style>
