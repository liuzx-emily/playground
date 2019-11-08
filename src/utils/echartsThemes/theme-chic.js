const COLOR_HIGHLIGHT = "#333";
const axis = {
    // 坐标轴名称
    nameTextStyle: {
        // 默认取 axisLine.lineStyle.color。
        color: COLOR_HIGHLIGHT,
        fontSize: 12,
        fontWeight: "bold",
    },
    // 坐标轴两边留白策略。类目轴设置为true、false，和非类目轴的设置为[a,b]
    boundaryGap: true,
    // 坐标轴轴线
    "axisLine": {
        "show": true,
        "lineStyle": {
            color: "#ddd",
            width: 3,
            type: "solid",
        }
    },
    // 坐标轴的刻度标签
    axisLabel: {
        // 显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』。默认auto
        interval: 0,
        // 默认取 axisLine.lineStyle.color
        color: "#567"
    },
    // 坐标轴的刻度
    "axisTick": {
        "show": false,
    },
    // 分割线
    splitLine: {
        // 是否显示分隔线。默认数值轴显示，类目轴不显示。
        show: true,
        lineStyle: {
            color: '#eee',
            width: 1,
        }
    },
};
const theme = {
    "color": ["#ff7576", "#ffba75", "#75bbff", "#4ce297", "#01a6a6", "#fbc533", "#f89046", "#aad571", "#33cca1", "#fc7e4b", "#3585f6", "#9575cd", "#FB8C00", "#D84315", "#607d8b", "#e6a23c", "#f56c6c", "#795548", "#9d8eb7", "#F9A825"],
    "title": {
        left: 'center',
        top: 10,
        textStyle: {
            color: COLOR_HIGHLIGHT,
            fontSize: 15,
            fontWeight: "bold",
        },
    },
    // 图例
    legend: {
        show: true,
        // 位置靠左，距离顶部30px，垂直排列，每项之间间距20px
        left: "center",
        top: "40",
        orient: "horizontal",
        itemGap: 20,
    },
    grid: {
        // grid左上角位置：默认80 60
        x: 130,
        y: 100,
        // grid右下角位置：默认80 60
        x2: 80,
        y2: 80,
    },
    "line": {
        "itemStyle": {
            "normal": {
                "borderWidth": "2"
            }
        },
        "lineStyle": {
            // 【默认从全局调色盘 option.color 获取颜色】
            width: 4,
            type: "solid",
        },
        // 拐点的大小，默认4
        "symbolSize": "8",
        // 拐点的图形，可选： 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' ，默认： emptyCircle
        "symbol": "circle",
        "smooth": true
    },
    "bar": {
        // 柱条的最大宽度，默认 auto 。可以设置成 number 和 %
        barMaxWidth: 50,
        // 不同系列的柱间距离，默认 30% 。只能设置为 %（如 '30%'，表示每个柱子宽度的 30%）。
        barGap: "10%",
        "itemStyle": {
            "barBorderWidth": 2,
            "barBorderColor": "#ccc",

            "emphasis": {
                "barBorderWidth": 10,
                "barBorderColor": "#ccc"
            }
        }
    },
    "pie": {
        // 圆心位置，默认['50%', '50%'] 。可以设置成像素值[400,300]
        center: ['50%', '55%'],
        // 半径，默认 [0, '75%']。可以设置成像素值[60, 80]
        radius: [40, '75%'],
        label: {
            show: true,
            // 可选 'outside' 'inside' 'center' 。inside和center的区别：对于圆环图，那么inside是在圈环形上，center是在圆心那里。默认outside
            position: 'outside',
            // 默认自适应
            // color:"black",
            fontSize: 12,
            formatter: function(params) {
                // console.log(params);
                return `${params.name}（${params.percent}%）`;
            },
        },
        // 视觉引导线 (label.position=="outside"时，会出现引导线)
        labelLine: {
            show: true,
            // 第一段的长度。
            length: 20,
            // 第二段的长度。
            length2: 20,
            // 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。
            smooth: 0.2,
            // 线条样式
            lineStyle: {
                // 默认自适应
                // color:"red",
                width: 3,
            },
        }, // ---------------------------------------------------
        // ------------------- 不常用的 -----------------------
        // 是否启用图例 hover 时的联动高亮。 默认true
        legendHoverLink: true,
        // 是否开启 hover 在扇区上的放大动画效果。默认true
        hoverAnimation: true,
        // 高亮扇区的偏移距离。默认10
        hoverOffset: 10,
        // 饼图的扇区是否是顺时针排布。默认true
        clockwise: true,
        // 起始角度，支持范围[0, 360]。默认90
        startAngle: 90,
        // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。默认0
        minAngle: 0,
        // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。默认0
        minShowLabelAngle: 0,
        // 是否展示成南丁格尔图，通过半径区分数据大小。可选值'radius' 'area' false。默认false
        // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
        // 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
        roseType: false,
    },
    "gauge": {
        // 仪表盘半径，默认 '75%'
        radius: 150,
        // 起始角度 默认 225
        startAngle: 220,
        // 结束角度 默认 -45
        endAngle: -40,
        // 可读是否为顺时针增长，默认 true
        clockwise: true,
        // 最小的数据值 默认 0
        min: 10,
        // 最大的数据值 默认 100
        max: 100,
        // 仪表盘刻度的分割段数 默认 10
        splitNumber: 8,
        // 仪表盘轴线（圆弧）
        axisLine: {
            lineStyle: {
                width: 15,
                // 颜色区间
                color: [
                    [0.2, '#ff7576'],
                    [0.8, '#75bbff'],
                    [1, '#4ce297']
                ]
            }
        },
        // 分隔线（根据 splitNumber 划分的分隔线）
        splitLine: {
            show: true,
            length: 15,
            lineStyle: {
                color: 'white',
                width: 3,
            }
        },
        // 刻度（一个个小刻度）
        axisTick: {
            show: true,
            // 分隔线之间分割的刻度数。 默认5
            splitNumber: 5,
            length: 10,
            lineStyle: {
                color: 'white',
                width: 1,
            }
        },
        // 刻度标签（注意：普通小刻度不会显示标签，只有分隔线显示）
        axisLabel: {
            show: true,
            // 标签与刻度线的距离 默认 5
            distance: 8,
            // 格式化
            formatter: '{value}%',
            fontSize: 12,
        },
        // 指针
        pointer: {
            show: true,
            // 默认 '80%' ，可以为像素number
            length: '70%',
            width: 7,
        },
        // 标题
        title: {
            show: true,
            // 相对于仪表盘中心的偏移位置，%或number都可以。默认 [0, '-40%'] 
            offsetCenter: [0, 50],
            color: "#555",
            fontSize: 14,
            fontWeight: 'bold',

        },
        // 数据
        detail: {
            show: true,
            offsetCenter: [0, 70],
            formatter: '{value}%',
            color: '#455',
            fontSize: 14,
            fontWeight: 'bold',
        },
    },
    "categoryAxis": axis,
    "valueAxis": axis,
    // "toolbox": {
    //     "iconStyle": {
    //         "normal": {
    //             "borderColor": "#999999"
    //         },
    //         "emphasis": {
    //             "borderColor": "#666666"
    //         }
    //     }
    // },
    "tooltip": {
        // item：散点图、饼图； axis：柱状图，折线图； none
        trigger: 'axis',
        formatter: params => {
            // console.log(params);
            const getStr_line = (params) => {
                let str = params[0].name + '<br/>';
                params.forEach(item => {
                    str += `${item.seriesName}：${item.value}<br/>`;
                });
                return str;
            };
            const getStr_pie = (params) => {
                let item = params[0];
                let str = `${item.name}：${item.value}（${item.percent}%）`;
                return str;
            };
            const getStr_gauge = (params) => {
                let item = params[0];
                let str = `${item.name}：${item.value}%`;
                return str;
            };
            // timeline
            if (params.componentType == "timeline") {
                return params.name;
            }
            // series
            if (!(params instanceof Array)) {
                params = [params];
            }
            const seriesType = params[0].seriesType;
            if (seriesType == "line" || seriesType == "bar") {
                // 折线、柱状图
                return getStr_line(params);
            } else if (seriesType == "pie") {
                // 饼图
                return getStr_pie(params);
            } else if (seriesType == "gauge") {
                // 仪表盘
                return getStr_gauge(params);
            }
        }
    },
    "timeline": {
        // 默认0
        currentIndex: 0,
        autoPlay: true,
        // 是否反向播放 默认false
        rewind: false,
        // 是否循环播放，默认true
        loop: true,
        // 跳动的间隔 默认2000ms
        playInterval: 2000,
        // 拖动圆点的时候，是否实时更新视图。 默认true
        realtime: true,
        // ------------- timeline整体的位置 -------------
        // 可以是 number % 文字( 'left' 'right' 'center' / 'top' 'middle' 'bottom' )，默认'auto'
        // 设置 left:'center' right:'auto'会导致轴过长，放不下，原因未知
        left: '5%',
        top: 'bottom',
        right: '5%',
        // bottom: 'auto',
        // 可选 vertical horizontal
        orient: 'horizontal',
        // ------------- timeline上的一个个小节点 -------------
        // 可选 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' 默认：emptyCircle
        symbol: 'diamond',
        // 可以是number，也可以是[number,number]
        symbolSize: [12, 12],
        // 有的时候，设置了symbolOffset:[0,0]会导致，图表刚刷出来时，第一个节点位置偏移。所以不要设置这项
        // symbolOffset: [0, 0],
        itemStyle: {
            color: "#fff",
            borderColor: "#caf",
            borderWidth: 3,
        },
        // ------------- timeline上当前项节点 -------------
        checkpointStyle: {
            symbol: "diamond",
            symbolSize: 15,
            // 有的时候，设置了symbolOffset:[0,0]会导致，图表刚刷出来时，第一个节点位置偏移。所以不要设置这项
            // symbolOffset: [0, 0],
            color: "#fff",
            borderColor: "#e53",
            borderWidth: 5,
        },
        // ------------- 轴线 -------------
        lineStyle: {
            show: true,
            color: '#fac',
            width: 2,
            type: 'solid',
        },
        // ------------- 文本标签 -------------
        label: {
            show: true,
            // vertical排列时，可选left right；horizontal排列时，可选top bottom。还可以指定具体number值。默认'auto'
            position: 15,
            interval: 0,
            rotate: 5,
            color: "#fac",
            fontSize: 15,
            // formatter:'',
            padding: [0, 30]
        },
        // ------------- 播放、暂停按钮 -------------
        // 可选 left right，默认left
        controlStyle: {
            show: true,
            // vertical排列时，可选left right；horizontal排列时，可选top bottom
            position: 'left',
            itemSize: 30,
            itemGap: 15,
            showPlayBtn: true,
            showPrevBtn: true,
            showNextBtn: true,
            color: '#fac',
            borderColor: "#fac",
            borderWidth: 1,
        },
    },
};
export default theme;