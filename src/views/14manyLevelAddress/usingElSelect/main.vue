<style scoped>
code {
  font-weight: normal;
}
</style>
<template>
  <section>
    <h6>使用element中的 el-select，它不是真正的select。</h6>
    <p>设置value的时候，即使匹配不上，也用新值。这一点和真的select不一样！</p>
    <section>
      <!-- 可选参数hasNullOption：是否添加 "请选择"这一空项（默认为true） -->
      <!-- 可选参数width，默认为"" -->
      <cascadingAddress
        :flevelOne.sync="searchparam.address_levelone"
        :flevelTwo.sync="searchparam.address_leveltwo"
        :flevelThree.sync="searchparam.address_levelthree"
        :hasNullOption="true"
        width=""
      />
    </section>
    <p>
      <input type="button" @click="do_fuzhi(1)" value="赋值：空" />
      <input type="button" @click="do_fuzhi(2)" value="赋值：河北-张家口-下花园" />
      <input type="button" @click="do_fuzhi(3)" value="赋值：安徽-蚌埠-空" />
      <input type="button" @click="do_fuzhi(4)" value="赋值：山东-空-空" />
      <input type="button" @click="printParam" value="打印参数" />
    </p>
  </section>
</template>
<script>
import cascadingAddress from "./cascading-address.vue";
export default {
  props: {},
  components: { cascadingAddress },
  data() {
    return {
      // 广东 - 广州 - 海珠
      searchparam: {
        address_levelone: "440000",
        address_leveltwo: "440100",
        address_levelthree: "440105",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    printParam() {
      console.log(
        `${this.searchparam.address_levelone}-${this.searchparam.address_leveltwo}-${this.searchparam.address_levelthree}`
      );
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
    },
  },
};
</script>
