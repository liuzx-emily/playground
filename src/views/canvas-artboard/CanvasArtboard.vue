<style lang="scss" scoped>
button.control-history-step-button {
  cursor: pointer;
  margin-right: 5px;
  &:disabled {
    cursor: not-allowed;
  }
}

.history-list-container {
  display: flex;
  img.history-item {
    margin-right: 5px;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    &.current {
      border-color: coral;
    }
  }
}
</style>

<template>
  <section>
    <section style="display: flex; align-items: center">
      <button
        class="control-history-step-button"
        type="button"
        @click="goBack"
        :disabled="historyIndex == 0"
      >
        上一步
      </button>
      <button
        class="control-history-step-button"
        type="button"
        @click="goNext"
        :disabled="!inHistory"
      >
        下一步
      </button>
      <div class="history-list-container">
        <img
          v-for="(item, index) in historyList"
          :key="index"
          :src="item"
          class="history-item"
          :class="{ current: index == historyIndex }"
        />
      </div>
    </section>
    <section style="margin: 20px 0">
      <span style="margin-right: 10px">
        画笔颜色
        <input type="color" v-model="lineColor" />
      </span>
      <span s>
        画笔粗细
        <input type="number" v-model="lineWidth" />
      </span>
    </section>
    <canvas width="500" height="500" ref="canvas" style="outline: 1px solid #777"></canvas>
  </section>
</template>
<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      historyList: [],
      historyIndex: 0,
      lineColor: "#FF5722",
      lineWidth: 10,
    };
  },
  computed: {
    inHistory() {
      return this.historyIndex < this.historyList.length - 1;
    },
  },
  watch: {
    lineColor(val) {
      this.ctx.strokeStyle = val;
    },
    lineWidth(val) {
      this.ctx.lineWidth = val;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.canvas = this.$refs.canvas;
      this.canvas.addEventListener("mousedown", this.drawLine);
      this.ctx = this.canvas.getContext("2d");
      // 初始化设置样式
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.lineWidth = this.lineWidth;
      //
      const url = this.canvas.toDataURL();
      this.historyList.push(url);
    },
    drawLine(e) {
      const getOffset = (e) => {
        return [
          e.clientX - this.canvas.getBoundingClientRect().left,
          e.clientY - this.canvas.getBoundingClientRect().top,
        ];
      };
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(...getOffset(e));
      document.onmousemove = (e) => {
        ctx.lineTo(...getOffset(e));
        ctx.stroke();
        return false;
      };
      document.onmouseup = () => {
        if (this.inHistory) {
          this.historyList.length = this.historyIndex + 1;
        }
        const url = this.canvas.toDataURL();
        this.historyList.push(url);
        this.historyIndex = this.historyList.length - 1;

        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    goBack() {
      this.historyIndex = this.historyIndex - 1;
      this.goToHistory();
    },
    goNext() {
      this.historyIndex = this.historyIndex + 1;
      this.goToHistory();
    },
    goToHistory() {
      const url = this.historyList[this.historyIndex];
      const oImage = new Image();
      oImage.onload = () => {
        this.ctx.clearRect(0, 0, 500, 500);
        this.ctx.drawImage(oImage, 0, 0, 500, 500);
      };
      oImage.src = url;
    },
  },
};
</script>
