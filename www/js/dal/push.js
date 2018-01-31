// 商家相关
(function(_, ra) {
	var push = {};

	// 获取所有设备推送信息
	push.list = function(pushid, callback) {
		return ra("get", "/push/list", {
			target: pushid
		}, callback);
	};

	// 设备推送同步
	push.synchronous = function(account, target, sendmode, callback) {
		return ra("post", "/push/synchronous", {
			account: account,
			target: target,
			sendmode: sendmode,
		}, callback);
	};

	// 单个设备开关
	push.update = function(target, devid, state, callback) {
		return ra('post', '/push/update', {
			target: target,
			devid: devid,
			state: +state
		}, callback);
	};

	// 全部设备开关
	push.updateAll = function(target, state, callback) {
		return ra('post', '/push/updateall', {
			target: target,
			state: +state
		}, callback);
	};

	// 删除该设备推送
	push.delete = function(target, callback) {
		return ra('post', '/push/delete', {
			target: target
		}, callback);
	};

	// 注销登录关闭推送
	push.clearpush = function(target, account, callback) {
		return ra('post', '/push/clearpush', {
			target: target,
			account: account
		}, callback);
	};

	// 系统,活动开关* type 1 系统 2 活动
	push.updatesys = function(target, type, state, callback) {
		return ra('post', '/push/updatesys', {
			target: target,
			type: type,
			state: +state
		}, callback);
	};

	push.updateSystem = function(target, state, callback) {
		return push.updatesys(target, 1, state, callback);
	};

	push.updateActivity = function(target, state, callback) {
		return push.updatesys(target, 2, state, callback);
	};

	_.push = push;

}(window.dal, window.requestAdapter));