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
	 * 删除全部活动消息
	 * @param {Object} callback
	 */
	message.delActivityAll = function(callback){
		var account = window.localStorage.getItem('_account_');
		return ra('post', '/activitymsg/deleteAll/' + account, {}, callback);
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
	 * 删除系统消息
	 * @param {Object} id 系统消息id
	 * @param {Object} callback
	 */
	message.delSystem = function(id, callback){
		return ra('post', '/systemmsg/delete/' + id, {}, callback);
	};
	
	/**
	 * 删除全部系统消息
	 * @param {Object} callback
	 */
	message.delSystemAll = function(callback){
		var account = window.localStorage.getItem('_account_');
		return ra('post', '/systemmsg/deleteAll/' + account, {}, callback);
	};
	
	/**
	 * 获取告警消息列表
	 * @param {Object} pageNumber
	 * @param {Object} callback
	 *  @param {Object}pageSize
	 */
	message.getAlarmList = function(pageNumber, devid, atime, callback, pageSize){
		return ra('post', '/alarm/device/list', {
			
			devid: devid,
			atime: atime,
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	};
	
	/**
	 * 获取告警消息详情
	 */
	message.getAlarm = function(aid, callback){
		return ra('get', '/alarm/device/info/' + aid, {
		}, callback);
	};
	/**
	 * 获取告警消息详情4.0版本，id是本地的
	 */
	message.getAlarmByLocal = function(aid, callback){
		return ra('get', '/alarm/device/getinfo/' + aid , {}, callback)
	}
	/**
	 * 获取最新消息预览
	 * @param {Object} callback
	 */
	message.center = function(callback){
		return ra('get', '/app/msgcenter', {}, callback);
	}
	
	
	_.message = message;
	
	
	
}(window.dal, window.requestAdapter));
