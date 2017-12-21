// 设备相关
(function(_, ra) {
	var device = {};

	/**
	 * 设备添加
	 * @param {String} devid 设备id
	 */
	device.add = function(devid, callback) {
		return ra("post", "/device/add", {
			devid: devid
		}, callback);
	};

	/**
	 * 设备列表（分页）
	 * @param {Number} pageNumber 
	 * @param {Number} pageSize
	 */
	device.list = function(pageNumber, callback, pageSize) {
		return ra("get", "/device/list", {
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	};

	/**
	 * 设备删除
	 */
	device.delete = function(devid, callback) {
		return ra('get', '/device/delete/' + devid, {}, callback);
	}

	/**
	 * 分享设备删除
	 */
	device.deleteshare = function(devid, callback) {
		var account = window.localStorage.getItem("_account_");
		return ra('get', '/device/delete/share/' + devid + '/user/' + account, {}, callback);
	}

	/**
	 * 电力主机
	 */
	device.electric = {
		// 当前状态
		state: function(_id, callback) {
			return ra('get', '/device/electric/state/' + _id, {}, callback);
		},
		// 告警日志
		alarmlist: function(_id, pageNumber, callback, pageSize) {
			return ra('get', '/alarm/electric/list', {
				did: _id,
				pageNumber: pageNumber,
				pageSize: pageSize || 10
			}, callback);
		}
	};
	
	/**
	 * 设备分享
	 * @param {String} did 设备主键
	 * @param {Number} authorize 权限
	 */
	device.share = function(did, authorize, callback){
		return ra("get", "/share/getVcode", {
			did: did,
			authorize: authorize
		},callback);
	};
	
	/**
	 * 获取分享的设备
	 * @param {String} code
	 */
	device.getShare = function(code, callback){
		return ra("get", "/share/codeValidation", {
			keystr: code
		},callback);
	};
	
	
	
	

	_.device = device;

}(window.dal, window.requestAdapter));