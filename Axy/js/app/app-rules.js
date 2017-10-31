


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
	}
	
	app.rules = rules;
}(window.app || (window.app = {})));


