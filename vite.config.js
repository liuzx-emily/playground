import { createVuePlugin } from "vite-plugin-vue2";
const { resolve } = require("path");
export default {
  plugins: [createVuePlugin(/* options */)],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  server: {
    open: false,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3210/",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
