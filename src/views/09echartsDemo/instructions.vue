<template>
  <section class="assistance">
    <p>
      配色：<span
        v-for="color in colorArr"
        :key="color"
        :style="{ background: color }"
        style="width: 50px; height: 20px"
      ></span>
    </p>
    <p>1 如果同一个图表组件在页面中多个地方都调用了，那么一定要注意id不能重复</p>
    <p>
      2 如果图表在 tabs 中，那么不可以一上来就 init 所有图表，因为此时处于隐藏状态的的 tab
      中会取不到 DOM 元素。解决方法：页面加载时，只 init 当前激活的页签的图表。每次切换页签时，init
      相应的图
    </p>
    <p>
      3 使用 size-sensor 包监听 chart 容器宽度的变化。在 mounted
      中调用<code>chartResizeWhenWidthChange</code>方法（size-sensor的版本锁定为0.2.2，后续版本有
      bug）
    </p>
    <section>
      <label><input type="radio" value="1" v-model="settingsDemo" />坐标轴设置</label>
      <label><input type="radio" value="2" v-model="settingsDemo" />lineStyle</label>
      <label><input type="radio" value="3" v-model="settingsDemo" />grid</label>
      <label><input type="radio" value="4" v-model="settingsDemo" />legend</label>
      <pre v-show="settingsDemo == 1">
      1 type：坐标轴类型。
          category ：类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
          value ：数值轴，适用于连续数据。
          time ：时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
          log ：对数轴。适用于对数数据。
          
      2 boundaryGap 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
          类目轴：true false
              默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。            
          非类目轴：[a,b]
              a、b分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效。
              
      3 minInterval 坐标轴最小间隔 
          只在数值轴或时间轴中（type: 'value' 或 'time'）有效。
          例如可以设置成1保证坐标轴分割刻度显示成整数。
      </pre>
      <pre v-show="settingsDemo == 2">
        // 线条样式
        lineStyle: {
            // 线的颜色【可以做线性渐变、径向渐变和纹理填充】
            // color:"red",
            // 宽度，默认2
            width: 4,
            // 线的类型，可选： solid dashed dotted ，默认 solid 
            type: "solid",
            // 图形阴影的模糊大小
            shadowBlur: 0,
            // 阴影颜色
            shadowColor: "#000",
            // 阴影水平方向上的偏移距离，默认0
            shadowOffsetX: 0,
            // 阴影垂直方向上的偏移距离，默认 0
            shadowOffsetY: 0,
        },
      </pre>
      <pre v-show="settingsDemo == 3">
        grid: {
            // grid左上角位置：默认80 60
            x: 80,
            y: 70,
            // grid右下角位置：默认80 60
            x2: 80,
            y2: 80,
        },
      </pre>
      <pre v-show="settingsDemo == 4">
        // 图例
        legend: {
            show: true,
            // -------------------- 位置 --------------------------
            // 可以是number，百分比，或者'left', 'center', 'right'。
            left: "left",
            // 可以是number，百分比，或者'top', 'middle', 'bottom'。
            top: "30",
            // 可以是number，百分比。
            right: "auto",
            // 可以是number，百分比。
            bottom: "auto",
            // 排列方式，可选 'horizontal' 'vertical'
            // ---------------------------------------------------
            orient: "vertical",
            // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。默认10
            itemGap: 20,
            // 是否可以通过点击图例改变系列的显示状态
            selectedMode: true,
            // data 会自动从当前系列中获取。一般会取自 series.name，如 饼图 and 漏斗图 等会取自 series.data 中的 name。
            // data: ['苹果'],
            // 背景和边框【是整体的，不是每项的】
            backgroundColor: "#cab",
            borderColor: "#abc",
            borderWidth: 5
        },
      </pre>
      <pre v-show="settingsDemo == 5">
        // 提示框
        tooltip: {
            /*
            触发类型 默认item                 
                item:主要在散点图，饼图等无类目轴的图表中使用
                axis:坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                none
            */
            trigger: 'axis',
            formatter: function(params) {
                return params[0].name + '&lt;br/&gt;' +
                    params[0].seriesName + ' : ' + params[0].value + '&lt;br/&gt;' +
                    params[1].seriesName + ' : ' + (params[1].value + params[0].value);
            }
        },
      </pre>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      settingsDemo: "1",
      colorArr: [
        "#ff7576",
        "#ffba75",
        "#75bbff",
        "#4ce297",
        "#01a6a6",
        "#fbc533",
        "#f89046",
        "#aad571",
        "#33cca1",
        "#3585f6",
        "#9575cd",
        "#FB8C00",
        "#D84315",
      ],
    };
  },
};
</script>
