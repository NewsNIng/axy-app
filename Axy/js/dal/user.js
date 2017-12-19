// 用户相关请求
(function(_, ra) {
	var user = {};
	/**
	 * 用户登录
	 * @param {String} account 用户名
	 * @param {String} passwd 密码
	 * @param {Function} callback 请求回调函数
	 */
	user.login = function(account, passwd, callback) {
		return ra("post", "/user/login", {
			account: account,
			passwd: passwd
		}, callback);
	}

	user.ologin = function(info, callback) {
		return ra('post', '/user/ologin', {
			openid: info.openid,
			type: info.type,
			info: info
		}, callback)
	}

	/**
	 * 用户注册
	 * @param {String} account 用户名
	 * @param {String} passwd 密码
	 * @param {String} code 验证码
	 * @param {Function} callback 请求回调函数
	 */
	user.reg = function(account, passwd, code, callback) {
		return ra("post", "/user/register", {
			account: account,
			passwd: passwd,
			code: code
		}, callback);
	}

	/**
	 * 获取验证码
	 * @param {String} account 手机号（用户名）
	 * @param {Function} callback 回调函数
	 */
	user.getCode = function(account, callback) {
		return ra("get", "/user/validcode/" + account, {}, callback);
	}

	/**
	 * 重置密码
	 * @param {String} account 手机号
	 * @param {String} passwd 新密码
	 * @param {Function} callback 回调函数
	 */
	user.resetpwd = function(account, passwd, callback) {
		return ra("post", "/user/resetpwd/", {
			account: account,
			passwd: passwd
		}, callback);
	}

	/**
	 * 关注相关
	 */
	user.focus = {
		/**
		 * 关注其它用户
		 * @param {Number} focusaccount 被关注人
		 */
		add: function(focusaccount, callback) {
			return ra('post', '/user/focus/add', {
				focusaccount: focusaccount,
			}, callback);
		},
		/**
		 * 取消关注用户
		 * @param {Number} focusaccount 被取消关注人
		 */
		delete: function(focusaccount, callback) {
			return ra('post', '/user/focus/delete', {
				focusaccount: focusaccount,
			}, callback);
		},
		list: function(pageNumber, callback, pageSize) {
			return ra('get', '/user/focus/list', {
				pageNumber: pageNumber,
				pageSize: pageSize || 10,
			}, callback);
		}
	}

	/**
	 * 查询资料
	 * @param {String} account 用户帐号
	 * @param {Function} callback 回调函数
	 */
	user.get = function(loginaccount, focusaccount, callback) {
		return ra('get', '/user/' + loginaccount + '/' + focusaccount, {}, callback);
	};

	/**
	 * 修改个人信息
	 * @param {UserInfo} data 用户信息
	 * @param {Object} callback
	 */
	user.update = function(data, callback) {
		return ra('post', '/user/update', data, callback);
	};

	/**
	 * 修改密码
	 * @param {UserInfo} data 用户信息
	 * @param {Object} callback
	 */
	user.updatepwd = function(account, updatepwd, newpsswd, callback) {
		return ra('post', '/user/updatepwd', {
			account: account,
			updatepwd: updatepwd,
			newpsswd: newpsswd
		}, callback);
	};

	_.user = user;

}(window.dal, window.requestAdapter));