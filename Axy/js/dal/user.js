// 用户相关请求
(function(_, ra){
	var user = {};
	/**
	 * 用户登录
	 * @param {String} username 用户名
	 * @param {String} password 密码
	 * @param {Function} callback 请求回调函数
	 */
	user.login = function(username, password, callback){
		return ra("get", "/login", {
			username: username,
			password: password
		},callback);
	}
	// 测试
	user.test = function(fn){
		return ra("get","/",{
			app: "ip.get",
			ip: "114.114.114.114",
			appkey: "10003",
			sign: "b59bc3ef6191eb9f747dd4e83c99f2a4",
			format: "json"
		},fn);
	}
	
	/**
	 * @param {String} username 用户名
	 * @param {String} password 密码
	 * @param {String} code 验证码
	 * @param {Function} callback 请求回调函数
	 */
	user.reg = function(username, password, code, callback){
		return ra("get", "/reg", {
			username: username,
			password: password,
			code: code
		},callback);
	}
	
	
	_.user = user;
	
}(window.dal, window.requestAdapter));
