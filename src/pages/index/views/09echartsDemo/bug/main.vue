<style scoped></style>
<template>
    <section>
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="timeline" name="chart1">
                <bugTimeline ref="chart1" />
            </el-tab-pane>
            <el-tab-pane label="dataset" name="chart2">
                <bugDataset ref="chart2" />
            </el-tab-pane>
            <el-tab-pane label="tree" name="chart3">
                <bugTree ref="chart3" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import bugTimeline from './01timeline.vue'
import bugDataset from './02dataset.vue'
import bugTree from './03tree.vue'
export default {
    props: {},
    components: { bugTimeline, bugDataset,bugTree },
    data() {
        return {
            activeTab: "chart1"
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.$refs[this.activeTab].getData && this.$refs[this.activeTab].getData();
    },
    methods: {
        tabClick(tab) {
            let name = tab.name;
            let ref = this.$refs[name];
            this.$nextTick(() => {
                ref.getData && ref.getData();
            })
        }
    }
};
</script>