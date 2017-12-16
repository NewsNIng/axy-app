// 设备相关
(function(_, ra){
	var device = {};
	
	/**
	 * 设备添加
	 * @param {String} devid 设备id
	 */
	device.add = function(devid, callback){
		return ra("post", "/device/add", {
			devid: devid
		}, callback);
	};
	
	
	/**
	 * 设备列表（分页）
	 * @param {Number} pageNumber 
	 * @param {Number} pageSize
	 */
	device.list = function(pageNumber, callback, pageSize){
		return ra("get", "/device/list", {
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	};
	
	
	
	/**
	 * 设备删除
	 */
	device.delete = function(devid, callback){
		return ra('get', '/device/delete/' + devid, {}, callback);
	}
	
	/**
	 * 分享设备删除
	 */
	device.deleteshare = function(devid, callback){
		var account = window.localStorage.getItem("_account_");
		return ra('get', '/device/delete/share/'+devid+'/user/' + account, {}, callback);
	}
	
	
	
	
	_.device = device;
	
}(window.dal, window.requestAdapter));
