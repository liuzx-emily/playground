import _ from 'lodash';
import { Loading, MessageBox, Message } from 'element-ui';
import xaxios from '~/axios.js'
const tools = {
	// -------------------------- Array --------------------------
	arrayToTree(dataArr, param) {
		param = param || {};
		const before_idkey = param.id || "id";
		const before_parentkey = param.parentId || "parentId";
		const after_childkey = param.children || "child";
		let tree = dataArr.filter((father) => {
			//循环所有项
			let branchArr = dataArr.filter((child) => {
				//返回每一项的子级数组        
				return father[before_idkey] == child[before_parentkey]
			});
			if (branchArr.length > 0) {
				//如果存在子级，则给父级添加一个child属性，并赋值        
				father[after_childkey] = branchArr;
			}
			//返回没有父级的
			return !(dataArr.some(function(item) {
				return item[before_idkey] === father[before_parentkey];
			}));
		});
		//返回树形数据
		return tree;
	},
	// -------------------------- Date --------------------------
	formattingDate(timestamp, pattern) {
		if (!timestamp) {
			return "";
		}
		var oDate = new Date(+timestamp);
		if (pattern === undefined || pattern == 1) {
			pattern = "yyyy-MM-dd";
		} else if (pattern == 2) {
			pattern = "yyyy-MM-dd hh:mm:ss";
		}
		pattern = pattern.replace(/yyyy/i, oDate.getFullYear());
		pattern = pattern.replace(/yy/gi, (oDate.getYear() % 100) > 9 ? (oDate.getYear() % 100).toString() : '0' + (oDate.getYear() % 100));
		var month = oDate.getMonth() + 1;
		pattern = pattern.replace(/MM/, month > 9 ? month.toString() : '0' + month);
		pattern = pattern.replace(/M/g, month);
		pattern = pattern.replace(/w|W/g, '日一二三四五六' [oDate.getDay()]);
		var date = oDate.getDate();
		pattern = pattern.replace(/dd/i, date > 9 ? date.toString() : '0' + date);
		pattern = pattern.replace(/d/gi, date);
		var hour = oDate.getHours();
		pattern = pattern.replace(/hh/i, hour > 9 ? hour.toString() : '0' + hour);
		pattern = pattern.replace(/h/ig, hour);
		var minute = oDate.getMinutes();
		pattern = pattern.replace(/mm/, minute > 9 ? minute.toString() : '0' + minute);
		pattern = pattern.replace(/m/g, minute);
		var second = oDate.getSeconds();
		pattern = pattern.replace(/ss/i, second > 9 ? second.toString() : '0' + second);
		pattern = pattern.replace(/s/ig, second);
		return pattern;
	},
	// 几天前 几分钟前 刚刚
	dateAgo(time, nowTime = +new Date()) {
		var diffValue = nowTime - time,
			result = '',
			minute = 1000 * 60,
			hour = minute * 60,
			day = hour * 24,
			halfamonth = day * 15,
			month = day * 30,
			year = month * 12,

			_year = diffValue / year,
			_month = diffValue / month,
			_week = diffValue / (7 * day),
			_day = diffValue / day,
			_hour = diffValue / hour,
			_min = diffValue / minute;

		if (_year >= 1) result = parseInt(_year) + "年前";
		else if (_month >= 1) result = parseInt(_month) + "个月前";
		else if (_week >= 1) result = parseInt(_week) + "周前";
		else if (_day >= 1) result = parseInt(_day) + "天前";
		else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
		else if (_min >= 1) result = parseInt(_min) + "分钟前";
		else result = "刚刚";
		return result;
	},
	getBetweenDays(day1, day2, pattern) {
		if (pattern == "timestamp") {
			// 获取输入日期的毫秒数
			var d1Ms = day1;
			var d2Ms = day2;
		} else {
			// 获取入参字符串形式日期的Date型日期
			var d1 = day1.getDate();
			var d2 = day2.getDate();
			// 获取输入日期的毫秒数
			var d1Ms = d1.getTime();
			var d2Ms = d2.getTime();
		}
		var dayMilliSeconds = 1000 * 60 * 60 * 24;

		// 定义返回值
		var ret;
		// 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
		// 每次循环结束，给d1Ms 增加一天
		for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
			// 如果ret为空，则无需添加","作为分隔符
			if (!ret) {
				ret = this.formatDate(d1Ms);
			} else {
				ret = ret + "," + this.formatDate(d1Ms);
			}
		}
		return ret.split(","); // 或可换为return ret;
	},
	// -------------------------- String --------------------------
	// 生成随机id（最长10位）
	randomId: (len = 10) => Math.random().toString(36).substr(3, len),
	// 格式化金钱  formattingMoney(19941112) -> "19,941,112"
	formattingMoney: num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
	// 格式化大小
	formattingSize: (size) => {
		size = parseInt(size);
		if (size < 1024) {
			return "1KB";
		} else if (size < 1024 * 1024) {
			return tools.roundNum(size / 1024, 1) + "KB";
		} else if (size < 1024 * 1024 * 1024) {
			return tools.roundNum(size / 1024 / 1024, 1) + "MB";
		} else {
			return tools.roundNum(size / 1024 / 1024 / 1024, 1) + "GB";
		}
	},
	// 生成随机色值
	randomColor() { return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0"); },
	// -------------------------- Number --------------------------
	// 精确小数
	roundNum: (num, decimal = 2) => Math.round(num * 10 ** decimal) / 10 ** decimal,
	// 补零   fillZero(169, 5) -> "00169"
	fillZero: (num, len = 5) => num.toString().padStart(len, "0"),
	// 判断奇偶  oddEven(2) -> "even"
	oddEven: num => !!(num & 1) ? "odd" : "even",
	// 生成随机数  randomNum(1, 100) -> 28
	randomNum: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
	// -------------------------- 浏览器相关 --------------------------
	getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) {
			//用decodeURI来解码
			return decodeURI(r[2]);
		} else {
			return null;
		}
	},
	getWindowSize() {
		return {
			width: Math.max(
				document.documentElement.clientWidth,
				window.innerWidth
			),
			height: Math.max(
				document.documentElement.clientHeight,
				window.innerHeight
			)
		}
	},
	// 显示全部DOM边框：开发阶段使用
	debuggingAddBorder() {
		[].forEach.call($$("*"), dom => {
			dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
		});
	},
	// -------------------------- 业务中，经常用到的功能 --------------------------
	// 打开询问框
	openConfirm(params) {
		let { confirmFunc, msg } = params;
		MessageBox.confirm(msg, '', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			customClass: 'general-confirm-box'
		}).then(() => {
			confirmFunc();
		}).catch(error => {});
	},
	// 打开"删除"询问框
	openConfirm_delete(params) {
		let { url, data, refreshFunc } = params;
		const confirmFunc = () => {
			let loadingInstance = Loading.service({
				fullscreen: true,
				lock: true,
				background: 'rgba(0, 0, 0, 0.2)',
			});
			xaxios({
				method: 'post',
				url: url,
				data: data
			}).then(res => {
				if (res.code == 1) {
					Message({
						type: 'success',
						message: '删除成功！'
					});
					// 刷新
					refreshFunc && refreshFunc();
				}
				loadingInstance.close();
			})
		};
		tools.openConfirm({
			confirmFunc,
			msg: `您确认要删除吗？`
		});
	},
	// 对于el-input-number组件，null值会显示为0。所以要手动把null改为undefined，这样就是空了。
	processForElementNumberInput(data, keyArr) {
		var processObj = (obj) => {
			let res = _.cloneDeep(obj);
			_.forEach(keyArr, (key) => {
				if (res[key] === null || res[key] === "") {
					res[key] = undefined;
				}
			});
			return res;
		};
		// 区分数组和对象
		if (Array.isArray(data)) {
			// 是数组
			return _.map(data, (item) => {
				return processObj(item);
			});
		} else {
			return processObj(data);
		}
	},
};
export default tools;