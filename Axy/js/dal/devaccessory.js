// 配件相关


(function(_, ra){
	var devaccessory = {};
	
	// 获取所有配件列表
	devaccessory.allacc = function(callback){
		return ra("get", "/devaccessory/allacc", {}, callback);
	};
	
	
	_.devaccessory = devaccessory;
	
}(window.dal, window.requestAdapter));
