import xaxios from '~/axios.js'
export default class CascadingAddress {
	constructor(options) {
		// 是否添加 "请选择"这一空项？
		this.hasNullOption = options.hasNullOption;
		// DOM元素
		this.domElement = {
			levelOne: options.elSelectLevelOne,
			levelTwo: options.elSelectLevelTwo,
			levelThree: options.elSelectLevelThree,
		};
		this.value = {
			levelOne: "",
			levelTwo: "",
			levelThree: "",
		};
		this.bindListeners();
		this.getLevelOneData();
	}

	setValue(data) {
		this.value = {
			levelOne: data.levelOne || "",
			levelTwo: data.levelTwo || "",
			levelThree: data.levelThree || "",
		};
		this.getLevelOneData();
	}
	getValue() {
		return {
			levelOne: this.value.levelOne,
			levelTwo: this.value.levelTwo,
			levelThree: this.value.levelThree,
		}
	}
	toString() {
		return `${this.value.levelOne}-${this.value.levelTwo}-${this.value.levelThree}`
	}
	getLevelOneData() {
		xaxios({
			url: "/api/district/getByParentCode.bay",
		}).then(res => {
			let { strHtml, isValidValue } = this._processResponse(res, this.value.levelOne);
			if (!isValidValue) {
				// 不是有效值(无效值，或者没有值)
				this.value.levelOne = "";
				this.value.levelTwo = "";
				this.value.levelThree = "";
			}
			// 设置 strHtml 之后，DOM元素的value值会变化，但不会触发change事件。所以要手动调用 getLevelTwoData()
			this.domElement.levelOne.innerHTML = strHtml;
			this.getLevelTwoData();
		});
	}
	getLevelTwoData() {
		xaxios({
			url: "/api/district/getByParentCode.bay",
			params: { parentCode: this.value.levelOne }
		}).then(res => {
			let { strHtml, isValidValue } = this._processResponse(res, this.value.levelTwo);
			if (!isValidValue) {
				// 不是有效值(无效值，或者没有值)
				this.value.levelTwo = "";
				this.value.levelThree = "";
			}
			// 设置 strHtml 之后，DOM元素的value值会变化，但不会触发change事件。所以要手动调用 getLevelThreeData()
			this.domElement.levelTwo.innerHTML = strHtml;

			this.getLevelThreeData();
		});
	}
	getLevelThreeData() {
		xaxios({
			url: "/api/district/getByParentCode.do",
			params: { parentCode: this.value.levelTwo }
		}).then(res => {
			let { strHtml, isValidValue } = this._processResponse(res, this.value.levelThree);
			if (!isValidValue) {
				// 不是有效值(无效值，或者没有值)
				this.value.levelThree = "";
			}
			this.domElement.levelThree.innerHTML = strHtml;
		});
	}
	bindListeners() {
		this.domElement.levelOne.addEventListener("change", e => {
			console.log("触发1级select的change事件！");
			this.value.levelOne = this.domElement.levelOne.value;
			this.getLevelTwoData();
		});

		this.domElement.levelTwo.addEventListener("change", e => {
			this.value.levelTwo = this.domElement.levelTwo.value;
			this.getLevelThreeData();
		});

		this.domElement.levelThree.addEventListener("change", e => {
			this.value.levelThree = this.domElement.levelThree.value;
		});
	}
	// 返回值包括 strHtml 和 isValidValue
	// strHtml：匹配的option已经添加上 "select" 属性了（设置oSelect.innerHTML=strHtml并生效之后，oSelect的value会变化，但不会触发change事件。）
	// isValidValue：currentValue是否为有效值。只有当currentValue不为空，并且在备选list里时，才是true。
	_processResponse(res, currentValue) {
		var isValidValue = false;
		let list = res.data.map(item => {
			let obj = {
				label: item.name,
				value: item.code,
				selected: false,
			};
			if (currentValue && (item.code === currentValue)) {
				obj.selected = true;
				isValidValue = true;
			}
			return obj;
		})
		if (list.length > 0 && this.hasNullOption) {
			list.unshift({ value: "", label: "请选择", selected: false, });
		}
		let strHtml = "";
		list.forEach(item => {
			strHtml += `<option value="${item.value}" ${item.selected?"selected":""}>${item.label}</option>`;
		});
		console.log(strHtml);
		return { strHtml, isValidValue };
	}
};