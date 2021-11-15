<style lang="scss">
body {
  margin: 0;
}
span {
  display: inline-block;
}
#app {
  display: flex;
  .demo-left {
    vertical-align: top;
    flex: 0 0 200px;
    height: 100vh;
    overflow-y: auto;
    a {
      display: block;
      font-size: 12px;
      text-decoration: none;
      color: black;
      padding: 8px;
      border-bottom: 2px solid #eee;
      &.router-link-active {
        background: burlywood;
      }
    }
  }
  .demo-right {
    flex: 1 1 80%;
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
<template>
  <div id="app">
    <nav class="demo-left">
      <router-link v-for="item in $root.navList" :key="item.code" :to="item.code">{{
        item.name
      }}</router-link>
    </nav>
    <router-view :key="$route.fullPath" class="demo-right"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
