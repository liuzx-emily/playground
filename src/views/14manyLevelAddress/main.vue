<style lang="scss" scoped>
section:v-deep {
  font-size: 12px;
}
</style>
<template>
  <section>
    <usingSelect />
    <usingElSelect />
  </section>
</template>
<script>
import usingSelect from "./usingSelect/main.vue";
import usingElSelect from "./usingElSelect/main.vue";
export default {
  components: { usingSelect, usingElSelect },
};
</script>
