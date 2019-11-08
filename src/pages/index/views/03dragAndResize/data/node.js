import _ from 'lodash'
import xtools from '~/utils/tools.js'
class Node {
	constructor(data) {
		this.store = data.store;
		this.parent = data.parent;
		this.active = false;
		this.vueInstance = null;
		// 
		this.id = data.id || xtools.randomId();
		this.parentId = data.parentId;
		this.x = data.x || 0;
		this.y = data.y || 0;
		this.width = data.width || 100;
		this.height = data.height || 50;
		this.title = data.title || "新元素-标题";
		this.content = data.content || "新元素-内容";
		this.backgroundType = data.backgroundType || 2;
		this.backgroundColor = data.backgroundColor || "#ede";
		this.backgroundImgUrl = data.backgroundImgUrl || "";
		this.borderRadius = data.borderRadius || 5;
		this.borderStyle = data.borderStyle || "solid";
		this.borderColor = data.borderColor || "#eee";
		this.borderWidth = data.borderWidth || 0;
		// children
		if (data.list && data.list.length > 0) {
			this.children = data.list.map(item => {
				item.parent = this;
				let magicInstance = new Node(item);
				this.store.registerNode(magicInstance);
				return magicInstance;
			});
		} else {
			this.children = [];
		}
	}
}
export default Node;