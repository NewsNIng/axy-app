// 用户相关请求
(function(_, ra) {

	var IMEI = "";

	function initImei() {
		IMEI = plus.device.uuid;
	}

	if(window.plus) {
		initImei();
	} else {
		document.addEventListener('plusready', function() {
			initImei();
		});
	}

	var user = {};
	/**
	 * 用户登录
	 * @param {String} account 用户名
	 * @param {String} passwd 密码
	 * @param {Function} callback 请求回调函数
	 */
	user.login = function(account, passwd, callback, domain) {
		var o = {
			account: account,
			passwd: passwd,
			imei: IMEI
		};
		if(domain){
			o.BASE_URL = domain;
		}
		return ra("post", "/user/login", o, callback);
	}

	user.ologin = function(info, callback, domain) {
		var o = {
			openid: info.openid,
			type: info.type,
			info: info,
			imei: IMEI
		}
		if(domain){
			o.BASE_URL = domain;
		}
		
		return ra('post', '/user/ologin', o, callback)
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
			code: code,
			imei: IMEI
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
	 * 检查用户名是否可以注册
	 * @param {Object} account
	 * @param {Object} callback
	 */
	user.checkuser = function(account, callback) {
		return ra("get", '/user/checkuser', {
			account: account
		}, callback);
	}

	/**
	 * 重置密码
	 * @param {String} account 手机号
	 * @param {String} passwd 新密码
	 * @param {Function} callback 回调函数
	 */
	user.resetpwd = function(account, passwd, callback) {
		return ra("post", "/user/resetpwd", {
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
	 * 店铺收藏相关
	 */
	user.collection_shop = {
		/**
		 * 收藏店铺
		 * @param {Object} fid 目标id
		 */
		add: function(fid, callback) {
			console.log("222" + fid);
			return ra('post', '/favorites/store/add', {
				fid: fid,
			}, callback);
		},
		/**
		 * 取消收藏店铺
		 * @param {Object} fid 目标id
		 */
		delete: function(fid, callback) {
			return ra('post', '/favorites/store/delete', {
				fid: fid,
			}, callback);
		},
		list: function(pageNumber, callback, pageSize) {
			return ra('get', '/favorites/store/list', {
				pageNumber: pageNumber,
				pageSize: pageSize || 10,
			}, callback);
		}
	}

	/**
	 * 说说收藏相关
	 */
	user.collection_talk = {
		/**
		 * 收藏说说
		 * @param {Object} fid 目标id
		 */
		add: function(fid, callback) {
			return ra('post', '/favorites/article/add', {
				fid: fid,
			}, callback);
		},
		/**
		 * 取消收藏说说
		 * @param {Object} fid 目标id
		 */
		delete: function(fid, callback) {
			return ra('post', '/favorites/article/delete', {
				fid: fid,
			}, callback);
		},
		list: function(pageNumber, callback, pageSize) {
			return ra('get', '/favorites/article/list', {
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
	user.updatepwd = function(passwd, newpsswd, callback) {
		return ra('post', '/user/updatepwd', {
			passwd: passwd,
			newpsswd: newpsswd
		}, callback);
	};

	/**
	 * 绑定手机号
	 * @param {String} bindmobile 手机号
	 */
	user.bindphone = function(bindmobile, callback) {
		return ra('post', '/user/bindphone', {
			bindmobile: bindmobile,
			imei: IMEI,
		}, callback);
	};

	/**
	 * 第三方绑定
	 * @param {String} type 类型
	 * @param {String} openid 唯一id
	 */
	user.bindother = function(type, openid, callback) {
		return ra('post', '/user/bindother', {
			openid: openid,
			type: type
		}, callback);
	};

	/**
	 * 解除第三方绑定
	 * @param {String} type 类型
	 */
	user.deletebind = function(type, callback) {
		return ra('post', '/user/deletebind', {
			type: type
		}, callback);
	};
	
	
	user.syncsuser = function(callback){
		return ra('post', '/user/syncsuser', {
			
		}, callback);
	};

	_.user = user;

}(window.dal, window.requestAdapter));