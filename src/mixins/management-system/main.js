import sidebarMenu from "./modules/sidebar-menu/main.vue";
import userbox from "./modules/userbox/main.vue";

import './styles/main.less'
export default {
	components: {  sidebarMenu, userbox },
	watch: {
		sidebarNavList() {
			// console.log("sidebarNavList:",this.sidebarNavList);
			this.jumpToFirstNav();
		},
		currentTopNavPath() {
			// console.log("currentTopNavPath:",this.currentTopNavPath);
		},
		initDone(val) {
			if (val) {
				this.$nextTick(() => {});
			}
		}
	},
	computed: {
		ContentWrapStyle() {
			if (this.sidebarNavList.length > 0) {
				return {};
			} else {
				return { marginLeft: 0 };
			}
		},
		currentTopNavPath() {
			let res = /^\/[^/]{1,}/.exec(this.$route.path);
			if (res && res.length > 0) {
				return res[0];
			} else {
				return "";
			}
		},
		// 侧边导航
		sidebarNavList() {
			let currentTopNav_and_children = this.navList.filter(item => item.code == this.currentTopNavPath);
			// url在navList中没有匹配上
			if (currentTopNav_and_children.length === 0) {
				return [];
			}
			let child = currentTopNav_and_children[0].child;
			if (child && child.length > 0) {
				return currentTopNav_and_children[0].child;
			} else { return []; }
		},
		initDone() { return this.initDone_menu && this.initDone_btn; }
	},
	created() {},
	mounted() {},
	data() {
		return {
			initDone_menu: false,
			// 因为用v-permission控制按钮权限，所以一定要先获取到所有按钮的权限
			initDone_btn: false,
			// 总导航
			navList: [],
		};
	},
	methods: {
		refreshNavList(data) {
			const navList = this.xtools.arrayToTree(data, { id: "id", parentId: "parentId", children: "child" });
			if (navList && navList.length > 0) {
				this.navList = navList;
				this.initDone_menu = true;
				// 页面刷新后，需要等待一段时间才能取到正确的 $route。在这之前，this.$route.path 都是 /
				setTimeout(() => {
					// 如果现在没有进入任何一个页面，则手动跳转到第一个菜单
					if (this.$route.path == "/") {
						this.$router.push(navList[0].code);
					}
				}, 500);
			} else {
				this.initDone_menu = true;
			}
		},
		refreshPermissionBtns(data) {
			this.$store.state.permissionBtns = this._.map(data, "code");
			this.initDone_btn = true;
		},
		// 如果访问本组件的根地址，自动跳转到第一个菜单
		jumpToFirstNav() {
			const findRealPage = list => {
				if (list && list.length > 0) {
					// list不是空的
					let firstChild = list[0];
					if (firstChild.type == 1) {
						// type==1，是导航，需要接着往下找
						return findRealPage(firstChild.child);
					} else if (firstChild.type == 2) {
						// type==2，是页面
						return firstChild.code;
					} else {
						// type为其他，权限肯定是配错了！
					}
				} else {
					// 是空的
				}
			};
			if (this.$route.path == this.currentTopNavPath) {
				let realPageCode = findRealPage(this.sidebarNavList);
				realPageCode && this.$router.push(realPageCode);
			}
		},
		handleSidebarMouseenter() {
			document.getElementById('sidebarWrap').classList.add("temp_showFullSidebar");
		},
		handleSidebarMouseleave(e) {
			document.getElementById('sidebarWrap').classList.remove("temp_showFullSidebar");
		},
	}
}