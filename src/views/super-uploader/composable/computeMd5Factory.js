export class ComputeMd5Factory {
  constructor() {
    this.waitingList = [];
    this.workingCount = 0;
    this.maxWorkingCount = 5;
  }

  addFile(file) {
    return new Promise((resolve, reject) => {
      if (this.workingCount < this.maxWorkingCount) {
        this.workingCount++;
        this.computeMd5({ file, resolve, reject });
      } else {
        this.waitingList.push({ file, resolve, reject });
      }
    });
  }

  // 分块计算md5
  computeMd5({ file, resolve, reject }) {
    const worker = new Worker(new URL("./computeMd5Worker.js", import.meta.url), {
      type: "module",
    });
    worker.postMessage({ file });
    worker.addEventListener("message", (e) => {
      if (e.data.isSuccessful) {
        resolve(e.data.md5);
      } else if (e.data.isFailed) {
        reject(e.data.errMsg);
      }
      if (this.waitingList.length > 0) {
        this.computeMd5(this.waitingList.shift());
      } else {
        this.workingCount--;
      }
      // 立刻终止worker
      worker.terminate();
    });
  }
}
