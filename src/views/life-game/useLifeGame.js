import { reactive } from "vue";

class World {
  constructor({
    row = 70,
    col = 70,
    initialAliveCells = [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ],
  } = {}) {
    this.row = row;
    this.col = col;
    this.cells = [];
    for (let i = 0; i <= this.row - 1; i++) {
      const rows = Array(this.col);
      for (let j = 0; j <= this.col - 1; j++) {
        rows[j] = this._getInitialState(initialAliveCells, i, j);
      }
      this.cells[i] = rows;
    }
  }
  _getInitialState(initialAliveCells, i, j) {
    if (Array.isArray(initialAliveCells)) {
      return !!initialAliveCells.find(([x, y]) => x === i && y === j);
    } else if (typeof initialAliveCells === "boolean") {
      return Math.random() < 0.25;
    }
  }
  getCell(i, j) {
    return this.cells[i][j];
  }
  setCellState(i, j, state) {
    this.cells[i].splice(j, 1, state);
    // set(this.cells[i], j, state);
  }
  toNextDay() {
    const _cells = cloneDeep(this.cells);
    const cells = [];
    for (let i = 0; i <= this.row - 1; i++) {
      const rows = Array(this.col);
      for (let j = 0; j <= this.col - 1; j++) {
        rows[j] = this._cellToNextDay(i, j, _cells);
      }
      cells[i] = rows;
    }
    this.cells = cells;
  }
  _cellToNextDay(i, j, _cells) {
    let state = _cells[i][j];
    const count = this._getAliveNeighbourCount(i, j, _cells);
    if (state) {
      if (count < 2 || count > 3) {
        state = false;
      }
    } else {
      if (count === 3) {
        state = true;
      }
    }
    return state;
  }
  _getAliveNeighbourCount(i, j, _cells) {
    let count = 0;
    const x1 = Math.max(i - 1, 0);
    const x2 = Math.min(i + 1, this.row - 1);
    const y1 = Math.max(j - 1, 0);
    const y2 = Math.min(j + 1, this.col - 1);
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (y === j && x === i) {
          continue;
        }
        const neighbourState = _cells[x][y];
        if (neighbourState) {
          count++;
        }
      }
    }
    return count;
  }
}
export function useLifeGame({ row, col, initialAliveCells } = {}) {
  const world = reactive(new World({ row, col, initialAliveCells }));

  function isCellAlive(i, j) {
    return world.getCell(i, j);
  }

  let timer;
  function evolve(ms = 1000) {
    stop();
    timer = setInterval(() => {
      world.toNextDay();
    }, ms);
    return timer;
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }

  return {
    world,
    evolve,
    stop,
    isCellAlive,
  };
}

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}
