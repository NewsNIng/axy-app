// 用户相关请求
(function(_, ra){
	var user = {};
	/**
	 * 用户登录
	 * @param {String} username 用户名
	 * @param {String} password 密码
	 * @param {Function} callback 请求回调函数
	 */
	user.login = function(account, passwd, callback){
		return ra("post", "/user/login", {
			account: account,
			passwd: passwd
		},callback);
	}
	
	/**
	 * @param {String} username 用户名
	 * @param {String} password 密码
	 * @param {String} code 验证码
	 * @param {Function} callback 请求回调函数
	 */
	user.reg = function(account, passwd, code, callback){
		return ra("post", "/user/register", {
			account: account,
			passwd: passwd,
			code: code
		},callback);
	}
	
	/**
	 * 获取验证码
	 * @param {String} telphone 手机号
	 * @param {Function} callback 回调函数
	 */
	user.getCode = function(telphone, callback){
		return ra("get", "/getCode", {
			telphone: telphone
		}, callback);
	}
	
	
	_.user = user;
	
}(window.dal, window.requestAdapter));
