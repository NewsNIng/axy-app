(function(app) {
	var rules = {};

	var _rslesObj = {
		tel: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
		number: /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,
		pwd: /^\w{6,18}$/,
		pwd620: /^\w{6,18}$/,
		code: /^\d{6}$/,
		lockpassword: /^\d{4,8}$/, // 智能门锁密码
		devName: /^[\u4e00-\u9fa5a-zA-Z0-9_/-]{1,15}$/, 
		nickname: /^[\u4e00-\u9fa5a-zA-Z0-9_/-]{1,18}$/, 
		userName: /^[\u4e00-\u9fa5a-zA-Z0-9_/-]{1,18}$/,
		nonEmpty: /[\S]{1,}/,
		
		isqqsdomain: /^(qqs.isee110.com)$/,
		
		
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
			return rex(value);
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
			
			if(message != null) {
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
	
	
	rules.testBys = function(rex, value, message) {
		var type = Object.prototype.toString.call(rex);
		
		if(type === '[object String]'){
			return rules.test(rex, value, message);
		}
		if(type === '[object RegExp]'){
			return rex.test(value)
		}
		if(type === "[object Function]") {
			return rex(value);
		}
		return message;
	}
	
	/**
	 * 对数据进行验证 （多个）
	 * @param {Array} arr 数据数组，格式按照test
	 */
	rules.testLists = function(arr) {
		var i = 0,
			l = arr.length,
			message = "";
		while(i < l) {
			message = rules.testBys(arr[i].type, arr[i].value, arr[i].message);
			if(message !== true) {
				return message || arr[i].message;
			}
			i++;
		}
		return null;
	};

	app.rules = rules;
}(window.app || (window.app = {})));