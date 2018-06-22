// 配件相关

(function(_, ra) {
	var scene = {};

	// 获取所有场景列表
	scene.list = function(callback) {
		return ra("get", "/scene/list", {}, callback);
	};
	//根据场景类型获取场景列表详细
	scene.getListByType = function(type, callback){
		return ra('get', '/scene/list_detail',{type: type}, callback)
	}
	// 获取场景详情
	scene.getInfo = function(sceneId, callback) {
		return ra("get", "/scene/get", {
			sceneId: sceneId,
		}, callback);
	};
	
	scene.add = function(sceneInfo, callback){
		return ra("post", "/scene/add", sceneInfo, callback);
	}
	
	scene.update = function(sceneInfo, callback){
		return ra("post", "/scene/update", sceneInfo, callback);
	}
	
	scene.delete = function(sceneId, callback){
		return ra('get', '/scene/delete',{
			sceneId: sceneId
		}, callback)
	}
	
	//根据动作获取设备或者配件或者灯控
	scene.getDevListByAction = function(actionType, callback){
		return ra('get', '/scene/action/objlist', {actiontype: actionType}, callback)
	}
	
	//根据条件获取设备或者配件或者灯控
	scene.getDevListByCondition = function(conditionType, callback){
		return ra('get', '/scene/condition/SupportSpeObj', {conditiontype: conditionType}, callback)
	}
	
	//修改场景启用状态
	scene.updateSceneEnable = function(ids, enable, callback){
		return ra('post', '/scene/updateSceneEnable', {ids: ids, enable: enable}, callback)
	}
	//执行职能场景
	scene.runScene = function(id, callback){
		return ra('post', '/scene/run/' + id, {}, callback)
	}
	_.scene = scene;

}(window.dal, window.requestAdapter));