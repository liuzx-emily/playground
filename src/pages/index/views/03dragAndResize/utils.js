export function render_background(vueInstance) {
	const target = vueInstance.containerEle;
	const data = vueInstance.data;
	const type = data.backgroundType
	if (type == 1) {
		// 无
		target.style.background = 'none';
	} else if (type == 2) {
		// 颜色
		target.style.background = data.backgroundColor;
	} else if (type == 3) {
		// 背景图片
		target.style.backgroundImage = `url(${data.backgroundImgUrl})`;
		target.style.backgroundSize = "cover";
		// target.style.backgroundPosition = "center center";
		target.style.backgroundRepeat = "no-repeat";
	}
}
export function render_border(vueInstance) {
	const target = vueInstance.containerEle;
	const data = vueInstance.data;
	target.style.borderRadius = data.borderRadius + "px";
	if (data.borderStyle == 1) {
		// 无
		target.style.border = 'none';
	} else {
		target.style.borderStyle = data.borderStyle;
		target.style.borderColor = data.borderColor;
		target.style.borderWidth = data.borderWidth + "px";
	}
}
export function findById(father, id) {
	let list = father.list;
	if (list && list.length > 0) {
		for (let i = 0; i < list.length; i++) {
			let item = list[i];
			if (item.id === id) {
				return { me: item, father: father, index: i };
			}
			const res = findById(item, id);
			if (res) {
				return res;
			}
		}
		return false;
	} else {
		return false;
	}
}