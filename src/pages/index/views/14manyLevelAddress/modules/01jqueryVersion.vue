<style scoped>
    select{
    width: 100px;
    margin-bottom: 12px;
    border:1px solid #ddd;
    padding: 5px;
    color:#555;
}
hr{
    background: #eee;
    height: 4px;
    border: none;
    margin: 15px 0;
}
</style>
<template>
    <el-card>
        <div slot="header">
            jQuery版本
        </div>
        <!-- card body -->
        <p>1 设置全局变量<code>duringPositionRetrival</code>和<code>positionRetrival_levelOne</code>等</p>
        <p>2 全局配置项<code>positionRetrival_hasNull</code>：是否添加"请选择"这一项</p>
        <p>3 在vue项目中演示，所以把初始化方法放在 mounted中。如果不放在vue项目里，那么初始化代码还是放在<code>$(function(){})</code>中</p>
        <p>4 如果页面中有多个，那么全局变量和DOM元素的id会冲突，需要修改一下。</p>
        <hr>
        <section>
            <select id="select_levelOne"></select>
            <select id="select_levelTwo"></select>
            <select id="select_levelThree"></select>
        </section>
        <p>
            <el-button type="primary" class="size-small" @click="do_fuzhi(1)">赋值：空</el-button>
            <el-button type="success" class="size-small" @click="do_fuzhi(2)">赋值：河北-张家口-下花园</el-button>
            <el-button type="warning" class="size-small" @click="do_fuzhi(3)">赋值：安徽-蚌埠-空</el-button>
            <el-button type="danger" class="size-small" @click="do_fuzhi(4)">赋值：山东-空-空</el-button>
        </p>
        <p>
            <el-button type="primary" class="size-small" @click="printParam">打印参数</el-button>
        </p>
    </el-card>
</template>
<script>
import { initPositionSelect, data_retrival } from './01jqueryVersion.js'
export default {
    props: {},
    components: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        initPositionSelect();
        // 广东 - 广州 - 海珠
        let data = {
            levelOne: "440000",
            levelTwo: "440100",
            levelThree: "440105",
        };
        data_retrival(data);
    },
    methods: {
        do_fuzhi(type) {
            let data;
            if (type == 1) {
                data = {
                    levelOne: "",
                    levelTwo: "",
                    levelThree: "",
                };
            } else if (type == 2) {
                // 河北-张家口-下花园
                data = {
                    levelOne: "130000",
                    levelTwo: "130700",
                    levelThree: "130706",
                };
            } else if (type == 3) {
                // 安徽-蚌埠-空
                data = {
                    levelOne: "340000",
                    levelTwo: "340300",
                    levelThree: "",
                };
            } else if (type == 4) {
                // 山东-空-空
                data = {
                    levelOne: "370000",
                    levelTwo: "",
                    levelThree: "",
                };
            }
            data_retrival(data);
        },
        printParam() {
            console.log(`一级地址：${document.querySelector("#select_levelOne").value}`);
            console.log(`二级地址：${document.querySelector("#select_levelTwo").value}`);
            console.log(`三级地址：${document.querySelector("#select_levelThree").value}`);
        }
    }
};
</script>