// 红外遥控
(function(_, ra){
	var ir = {};

	// 获取红外遥控列表
	ir.list = function(callback){
		return ra('get', '/ir/list', {
			
		}, callback);
	}
	_.ir = ir;
	
}(window.dal, window.requestAdapter));
