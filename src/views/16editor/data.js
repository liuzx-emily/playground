let range = null;
export const toolbar = [
	{ label: "后退", key: "undo", },
	{ label: "前进", key: "redo", },
	{ label: "清除所有格式", key: "removeFormat", },
	{ label: "加粗", key: "bold", },
	{ label: "背景红色", key: "backColor", args: "red" },
	{ label: "微软雅黑", key: "fontName", args: "微软雅黑" },
	{ label: "字号变大", key: "fontSize", args: "7" }, /* 1-7 */
	{ label: "文字白色", key: "foreColor", args: "white" },
	{ label: "居中", key: "justifyCenter", },
	{ label: "左对齐", key: "justifyLeft", },
	{ label: "右对齐", key: "justifyRight", },
	{ label: "插入水平线", key: "insertHorizontalRule", },
	{ label: "插入图片", key: "insertImage", args: "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" },
	{ label: "插入图片2", key: "insertImage", args: require("./images/module2-1.png") },
	{ label: "标题h1", key: "formatBlock", args: "<h1>" },
	{ label: "标题h2", key: "formatBlock", args: "<h2>" },
	{ label: "标题h3", key: "formatBlock", args: "<h3>" },
	{ label: "标题h4", key: "formatBlock", args: "<h4>" },
	{ label: "标题h5", key: "formatBlock", args: "<h5>" },
	{ label: "标题h6", key: "formatBlock", args: "<h6>" },
	{
		label: "插入链接",
		customedCb: function() {
			let url = window.prompt("请输入要跳转的链接");
			document.execCommand("createLink", false, url);
		},
	},
	{
		label: "记录光标位置",
		customedCb: function() {
			let selection = window.getSelection();
			console.log(selection);
			if (selection.rangeCount > 0) {
				range = selection.getRangeAt(0);
			} else {
				range = null;
			}
			console.log(range);
		},
	}, {
		label: "恢复光标位置",
		customedCb: function() {
			let selection = window.getSelection();
			selection.removeAllRanges();
			if (range) {
				selection.addRange(range);
			}
		},
	},
]