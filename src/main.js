import Vue from "vue";

// router
import VueRouter from "vue-router";
Vue.use(VueRouter);
const modules = import.meta.glob("./views/*/*.vue");
const routeList = [];
for (const path in modules) {
  const [, dirName, fileName] = path.match(/views\/([^/]+)\/([^.]+)\.vue$/);
  if (fileName === "main" || dirName === fileName) {
    routeList.push({
      name: dirName,
      path: "/" + dirName,
      component: modules[path],
    });
  }
}
const router = new VueRouter({
  mode: "history",
  routes: routeList,
});

import App from "./App.vue";

new Vue({
  render: (h) => h(App),
  router: router,
  data() {
    return {
      navList: routeList,
    };
  },
}).$mount("#app");
