import { intersectionWith } from "lodash";

export function useConnectable(cells) {
  // 判断 cell1 和 cell2 是否可以相连消除（能则返回路径；不能则返回false）
  function checkIsConnectable(cell1, cell2) {
    if (cell1.imgId !== cell2.imgId) {
      return;
    }
    // check if 不拐弯
    const isDirectConnecting = checkIsDirectConnectable(cell1, cell2);
    if (isDirectConnecting) {
      return [cell1, cell2];
    }
    // check if 拐一个弯
    const { arr: passableCells_cell1 } = findSurroudingPassableCells(cell1, cell2);
    const { arr: passableCells_cell2 } = findSurroudingPassableCells(cell2, cell1);
    const [intersectionCell] = intersectionWith(
      passableCells_cell1,
      passableCells_cell2,
      isSameCell
    );
    if (intersectionCell) {
      return [cell1, intersectionCell, cell2];
    }
    // check if 转两个弯 从内部走（井字中心的格）
    const passableCells_cell1_innerRect = passableCells_cell1.filter((o) => o.innerRect);
    const passableCells_cell2_innerRect = passableCells_cell2.filter((o) => o.innerRect);
    for (let i = 0; i <= passableCells_cell1_innerRect.length - 1; i++) {
      const cell3 = passableCells_cell1_innerRect[i];
      for (let j = 0; j <= passableCells_cell2_innerRect.length - 1; j++) {
        const cell4 = passableCells_cell2_innerRect[j];
        if (checkIsDirectConnectable(cell3, cell4)) {
          return [cell1, cell3, cell4, cell2];
        }
      }
    }
    // check if 转两个弯 从外部走（井字四周的格）
    const passableCells_cell1_outerRect = passableCells_cell1.filter(
      (o) => !o.isSelf && !o.innerRect
    );
    const passableCells_cell2_outerRect = passableCells_cell2.filter(
      (o) => !o.isSelf && !o.innerRect
    );
    // 找最短路径
    let distance = 1;
    let leftCount = passableCells_cell1_outerRect.length;
    while (leftCount > 0) {
      const cell5s = passableCells_cell1_outerRect.filter(
        (o) => o.toInnerRectDistance === distance
      );
      for (let i = 0; i <= cell5s.length - 1; i++) {
        const cell5 = cell5s[i];
        const cell6s = passableCells_cell2_outerRect.filter((o) => o.dir === cell5.dir);
        for (let j = 0; j <= cell6s.length - 1; j++) {
          const cell6 = cell6s[j];
          if (checkIsDirectConnectable(cell5, cell6)) {
            return [cell1, cell5, cell6, cell2];
          }
        }
        leftCount--;
      }
      distance++;
    }
    return false;
  }
  // 判断cell1和cell2是否可以不拐弯直连
  function checkIsDirectConnectable(cell1, cell2) {
    if (cell1.y === cell2.y && checkIsDirectHorizontalConnecting(cell1, cell2)) {
      return true;
    } else if (cell1.x === cell2.x && checkIsDirectVerticalConnecting(cell1, cell2)) {
      return true;
    } else {
      return false;
    }
    function checkIsDirectHorizontalConnecting(cell1, cell2) {
      const min = Math.min(cell1.x, cell2.x);
      const max = Math.max(cell1.x, cell2.x);
      const arr = [];
      for (let i = min + 1; i <= max - 1; i++) {
        arr.push({ x: i, y: cell1.y });
      }
      return arr.every((o) => isPassableCell(o));
    }
    function checkIsDirectVerticalConnecting(cell1, cell2) {
      const min = Math.min(cell1.y, cell2.y);
      const max = Math.max(cell1.y, cell2.y);
      const arr = [];
      for (let i = min + 1; i <= max - 1; i++) {
        arr.push({ x: cell1.x, y: i });
      }
      return arr.every((o) => isPassableCell(o));
    }
  }
  // 找到cell上下左右四个方向可延伸至的格子（aimingCell是用来判断innerRect和算toInnerRectDistance的）
  function findSurroudingPassableCells(cell, aimingCell) {
    const arr = [{ x: cell.x, y: cell.y, isSelf: true }];
    let currentCell;
    // left
    currentCell = { x: cell.x - 1, y: cell.y };
    while (isPassableCell(currentCell)) {
      arr.push({
        ...currentCell,
        dir: "left",
        innerRect: isBetweenTwoNumber(currentCell.x, cell.x, aimingCell.x),
        // TODO refact
        toInnerRectDistance: Math.min(
          Math.abs(currentCell.x - cell.x),
          Math.abs(currentCell.x - aimingCell.x)
        ),
      });
      currentCell = { x: currentCell.x - 1, y: cell.y };
    }
    // right
    currentCell = { x: cell.x + 1, y: cell.y };
    while (isPassableCell(currentCell)) {
      arr.push({
        ...currentCell,
        dir: "right",
        innerRect: isBetweenTwoNumber(currentCell.x, cell.x, aimingCell.x),
        toInnerRectDistance: Math.min(
          Math.abs(currentCell.x - cell.x),
          Math.abs(currentCell.x - aimingCell.x)
        ),
      });
      currentCell = { x: currentCell.x + 1, y: cell.y };
    }
    // up
    currentCell = { x: cell.x, y: cell.y - 1 };
    while (isPassableCell(currentCell)) {
      arr.push({
        ...currentCell,
        dir: "up",
        innerRect: isBetweenTwoNumber(currentCell.y, cell.y, aimingCell.y),
        toInnerRectDistance: Math.min(
          Math.abs(currentCell.y - cell.y),
          Math.abs(currentCell.y - aimingCell.y)
        ),
      });
      currentCell = { x: cell.x, y: currentCell.y - 1 };
    }
    // down
    currentCell = { x: cell.x, y: cell.y + 1 };
    while (isPassableCell(currentCell)) {
      arr.push({
        ...currentCell,
        dir: "down",
        innerRect: isBetweenTwoNumber(currentCell.y, cell.y, aimingCell.y),
        toInnerRectDistance: Math.min(
          Math.abs(currentCell.y - cell.y),
          Math.abs(currentCell.y - aimingCell.y)
        ),
      });
      currentCell = { x: cell.x, y: currentCell.y + 1 };
    }
    return { arr };
  }
  // 判断 cell 是否可通过（没有图片挡路）
  function isPassableCell(cell) {
    const matched = cells.find((o) => isSameCell(cell, o));
    if (!matched) {
      return false;
    }
    return !matched.imgId;
  }
  // 判断 cell1 和 cell2 是否是同一个格子（坐标是否相同）
  function isSameCell(cell1, cell2) {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  }
  // 判断cell是否可以和另外某个格子相连
  function checkCellIsConnectableWithAny(cell) {
    const possiblePairs = cells.filter((o) => !isSameCell(o, cell) && o.imgId === cell.imgId);
    return possiblePairs.find((o) => checkIsConnectable(o, cell));
  }
  return { checkIsConnectable, checkCellIsConnectableWithAny, isSameCell };
}

// 判断 num 是否在 n1 和 n2 之间
function isBetweenTwoNumber(num, n1, n2) {
  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);
  return num >= min && num <= max;
}
