// 商家相关
(function(_, ra) {
	var push = {};
	
	// 获取所有设备推送信息
	push.list = function(pushid, callback){
		return ra("get", "/push/list", {
			target: pushid
		}, callback);
	};
	
	// 设备推送同步
	push.synchronous = function(target, sendmode, callback){
		return ra("post", "/push/synchronous", {
			target: target,
			sendmode: sendmode,
		}, callback);
	};
	
	// 单个设备开关
	push.update = function(target, devid, state, callback){
		return ra('post', '/push/update', {
			target: target,
			devid: devid,
			state: +state
		}, callback);
	};
	
	// 全部设备开关
	push.updateAll = function(target, state, callback){
		return ra('post', '/push/updateall', {
			target: target,
			state: +state
		}, callback);
	};
	
	// 删除该设备推送
	push.delete = function(target, callback){
		return ra('post', '/push/delete', {
			target: target
		}, callback);
	};
	
	
	
	
	
	
	
	_.push = push;

}(window.dal, window.requestAdapter));