<script setup>
import { menus } from "../router";
</script>

<template>
  <a-menu theme="dark" mode="inline">
    <template v-for="menu in menus">
      <a-menu-item v-if="!menu.children || menu.children.length === 0" :key="menu.path">
        <RouterLink :to="menu.path">{{ menu.name }}</RouterLink>
      </a-menu-item>
      <a-sub-menu v-else :key="'submenu' + menu.path">
        <template #title>
          <span>
            <span>{{ menu.name }}</span>
          </span>
        </template>
        <a-menu-item v-for="(submenu, index) in menu.children" :key="submenu.path + index">
          <RouterLink :to="submenu.path">{{ submenu.name }}</RouterLink>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
