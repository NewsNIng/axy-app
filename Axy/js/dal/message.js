// 消息相关
(function(_, ra){
	var message = {};
	
	/**
	 * 获取活动消息列表
	 * @param {Object} pageNumber
	 * @param {Object} callback
	 *  @param {Object}pageSize
	 */
	message.getActivityList = function(pageNumber, callback, pageSize){
		return ra('get', '/activitymsg/list', {
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	};
	
	/**
	 * 删除活动消息
	 * @param {Object} id 活动id
	 * @param {Object} callback
	 */
	message.delActivity = function(id, callback){
		return ra('post', '/activitymsg/delete/' + id, {}, callback);
	};
	
	
	
	/**
	 * 获取系统消息列表
	 * @param {Object} pageNumber
	 * @param {Object} callback
	 *  @param {Object}pageSize
	 */
	message.getSystemList = function(pageNumber, callback, pageSize){
		return ra('get', '/systemmsg/list', {
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	};
	
	/**
	 * 删除活动消息
	 * @param {Object} id 系统消息id
	 * @param {Object} callback
	 */
	message.delSystem = function(id, callback){
		return ra('post', '/systemmsg/delete/' + id, {}, callback);
	};
	
	_.message = message;
	
}(window.dal, window.requestAdapter));
