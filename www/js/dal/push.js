// 商家相关
(function(_, ra) {
	var push = {};
	
	// 获取所有设备推送信息
	push.list = function(callback){
		return ra("get", "/push/list", {
			
		}, callback);
	};
	
	// 设备推送同步
	push.synchronous = function(callback){
		return ra("post", "/push/synchronous", {
			
		}, callback);
	};
	
	// 单个设备开关
	push.update = function(devid, state){
		var target;
		return ra('post', '/push/update', {
			target: target,
			devid: devid,
			state: +state
		});
	};
	
	
	
	
	
	_.push = push;

}(window.dal, window.requestAdapter));