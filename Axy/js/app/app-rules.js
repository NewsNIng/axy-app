(function(app) {
	var rules = {};

	var _rslesObj = {
		tel: /^1\d{10}$/,
		number: function(value){
			console.log(value);
			if(!_rslesObj.tel.test(value) && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)){
				return false;
			}
			return true;
		},
		pwd: /^\w{6,18}$/,
		code: /^\d{6}$/,
		//devName: /^\w{1,10}$/,
		lockpassword: /^\d{4,8}$/, // 智能门锁密码
		devName: function(value){
			if(value.length > 15){
				return false;
			}
			return true;
		}
	};

	rules.testBy = function(rex, value, message) {
		var type = Object.prototype.toString.call(rex);
		
		if(type === '[object String]'){
			return rules.test(rex, value, message);
		}
		if(type === '[object RegExp]'){
			if(rex.test(value)) {
				return null;
			}
		}
		if(type === "[object Function]") {
			if(rex(value)){
				return null;
			}
		}
		return message;
	}
	
	/**
	 * 对数据进行验证
	 * @param {String} type 需要验证的规则名称
	 * @param {String} value 需要验证的值
	 * @param {String} message 验证失败提示的错误 无错误返回null
	 */
	rules.test = function(type, value, message) {
		return rules.testBy(_rslesObj[type], value, message);
	};
	
	rules.testListBy = function(arr){
		var i = 0,
			l = arr.length,
			message = "";
		while(i < l) {
			message = rules.testBy(arr[i].type, arr[i].value, arr[i].message);
			if(message !== null) {
				return message;
			}
			i++;
		}
		return null;
	}

	/**
	 * 对数据进行验证 （多个）
	 * @param {Array} arr 数据数组，格式按照test
	 */
	rules.testList = function(arr) {
		var i = 0,
			l = arr.length,
			message = "";
		while(i < l) {
			message = rules.test(arr[i].type, arr[i].value, arr[i].message);
			if(message !== null) {
				return message;
			}
			i++;
		}
		return null;
	};

	app.rules = rules;
}(window.app || (window.app = {})));