// 配件相关

(function(_, ra) {
	var scene = {};

	/**
	 * 获取所有场景列表
	 * @param {Object} callback
	 */
	scene.list = function(callback) {
		return ra("get", "/scene/listallinfo", {}, callback);
	};

	/**
	 * 获取场景详情
	 * @param {Object} id 场景id
	 * @param {Object} callback
	 */
	scene.getInfo = function(id, callback) {
		return ra("get", "/scene/get", {
			id: id,
		}, callback);
	};

	/**
	 * 添加场景
	 * @param {Object} sceneInfo 场景信息
	 * @param {Object} callback
	 */
	scene.add = function(sceneInfo, callback) {
		return ra("post", "/scene/add", sceneInfo, callback);
	}

	/**
	 * 修改场景信息
	 * @param {Object} sceneInfo 场景信息
	 * @param {Object} callback
	 */
	scene.updata = function(sceneInfo, callback) {
		return ra("post", "/scene/updata", sceneInfo, callback);
	}

	/**
	 * 删除场景
	 * @param {Object} id
	 * @param {Object} callback
	 */
	scene.delete = function(id, callback) {
		return ra("post", "/scene/delete", {
			id: id
		}, callback);
	}
	/**
	 * 执行场景
	 * @param {Object} id
	 * @param {Object} callback
	 */
	scene.run = function(id, callback) {
		return ra("post", "/scene/run", {
			id: id
		}, callback);
	}
	
	/**
	 * 添加触发条件
	 * @param {Object} type
	 * @param {Object} id
	 * @param {Object} param
	 * @param {Object} callback
	 */
	scene.condition_add = function(type, id, param, callback) {
		return ra("post", "/scene/condition/add", {
			type: type,
			id: id,
			param
		}, callback);
	}
	
	/**
	 * 删除触发条件
	 * @param {Object} id
	 * @param {Object} callback
	 */
	scene.condition_delete = function(id, callback) {
		return ra("post", "/scene/condition/delete", {
			id: id
		}, callback)
	}
	
	/**
	 * 修改触发条件
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} sceneId
	 * @param {Object} param
	 * @param {Object} callback
	 */
	scene.condition_update = function(id, type, sceneId, param, callback) {
		return ra("post", "/scene/condition/add", {
			id: id,
			type: type,
			sceneId: sceneId,
			param
		}, callback);
	}
	
	/**
	 * 添加执行动作
	 * @param {Object} type
	 * @param {Object} sceneId
	 * @param {Object} enable
	 * @param {Object} devId
	 * @param {Object} accId
	 * @param {Object} ctime
	 * @param {Object} extend
	 * @param {Object} callback
	 */
	scene.action_add = function(type, sceneId, enable, devId, accId, ctime, extend, callback) {
		return ra("post", "/scene/action/add", {
			type: type,
			sceneId: sceneId,
			enable: enable,
			devId: devId,
			accId: accId,
			ctime: ctime,
			extend: extend
		}, callback);
	}
	
	/**
	 * 删除执行动作
	 * @param {Object} actionId
	 * @param {Object} callback
	 */
	scene.action_delete = function(actionId, callback) {
		return ra("post", "/scene/action/delete", {
			actionId: actionId
		}, callback);
	}
	
	/**
	 * 修改执行动作
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} sceneId
	 * @param {Object} enable
	 * @param {Object} devId
	 * @param {Object} accId
	 * @param {Object} ctime
	 * @param {Object} extend
	 * @param {Object} callback
	 */
	scene.action_update = function(id, type, sceneId, enable, devId, accId, ctime, extend, callback) {
		return ra("post", "/scene/action/update", {
			id: id,
			type: type,
			sceneId: sceneId,
			enable: enable,
			devId: devId,
			accId: accId,
			ctime: ctime,
			extend: extend
		}, callback);
	}

	_.scene = scene;

}(window.dal, window.requestAdapter));