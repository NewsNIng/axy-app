// 系统相关
(function(_, ra){
	var system = {};
	
	system.update = function(verison, callback){
		return ra("get", "/update", {
			verison: verison
		},callback);
	}
	
	
	
	
	_.system = system;
	
}(window.dal, window.requestAdapter));
