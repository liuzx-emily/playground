<style lang="less" scoped>
code {
    color: #2196f3;
    font-weight: bold;
    margin: 0 2px;
}
p {
    font-size: 14px;
    line-height: 1.3;
    margin: 10px 0;
}
</style>
<template>
    <section>
        <el-card>
            <div slot="header">
                <span>踩坑</span>
            </div>
            <div>
                <p>1 如果同一个图表组件在页面中多个地方都调用了，那么id一定不能重复，解决方法：<code>randomNum</code>（如果只有一处调用，那么就不需要这样处理了。不过在开发中为了避免需求变动带来麻烦，一律处理一下）</p>
                <p>2 如果图表在tabs中，那么不可以一上来就init所有图表，因为此时处于隐藏状态的的tab中会取不到DOM元素。解决方法：页面加载时，只init当前激活的页签的图表。每次切换页签时，init相应的图，具体见<code>tabClick</code>方法</p>
                <p>3 使用<code>size-sensor</code>包监听chart容器宽度的变化。每次宽度变化，都重新画图：在 mounted 中调用<code>chartResizeWhenWidthChange</code>方法</p>
                <p style="font-size:16px;color:red;font-weight:bold">size-sensor的版本锁定为0.2.2。之前升级到0.2.4，就监听不到了！！！</p>
            </div>
        </el-card>
    </section>
</template>
<script>
export default {
    components: {},
    data() {
        return {}
    },
    mounted() {},
    methods: {}
};
</script>