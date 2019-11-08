import _ from 'lodash';
import { Message } from 'element-ui';
const xRules = {
    // 必填项
    required: {
        message: "不能为空！",
        check(val) {
            if (val === undefined || val === null || val === "") {
                return false;
            } else {
                return true;
            }
        }
    },
    // 西文：字母、数字、下划线
    western: {
        message: "必须为字母、数字、下划线！",
        check(val) {
            return (!xRules.required.check(val)) ||
                /^[a-zA-Z0-9_]+$/.test(val);
        }
    },
    // 整数：负数+0+正数，只能是整数
    integer: {
        message: "必须为整数！",
        check(val) {
            return (!xRules.required.check(val)) ||
                /^-?\d+$/.test(val);
        }
    },
    // 小数：负数+0+正数，小数整数都行
    decimal: {
        message: "必须为数字！",
        check(val) {
            return (!xRules.required.check(val)) ||
                /^(-?\d+)(\.\d+)?$/.test(val);
        }
    },
    // 电话：固话+手机
    phone: {
        message: "必须为座机或11位手机号码！",
        check(val) {
            return (!xRules.required.check(val)) ||
                xRules.cellphone(val) ||
                xRules.fixedphone(val);
        }
    },
    // 手机：以1开头，共11位
    cellphone: {
        message: "必须为11位手机号码！",
        check(val) {
            return (!xRules.required.check(val)) ||
                /^1\d{10}$/.test(val);
        }
    },
    // 固话
    fixedphone: {
        message: "必须为座机！",
        check(val) {
            return (!xRules.required.check(val)) ||
                /^0\d{2,3}-?\d{7,8}$/.test(val);
        }
    },
    // 邮箱
    email: {
        message: "必须为合法的邮箱格式！",
        check(val) {
            return (!xRules.required.check(val)) ||
                /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
        }
    }
};
// 校验函数
function xValidate(data, rules) {
    let flag = true;
    _.forIn(rules, (item) => {
        // 验证类型
        var validatorList = item.type;
        // 中文提示
        var chs = item.chs;
        // 值
        var val = data[item.key];
        _.forIn(xRules, (rule, ruleName) => {
            if (_.indexOf(validatorList, ruleName) != -1) {
                if (!(rule.check(val))) {
                    flag = false;
                    Message({
                        type: "error",
                        message: chs + rule.message
                    });
                }
            }
            return flag;
        });
        return flag;

    });
    return flag;
}
// el-form组件使用的rules
const xElementRules = { // 
    western: (rule, value, callback) => {
        if (xRules.western.check(value)) {
            return callback();
        } else {
            callback(new Error(xRules.western.message));
        }
    },
    cellphone: (rule, value, callback) => {
        if (xRules.cellphone.check(value)) {
            return callback();
        } else {
            callback(new Error(xRules.cellphone.message));
        }
    }
};
export { xValidate, xElementRules };
/*  
（一）xValidate：检验函数。使用方法如下：    
    // 数据：
    data() {
        return {
            loginData: {
                username: "",
                password: "",
                validateCode: "",
            },
            // 自己封装的校验规则
            xRules: [
                { key: "username", type: ["required", "western"], chs: "用户名", },
                { key: "password", type: ["required"], chs: "密码", },
                { key: "validateCode", type: ["required"], chs: "验证码", },
            ]
        }
    },

    // 在方法中调用
    if (!this.xValidate(this.loginData, this.xRules)) {
        return false;
    }
    
（二）xElementRules：el-form组件使用的rules。使用方法如下：
    rules:{    
        phone: [
            { validator: this.xElementRules.cellphone, trigger: ['blur', 'change'] }
        ],
    }
*/