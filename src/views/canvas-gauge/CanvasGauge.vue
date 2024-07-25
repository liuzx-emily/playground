<style lang="scss" scoped>
canvas {
  background: linear-gradient(
    20deg,
    rgb(0, 0, 0) 0,
    rgba(255, 87, 34, 0.9) 45%,
    rgba(255, 87, 34, 0.8) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
}
</style>
<template>
  <!-- 
  oninput 是值变化了就触发， onchange 是值变化并且失去焦点后才触发
  save-restore-restore-restore 是不行的。用 save 保存的状态只能用一次，后两个 restore 是回不到第一次 save 的状态的。
  drawWithAnimation() 方法中用 setTimeout 实现指针摆动的动画效果：在同步的 while 循环中新建了多个异步 setTimeout，time 和 val 都是在同步循环中计算好传进去的。
 -->
  <div style="margin-bottom: 20px">
    <input type="range" v-model="number" style="width: 500px" />
  </div>
  <canvas ref="canvas"></canvas>

  <img src="./heart.png" style="display: none" ref="img_heart" />
  <img src="./heart2.png" style="display: none" ref="img_heart_light" />
</template>

<script>
let animationId = 0;
export default {
  data() {
    return {
      number: 50,
      gaugeValue: undefined, // 仪表盘当前的值。在 draw() 中根据传来的 val 赋值，不要从外部修改。
      width: 500,
      height: 300,
      timer: null,
    };
  },
  watch: {
    number(val) {
      this.drawWithAnimation(val);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    drawWithAnimation(endVal) {
      animationId++;
      endVal = parseInt(endVal);
      let time = 0;
      // this.draw(endVal);
      let val = this.gaugeValue; // 用 this.gaugeValue 来初始化 val ，在下面的 while 循环中去修改 val 的值。因为 this.gaugeValue 的值是在异步的 setTimeout 中调用 draw()时 才修改的，在 this.gaugeValue 是不会变的。
      this.draw(val);
      while (val != endVal) {
        let step = val < endVal ? 1 : -1;
        let distance = Math.abs(val - endVal);
        time += Math.min(50, Math.round(500 / distance)); // 注意，这里是 +=
        if (distance >= 30) {
          step *= 4;
        } else if (distance >= 18) {
          step *= 3;
        } else if (distance >= 2) {
          step *= 2;
        } // 修改 step 时要小心，不要一步跨过去（跳过了while的终止条件，无限循环了）
        val += step;
        setTimeout(
          (myVal, myAnimationId) => {
            // animationId：最新的摆动动画的id，myAnimationId 这个定时器属于的摆动动画的id【防止拖来拖去，同时有很多组动画】
            if (animationId === myAnimationId) {
              this.draw(myVal); // myVal 和 myAnimationId 都是在定时器外面计算好后传进来的。
            }
          },
          time,
          val,
          animationId
        ); // val 和 myAnimationId 必须作为参数传进来
      }
    },
    init() {
      let canvas = this.$refs.canvas;
      canvas.setAttribute("width", this.width);
      canvas.setAttribute("height", this.height);
      this.draw(0);
      this.drawWithAnimation(this.number);
    },
    draw(value) {
      value = parseInt(value);
      this.gaugeValue = value;
      let startAngle = (9 / 8) * Math.PI, // 和数学上的保持一致
        endAngle = (-1 / 8) * Math.PI,
        splitNumber = 50,
        diamondNumber = 10,
        diamondSize = 10,
        center = [this.width / 2, this.height / 2 + 32];
      var ctx = this.$refs.canvas.getContext("2d");
      ctx.save();
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.translate(center[0], center[1]);
      //
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.arc(0, 0, 35, 2 * Math.PI - startAngle, 2 * Math.PI - endAngle, false);
      ctx.stroke();
      // 画刻度
      ctx.lineWidth = 2;
      let r1 = 90;
      let r2 = 105;
      ctx.shadowBlur = 0;
      for (let i = 0; i <= splitNumber; i++) {
        let angle = startAngle - ((startAngle - endAngle) / splitNumber) * i;
        let startX = Math.cos(angle) * r1;
        let startY = -Math.sin(angle) * r1;
        let endX = Math.cos(angle) * r2;
        let endY = -Math.sin(angle) * r2;
        if (i <= (value * splitNumber) / 100) {
          ctx.strokeStyle = "white";
        } else {
          ctx.strokeStyle = "#ffa96d";
        }
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      // 画指针
      ctx.strokeStyle = "#fff";
      let r3 = 115;
      let angle =
        startAngle - (((startAngle - endAngle) / splitNumber) * value * splitNumber) / 100;
      let startX = Math.cos(Math.PI + angle) * 12;
      let startY = -Math.sin(Math.PI + angle) * 12;
      let endX = Math.cos(angle) * r3;
      let endY = -Math.sin(angle) * r3;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      //
      // 画指针中心的圈圈
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "pink";
      ctx.arc(0, 0, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      // 画钻石
      for (let i = 0; i <= diamondNumber; i++) {
        ctx.restore();
        // 不能连着用 restore()，没有用！
        ctx.save();
        let angle = startAngle - ((startAngle - endAngle) / diamondNumber) * i;
        let startX = Math.cos(angle) * 130;
        let startY = -Math.sin(angle) * 130;
        ctx.translate(center[0] + startX, center[1] + startY);
        ctx.rotate(Math.PI / 2 - angle);
        let scale = 50;
        if (i < diamondNumber * 0.5) {
          scale = 0.5;
        } else if (i < diamondNumber * 0.8) {
          scale = i / diamondNumber;
        } else {
          scale = 1;
        }
        ctx.scale(scale, scale);
        let img;
        if (i <= (value * diamondNumber) / 100) {
          img = this.$refs.img_heart;
        } else {
          img = this.$refs.img_heart_light;
        }
        if (value === 0) {
          img = this.$refs.img_heart_light;
        }
        ctx.drawImage(
          img,
          0,
          0,
          diamondSize * 2,
          diamondSize * 2,
          -diamondSize,
          -diamondSize,
          diamondSize * 2,
          diamondSize * 2
        );
      }
      ctx.restore();
    },
  },
};
</script>
