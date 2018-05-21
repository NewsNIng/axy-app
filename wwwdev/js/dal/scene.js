// 配件相关

(function(_, ra) {
	var scene = {};

	// 获取所有场景列表
	scene.list = function(callback) {
		return ra("get", "/scene/listallinfo", {}, callback);
	};
	
	// 获取场景详情
	scene.getInfo = function(linkageid, callback) {
		return ra("get", "/scene/get", {
			linkageid: linkageid,
		}, callback);
	};
	
	scene.add = function(sceneInfo, callback){
		return ra("post", "/scene/add", sceneInfo, callback);
	}
	
	scene.updata = function(sceneInfo, callback){
		return ra("post", "/scene/updata", sceneInfo, callback);
	}
	
	
	_.scene = scene;

}(window.dal, window.requestAdapter));