<template>
    <section>
        <el-date-picker v-model="startTime" type="date" value-format="timestamp" :picker-options="pickerOption_start" :style="pickerStyle"></el-date-picker>
        至
        <el-date-picker v-model="endTime" type="date" value-format="timestamp" :picker-options="pickerOption_end" :style="pickerStyle"></el-date-picker>
    </section>
</template>
<script>
export default {
    install(Vue) {
        Vue.component("gc-form-item-pickdaterange", this);
    },
    props: {
        fstartTime: {
            default: "",
        },
        fendTime: {
            default: "",
        },
        cannotBeFuture: {
            type: Boolean,
            default: true
        },
        // 宽度
        width: {
            type: String,
            default: ""
        },
    },
    watch: {
        fstartTime: {
            immediate: true,
            handler() {
                this.startTime = this.fstartTime;
            }
        },
        fendTime: {
            immediate: true,
            handler() {
                this.endTime = this.fendTime;
            }
        },
        startTime() {
            let value = "";
            if (this.startTime) {
                let date1 = new Date(this.startTime);
                date1.setHours(0);
                date1.setMinutes(0);
                date1.setSeconds(0);
                date1.setMilliseconds(0);
                value = date1.getTime();
            }
            this.$emit("update:fstartTime", value);
        },
        endTime() {
            let value = "";
            if (this.endTime) {
                let date2 = new Date(this.endTime);
                date2.setHours(23);
                date2.setMinutes(59);
                date2.setSeconds(59);
                date2.setMilliseconds(999);
                value = date2.getTime();
            }
            this.$emit("update:fendTime", value);
        },
    },
    data() {
        return {
            startTime: "",
            endTime: "",
            pickerOption_start: {
                disabledDate: time => {
                    let flag1 = this.endTime && time.getTime() > this.endTime;
                    let flag2 = false;
                    if (this.cannotBeFuture) {
                        flag2 = time.getTime() > Date.now();
                    }
                    return flag1 || flag2;
                }
            },
            pickerOption_end: {
                disabledDate: time => {
                    let flag1 = this.startTime && time.getTime() < this.startTime;
                    let flag2 = false;
                    if (this.cannotBeFuture) {
                        flag2 = time.getTime() > Date.now();
                    }
                    return flag1 || flag2;
                }
            },
        };
    },
    computed: {
        pickerStyle() {
            let style = {};
            if (this.width) {
                style.width = this.width;
            }
            return style;
        }
    },
    methods: {}
};
</script>