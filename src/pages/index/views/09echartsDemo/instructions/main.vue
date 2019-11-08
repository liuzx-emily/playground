<template>
    <section>
        <color />
        <notice style="margin:10px 0;"/>
        <commonSettings />
    </section>
</template>
<script>
import notice from './notice.vue'
import commonSettings from './commonSettings.vue'
import color from './color.vue'
export default {
    components: { notice, commonSettings,color },
};
</script>