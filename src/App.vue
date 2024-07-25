<script setup>
import SideMenu from "./components/SideMenu.vue";
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider collapsible>
      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 16px">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style>
body {
  margin: 0;
}
.ant-layout {
  background: none;
}
</style>
