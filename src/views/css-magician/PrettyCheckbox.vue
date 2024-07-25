<style lang="scss" scoped>
label {
  display: flex;
  font-size: 12px;
  margin: 5px 0;
  align-items: center;
  input[type="checkbox"] {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: -7px;
      width: 10px;
      height: 10px;
      border: 2px solid #ff5722;
    }
  }
  input[type="checkbox"]:checked::after {
    background: #009688;
    border-color: #80cbc4;
  }
  span {
    vertical-align: top;
    margin-left: 20px;
    position: relative;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: #eee;
      transition: width 0.5s;
    }
  }
  // +是紧挨着，~可以不紧挨着
  input[type="checkbox"]:checked + span {
    &::before {
      width: 100%;
    }
  }
}
</style>
<template>
  <section>
    <!-- 点击文字时，勾选 checkbox。两种方法：
    1 <label for="checkbox的id">文字</label>
    2 把文字和 checkbox 都放在 label 内
     -->
    <label v-for="(item, index) in list" :key="index">
      <input type="checkbox" v-model="item.checked" />
      <span>{{ item.label }}</span>
    </label>
  </section>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          label: "flex布局，当flex-grow之和小于1时，只能按比例分配部分剩余空间，而不是全部",
          checked: true,
        },
        { label: "padding-top设置%，是相对于宽度的。", checked: false },
        {
          label: "background-position 百分比：图片自身的百分比位置与容器同样的百分比位置重合",
          checked: false,
        },
        {
          label: "background-repeat 新属性值：round 凑个整，space 留点缝。",
          checked: false,
        },
      ],
    };
  },
};
</script>
