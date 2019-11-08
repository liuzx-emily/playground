import $ from "jquery";

// ----------------------- 设置全局变量 -----------------------
// 是否添加"请选择"这一项
var positionRetrival_hasNull = true;
// 地址回显进行中？
var duringPositionRetrival = false;
var positionRetrival_levelOne = "";
var positionRetrival_levelTwo = "";
var positionRetrival_levelThree = "";

// 因为现在嵌套在vue项目中演示，所以不能用 $(function(){})，需要把初始化方法放在 mounted中。如果不放在vue项目里，那么把下面注释的代码放开。
/*$(function() {
    // 位置初始化
    initPositionSelect();
    // 广东 - 广州 - 海珠
    let data = {
        levelOne: "440000",
        levelTwo: "440100",
        levelThree: "440105",
    };
    // 数据回显
    data_retrival(data);
});*/

// 位置select初始化
function initPositionSelect() {
	var temp_levelOne;
	if (duringPositionRetrival) {
		temp_levelOne = positionRetrival_levelOne;
	} else {
		temp_levelOne = $("#select_levelOne").val();
	}
	$("#select_levelOne").html("");
	$("#select_levelTwo").html("");
	$("#select_levelThree").html("");
	$.ajax({
		url: "/api/district/getLevelOneList.do",
		async: false,
		success: function success(res) {
			var list = res.data;
			if (list && list.length > 0) {
				var html = "";
				if (positionRetrival_hasNull) {
					html += `<option value="">请选择</option>`;
				}
				$.each(list, function(index, item) {
					let selectedFlag = temp_levelOne && item.code == temp_levelOne;
					html += `<option ${selectedFlag?"selected":""} value="${item.code}">${item.name}</option>`;
				});
				$("#select_levelOne").html(html);
				setTimeout(function() {
					$("#select_levelOne").trigger('change');
				}, 0);
			}
		}
	});
	$("#select_levelOne").change(function() {
		var levelOne = $("#select_levelOne").val();
		$("#select_levelTwo").html("");
		$("#select_levelThree").html("");
		if (levelOne) {
			var temp_levelTwo;
			if (duringPositionRetrival) {
				temp_levelTwo = positionRetrival_levelTwo;
			} else {
				temp_levelTwo = $("#select_levelTwo").val();
			}
			$.ajax({
				url: "/api/district/getByParentCode.do",
				async: false,
				data: {
					parentCode: levelOne
				},
				success: function success(res) {
					var list = res.data;
					if (list && list.length > 0) {
						var html = "";
						if (positionRetrival_hasNull) {
							html += `<option value="">请选择</option>`;
						}
						$.each(list, function(index, item) {
							let selectedFlag = temp_levelTwo && item.code == temp_levelTwo;
							html += `<option ${selectedFlag?"selected":""} value="${item.code}">${item.name}</option>`;
						});
						$("#select_levelTwo").html(html);
						setTimeout(function() {
							$("#select_levelTwo").trigger('change');
						}, 0);
					} else {
						duringPositionRetrival = false;
					}
				}
			});
		}
	});
	$("#select_levelTwo").change(function() {
		var levelTwo = $("#select_levelTwo").val();
		$("#select_levelThree").html("");
		if (levelTwo) {
			var temp_levelThree;
			if (duringPositionRetrival) {
				temp_levelThree = positionRetrival_levelThree;
			} else {
				temp_levelThree = $("#select_levelThree").val();
			}
			$.ajax({
				url: "/api/district/getByParentCode.do",
				data: {
					parentCode: levelTwo
				},
				success: function success(res) {
					var list = res.data;
					if (list && list.length > 0) {
						var html = "";
						if (positionRetrival_hasNull) {
							html += `<option value="">请选择</option>`;
						}
						$.each(list, function(index, item) {
							let selectedFlag = temp_levelThree && item.code == temp_levelThree;
							html += `<option ${selectedFlag?"selected":""} value="${item.code}">${item.name}</option>`;
						});
						$("#select_levelThree").html(html);
					}
					duringPositionRetrival = false
				}
			});
		}
	});
}
// 数据回显
function data_retrival(data) {

	// ......其他数据回显

	// 要开始进行多级地址的回显了，修改全局变量
	duringPositionRetrival = true;
	positionRetrival_levelOne = data.levelOne;
	positionRetrival_levelTwo = data.levelTwo;
	positionRetrival_levelThree = data.levelThree;
	// 全局变量修改完了。修改一级地址的value，并手动触发change
	$("#select_levelOne").val(positionRetrival_levelOne);
	setTimeout(function() {
		$("#select_levelOne").trigger('change');
	}, 0);
}

export { initPositionSelect, data_retrival };