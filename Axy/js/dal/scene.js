// 配件相关

(function(_, ra) {
	var scene = {};

	// 获取所有场景列表
	scene.list = function(callback) {
		return ra("get", "/scene/list", {}, callback);
	};
	
	// 获取场景详情
	scene.getInfo = function(seceneId, callback) {
		return ra("get", "/scene/get", {
			seceneId: seceneId,
		}, callback);
	};
	
	scene.add = function(sceneInfo, callback){
		return ra("post", "/scene/add", sceneInfo, callback);
	}
	
	scene.updata = function(sceneInfo, callback){
		return ra("post", "/scene/updata", sceneInfo, callback);
	}
	
	scene.delete = function(sceneId, callback){
		return ra('get', '/scene/delete',{
			sceneId: sceneId
		}, callback)
	}
	
	_.scene = scene;

}(window.dal, window.requestAdapter));