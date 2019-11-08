<template>
    <section>
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="timeline" name="chart1">
                <chartTimeline ref="chart1" />
            </el-tab-pane>
            <el-tab-pane label="manypie" name="chart2">
                <chartManyPie ref="chart2" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import chartTimeline from './01timeline.vue'
import chartManyPie from './02manypie.vue'
export default {
    components: {chartTimeline,chartManyPie,},
    data() {
        return {
            activeTab: "chart1"
        }
    },
    mounted() {
        this.$refs[this.activeTab].getData();
    },
    methods: {
        tabClick(tab) {
            let name = tab.name;
            let ref = this.$refs[name];
            this.$nextTick(() => {
                ref.getData();
            })
        }
    }
};
</script>