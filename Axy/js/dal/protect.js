// 帐号保护相关
(function(_, ra) {
	var protect = {};

	/**
	 * 账号保护开关
	 * @param {Number} lockterminal 1开启 0关闭
	 * @param {Object} callback
	 */
	protect._switch = function(lockterminal, callback) {
		return ra("post", "/protect/switch", {
			lockterminal: lockterminal
		}, 　callback);
	};
	// 快捷打开
	protect.open = function(callback) {
		return this._switch(1, callback);
	};
	// 快捷关闭
	protect.close = function(callback) {
		return this._switch(0, callback);
	};

	/**
	 * 获取账号授权列表
	 * @param {Object} callback
	 */
	protect.list = function(callback) {
		var account = window.localStorage.getItem("_account_");
		return ra('get', '/protect/list/' + account, {}, callback);
	};

	/**
	 * 账号授权验证回调
	 * @param {String} account 帐号
	 * @param {String} imei 设备码
	 * @param {String} description 设备描述（机型）
	 * @param {Object} callback
	 */
	protect.validation = function(account, imei, description, callback) {
		return ra('post', '/protect/validation', {
			account: account,
			imei: imei,
			description: description
		}, callback);
	};

	/**
	 * 账号授权删除
	 */
	protect.delete = function(id, callback) {
		return ra('post', '/protect/delete/' + id, {}, callback);
	};

	_.protect = protect;

}(window.dal, window.requestAdapter));