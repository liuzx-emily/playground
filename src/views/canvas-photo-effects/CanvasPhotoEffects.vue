<template>
  <section style="margin-bottom: 20px">
    <input type="file" accept="image/*" @change="uploadFile" ref="uploadButtonEl" />
    <img src="./example.png" style="display: none" ref="imgEl" />
    <button type="button" @click="visualEffect_none">原图</button>
    <button type="button" @click="visualEffect_gray">黑白</button>
    <button type="button" @click="visualEffect_upsidedown">颠倒</button>
    <button type="button" @click="visualEffect_noise">噪点</button>
    <button type="button" @click="visualEffect_brighter(1)">增加亮度</button>
    <button type="button" @click="visualEffect_brighter(-1)">降低亮度</button>
    <button type="button" @click="visualEffect_mosaic">增强马赛克</button>
  </section>
  <canvas ref="canvasEl" style="outline: 1 dashed #aaa"></canvas>
</template>
<script setup>
import { onMounted, ref } from "vue";

const imgOriginalData = ref(null);
const imgCurrentData = ref(null);

let ctx;

const effectParams = {
  brightness: 0,
  mosaic: 0,
};

const canvasEl = ref();
const canvasWidth = ref();
const canvasHeight = ref();
const imgEl = ref();
const uploadButtonEl = ref();

onMounted(() => {
  imgEl.value.addEventListener("load", () => {
    clearEffectParams();

    const imgWidth = imgEl.value.width;
    const imgHeight = imgEl.value.height;

    // canvas max-width 800px，图片超过此宽度等比例压缩
    if (imgWidth <= 800) {
      canvasWidth.value = imgWidth;
      canvasHeight.value = imgHeight;
    } else {
      canvasWidth.value = 800;
      canvasHeight.value = (imgHeight * 800) / imgWidth;
    }

    canvasEl.value.setAttribute("width", canvasWidth.value);
    canvasEl.value.setAttribute("height", canvasHeight.value);

    ctx.drawImage(
      imgEl.value,
      0,
      0,
      imgWidth,
      imgHeight,
      0,
      0,
      canvasWidth.value,
      canvasHeight.value
    );
    imgOriginalData.value = ctx.getImageData(0, 0, canvasWidth.value, canvasHeight.value);
    imgCurrentData.value = ctx.createImageData(imgOriginalData.value);
  });

  imgEl.value.addEventListener("error", () => {
    console.error("error");
  });

  ctx = canvasEl.value.getContext("2d");
});

function uploadFile() {
  let img = uploadButtonEl.value.files[0];
  const fr = new FileReader();
  fr.onload = () => {
    imgEl.value.src = fr.result;
  };
  fr.readAsDataURL(img);
}

function visualEffect_none() {
  clearEffectParams();
  clearCanvas();
  ctx.putImageData(imgOriginalData.value, 0, 0);
}

// 黑白
function visualEffect_gray() {
  clearCanvas();
  for (let x = 0; x < canvasWidth.value; x++) {
    for (let y = 0; y < canvasHeight.value; y++) {
      const colorArr = getColor(imgOriginalData.value, x, y);
      const gray = 0.3 * colorArr[0] + 0.3 * colorArr[1] + 0.3 * colorArr[2];
      setColor(imgCurrentData.value, x, y, [gray, gray, gray, 255]);
    }
  }
  ctx.putImageData(imgCurrentData.value, 0, 0);
}

// 颠倒
function visualEffect_upsidedown() {
  clearCanvas();
  for (let x = 0; x < canvasWidth.value; x++) {
    for (let y = 0; y < canvasHeight.value; y++) {
      const colorArr = getColor(imgOriginalData.value, x, y);
      setColor(imgCurrentData.value, canvasWidth.value - x, canvasHeight.value - y, colorArr);
    }
  }
  ctx.putImageData(imgCurrentData.value, 0, 0);
}

// 噪点
function visualEffect_noise() {
  clearCanvas();
  for (let x = 0; x < canvasWidth.value; x++) {
    for (let y = 0; y < canvasHeight.value; y++) {
      const colorArr = getColor(imgOriginalData.value, x, y);
      // ---------------- 沫沫效果 ----------------
      if (Math.random() > 0.2) {
        setColor(imgCurrentData.value, x, y, colorArr);
      } else {
        setColor(
          imgCurrentData.value,
          x,
          y,
          colorArr.map((item) => Math.round(item * 0.5))
        );
      }
    }
  }
  ctx.putImageData(imgCurrentData.value, 0, 0);
}

// 调整亮度
function visualEffect_brighter(val) {
  effectParams.brightness += val;
  clearCanvas();
  for (let x = 0; x < canvasWidth.value; x++) {
    for (let y = 0; y < canvasHeight.value; y++) {
      const colorArr = getColor(imgOriginalData.value, x, y);
      let newColor = colorArr.map((item) => item + effectParams.brightness * 10);
      setColor(imgCurrentData.value, x, y, newColor);
    }
  }
  ctx.putImageData(imgCurrentData.value, 0, 0);
}

// 马赛克
function visualEffect_mosaic() {
  effectParams.mosaic++;
  const level = effectParams.mosaic * 2;
  clearCanvas();
  for (let x = 0; x < canvasWidth.value; x += level) {
    for (let y = 0; y < canvasHeight.value; y += level) {
      const colorArr = getColor(imgOriginalData.value, x, y);
      for (let x_level = -level; x_level < level; x_level++) {
        for (let y_level = -level; y_level < level; y_level++) {
          setColor(imgCurrentData.value, x + x_level, y + y_level, colorArr);
        }
      }
    }
  }
  ctx.putImageData(imgCurrentData.value, 0, 0);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
}

function getColor(imageData, x, y) {
  let index = 4 * (y * imageData.width + x);
  return [
    imageData.data[index],
    imageData.data[index + 1],
    imageData.data[index + 2],
    imageData.data[index + 3],
  ];
}

function setColor(imageData, x, y, color) {
  let index = 4 * (y * imageData.width + x);
  imageData.data[index] = color[0];
  imageData.data[index + 1] = color[1];
  imageData.data[index + 2] = color[2];
  imageData.data[index + 3] = color[3];
}

function clearEffectParams() {
  effectParams.brightness = 0;
  effectParams.mosaic = 0;
}
</script>
