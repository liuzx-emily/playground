import { createWebHashHistory, createRouter } from "vue-router";

import CanvasArtboard from "./views/canvas-artboard";
import CanvasGauge from "./views/canvas-gauge";
import CanvasPhotoEffects from "./views/canvas-photo-effects";
import CanvasSunrise from "./views/canvas-sunrise";
import CssMagician from "./views/css-magician";
import LifeGame from "./views/life-game";
import WuZiQi from "./views/wu-zi-qi";
import LinkGame from "./views/link-game";
import SuperUploader from "./views/super-uploader";

export const menus = [
  {
    name: "canvas",
    children: [
      { name: "画板", path: "/canvas/artboard", component: CanvasArtboard },
      { name: "仪表盘", path: "/canvas/gauge", component: CanvasGauge },
      { name: "图片效果", path: "/canvas/photo-effects", component: CanvasPhotoEffects },
      { name: "日初动画", path: "/canvas/sunrise", component: CanvasSunrise },
    ],
  },
  { name: "css 效果", path: "/css-magician", component: CssMagician },
  { name: "康威生命游戏", path: "/life-game", component: LifeGame },
  { name: "五子棋", path: "/wu-zi-qi", component: WuZiQi },
  { name: "连连看", path: "/link-game", component: LinkGame },
  { name: "Super Uploader", path: "/super-uploader", component: SuperUploader },
];

const routes = [{ path: "/", redirect: "/link-game" }];

walkThroughTree(menus, (menu) => {
  if (menu.path && menu.component) {
    routes.push({
      path: menu.path,
      component: menu.component,
    });
  }
});

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function walkThroughTree(treeArr, cb) {
  for (let i = 0; i < treeArr.length; i++) {
    const element = treeArr[i];
    cb(element);
    if (element?.children?.length > 0) {
      walkThroughTree(element.children, cb);
    }
  }
}
