import Node from './node'
class TreeStore {

	constructor() {
		this.currentKey = null;
		this.currentNode = null;
		this.data = [];
		this.nodeMap = {};
	}

	setData(list) {
		list.forEach(item => {
			item.store = this;
			item.parent = null;
			let node = new Node(item);
			this.data.push(node);
			this._registerNode(node);
		});
	}

	setCurrentKey(id) {
		for (let nodeKey in this.nodeMap) {
			this.nodeMap[nodeKey].active = false;
		}
		if (!id) {
			this.currentKey = null;
			this.currentNode = null;
		} else {
			this.currentKey = id;
			this.currentNode = this.nodeMap[this.currentKey];
			this.currentNode.active = true;
		}
	}

	insertChild(parentId) {
		const _recursionSearch = list => {
			list.forEach(node => {
				if (node.id === parentId) {
					let item = {
						store: this,
						parent: node,
						parentId: parentId,
						active: true,
					};
					let new_node = new Node(item);
					node.children.push(new_node);
					this._registerNode(new_node);
				} else {
					_recursionSearch(node.children);
				}
			});
		};
		_recursionSearch(this.data);
	}

	removeNode(node) {
		if (node.parent) {

		} else {
			let index = node.parent.children.indexOf(node);
			console.log(index);
		}
		// const _recursionSearch = list => {
		// 	list.forEach((node, index) => {
		// 		if (node.id === id) {
		// 			list.splice(index, 1);
		// 			this._deregisterNode(id);
		// 		} else {
		// 			_recursionSearch(node.children);
		// 		}
		// 	});
		// };
		// _recursionSearch(this.data);
	}

	_registerNode(node) {
		this.nodeMap[node.id] = node;
	}

	_deregisterNode(id) {
		delete this.nodeMap[id];
	}
}
export default TreeStore;