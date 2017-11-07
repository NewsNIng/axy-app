


(function(app){
	var rules = {};
	
	var _rslesObj = {
		tel: /^1\d{10}$/,
		pwd: /^[a-zA-Z]\w{5,17}$/,
		code: /^\d{4}$/
	};
	
	/**
	 * 对数据进行验证
	 * @param {String} type 需要验证的规则名称
	 * @param {String} value 需要验证的值
	 * @param {String} message 验证失败提示的错误 无错误返回null
	 */
	rules.test = function(type, value, message){
		var rex = _rslesObj[type];
		if(rex.test(value)){
			return null;
		}
		return message;
	};
	
	/**
	 * 对数据进行验证 （多个）
	 * @param {Array} arr 数据数组，格式按照test
	 */
	rules.testList = function(arr){
		var i = 0, l = arr.length, message = "";
		while(i < l){
			message = rules.test(arr[i].type, arr[i].value, arr[i].message);
			if(message !== null){
				return message;
			}
			i++;
		}
		return null;
	};
	
	app.rules = rules;
}(window.app || (window.app = {})));


