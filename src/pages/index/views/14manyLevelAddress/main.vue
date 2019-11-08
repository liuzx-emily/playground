<style scoped></style>
<template>
    <section>
        <jqueryVersion />
        <vueVersion />
    </section>
</template>
<script>
import jqueryVersion from './modules/01jqueryVersion.vue'
import vueVersion from './modules/02vueVersion.vue'
export default {
    props: {},
    components: { jqueryVersion, vueVersion, },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>