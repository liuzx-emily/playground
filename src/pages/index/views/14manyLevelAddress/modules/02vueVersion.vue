<style scoped>
    code{
        font-weight: normal;
    }
</style>
<template>
    <el-card>
        <div slot="header">
            vue版本
        </div>
        <!-- card body -->
        <section>
            <!-- 可选参数hasNullOption：是否添加 "请选择"这一空项（默认为true） -->
            <!-- 可选参数width，默认为"" -->
            <gm-cascading-address :flevelOne.sync="searchparam.address_levelone" :flevelTwo.sync="searchparam.address_leveltwo" :flevelThree.sync="searchparam.address_levelthree" :hasNullOption="true" width="" />
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
export default {
    props: {},
    components: {},
    data() {
        return {
            // 广东 - 广州 - 海珠
            searchparam: {
                address_levelone: "440000",
                address_leveltwo: "440100",
                address_levelthree: "440105",
            }
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        printParam() {
            console.log(`一级地址：${this.searchparam.address_levelone}`);
            console.log(`二级地址：${this.searchparam.address_leveltwo}`);
            console.log(`三级地址：${this.searchparam.address_levelthree}`);
        },
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
            this.searchparam.address_levelone = data.levelOne;
            this.searchparam.address_leveltwo = data.levelTwo;
            this.searchparam.address_levelthree = data.levelThree;
        }
    }
};
</script>