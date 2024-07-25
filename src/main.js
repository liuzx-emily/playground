import { Layout, Menu } from "ant-design-vue";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);
app.use(Layout);
app.use(Menu);
app.use(router);
app.mount("#app");
