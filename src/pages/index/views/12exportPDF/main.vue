<style>
    code {
    color: #2196f3;
    font-weight: bold;
    font-size: 14px;
    margin: 0 5px;
}
</style>
<template>
    <section>
        <el-card>
            <div slot="header">
                <span>说明</span>
            </div>
            <p>1 具体的导出方法<code>exportPDF</code>写在<code>/src/utils/xExportPdf.js</code>中，在<code>main.js</code>中已经全局引入了。</p>
            <p>2 为了演示效果，在系统的顶部栏中添加了演示按钮。</p>
            <p style="color:crimson;font-weight:bold;">3 打印的元素不能选择如#mainContentWrap这样的元素，因为它们是限高的，是内部出滚动条的。</p>
        </el-card>
        <el-button type="primary" @click="do_exportPDF">导出pdf</el-button>
    </section>
</template>
<script>
export default {
    methods: {
        do_exportPDF() {
            let obj = document.querySelector('#mainContent');
            // let obj = document.querySelector('#mainContentWrap>*');
            let fileName = "哈哈";
            this.exportPDF(obj, fileName);
        }
    }
};
</script>