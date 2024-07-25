import p5 from "p5";
import { shuffle } from "lodash";

import { useImages } from "./useImages";
import { useConnectable } from "./useConnectable";
import { useTempDisplay } from "./useTempDisplay";

export function useLinkGame() {
  const cells = [];

  const imageNames = useImages();

  const { checkIsConnectable, checkCellIsConnectableWithAny, isSameCell } = useConnectable(cells);

  const { tempDisplayConnectingLines, tempDisplayEliminatedCells, addTempDisplayItem } =
    useTempDisplay();

  function newGame() {
    cells.length = 0;
    initCells();
    placeImges();
  }

  function initCells() {
    const strategy = p5.prototype.random([
      function (i, j) {
        if (j !== 0 && j !== 13 && i !== 0 && i !== 7) {
          return i + 1 >= j || j - i >= 5;
        }
      },
      function (i, j) {
        if (j !== 0 && j !== 13 && i !== 0 && i !== 7) {
          return i + j <= 8 || i + j >= 12;
        }
      },
      function (i, j) {
        if ([1, 3, 5, 6, 7, 8, 10, 12].includes(j)) {
          return i >= 1 && i <= 6;
        }
      },
      function (i, j) {
        if ([1, 3, 4, 6].includes(i)) {
          return j >= 1 && j <= 12;
        }
        if ([2, 5].includes(i)) {
          return j === 1 || j === 12;
        }
      },
      function (i, j) {
        if ([0, 13].includes(j)) {
          return false;
        }
        if ([0, 1, 12, 13].includes(j)) {
          return [3, 4].includes(i);
        }
        if ([2, 3, 10, 11].includes(j)) {
          return [2, 3, 4, 5].includes(i);
        }
        if ([4, 5, 8, 9].includes(j)) {
          return [1, 2, 3, 4, 5, 6].includes(i);
        }
        return true;
      },
      function (i, j) {
        if ([1, 2, 11, 12].includes(j)) {
          return [3, 4].includes(i);
        }
        if ([3, 4, 6, 7, 9, 10].includes(j)) {
          return [1, 2, 3, 4, 5, 6].includes(i);
        }
        if ([5, 8].includes(j)) {
          return [2, 3, 4, 5].includes(i);
        }
        return false;
      },
      function (i, j) {
        if ([0, 13].includes(j) || [0, 7].includes(i)) {
          return false;
        }
        if ([1, 12].includes(j)) {
          return [2, 3, 4, 5].includes(i);
        }
        if ([2, 11].includes(j)) {
          return [1, 2, 3, 4, 5, 6].includes(i);
        }
        return true;
      },
    ]);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 14; j++) {
        cells.push({
          x: i,
          y: j,
          available: strategy(i, j),
          imgId: undefined,
        });
      }
    }
  }

  function placeImges() {
    // previewImages();
    // return;
    const cellsToPlace = cells.filter((cell) => cell.available);
    while (cellsToPlace.length > 0) {
      const [cell1] = cellsToPlace.splice(0, 1);
      const randomIndex = p5.prototype.random(0, cellsToPlace.length);
      const [cell2] = cellsToPlace.splice(randomIndex, 1);
      const image = p5.prototype.random(imageNames);
      cell1.imgId = image;
      cell2.imgId = image;
    }
  }

  function previewImages() {
    const cellsToPlace = cells.filter((cell) => cell.available);

    for (let i = 0; i <= cellsToPlace.length - 1; i++) {
      cellsToPlace[i].imgId = imageNames[i];
    }
  }

  function checkIsGameSuccess() {
    return cells.every((cell) => !cell.imgId);
  }

  // 判断是否需要洗牌
  function checkNeedShuffle() {
    if (checkIsGameSuccess()) {
      return false;
    }
    const keepGoing = cells.find((cell) => cell.imgId && checkCellIsConnectableWithAny(cell));
    return !keepGoing;
  }

  // 提示
  function hint() {
    for (let i = 0; i <= cells.length - 1; i++) {
      const cell = cells[i];
      if (cell.imgId) {
        const pairCell = checkCellIsConnectableWithAny(cell);
        if (pairCell) {
          return [cell, pairCell];
        }
      }
    }
    return;
  }

  // 洗牌
  function shuffleGame() {
    const cellsToPlace = cells.filter((cell) => cell.imgId);
    let imageNames = cellsToPlace.reduce((acc, cur) => {
      acc.push(cur.imgId);
      return acc;
    }, []);
    imageNames = shuffle(imageNames);
    for (let i = 0; i <= cellsToPlace.length - 1; i++) {
      cellsToPlace[i].imgId = imageNames[i];
    }
    if (checkNeedShuffle()) {
      shuffleGame();
    }
  }

  return {
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
  };
}
