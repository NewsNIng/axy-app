// 日志相关
(function(_, ra) {
	var logger = {};

	logger.doorList = function(did, pageNumber, callback, pageSize) {
		return ra("get", "/alarm/door/list", {
			did: did,
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	}

	_.logger = logger;

}(window.dal, window.requestAdapter));