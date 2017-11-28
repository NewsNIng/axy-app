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
	}
	
	
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
	}
	
	
	
	_.device = device;
	
}(window.dal, window.requestAdapter));
