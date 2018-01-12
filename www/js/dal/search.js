// 搜索相关
(function(_, ra){
	var search = {};
	
	
	/**
	 * 获取热门搜索关键词
	 * @param {Object} callback
	 */
	search.hotkeyword = function(callback){
		return ra('get', '/search/hotkeyword', {}, callback);
	};
	
	/**
	 * 获取联想关键词
	 * @param {String} keyword 关键字
	 * @param {Object} callback
	 */
	search.tipkeyword = function(keyword, callback){
		return ra('get', '/search/tipkeyword/' + keyword, {}, callback);
	};
	
	/**
	 * 获取搜索结果
	 * @param {Number} longitude 经度
	 * @param {Number} latitude 纬度
	 * @param {String} city 城市名
	 * @param {String} keyword 关键字
	 * @param {Object} pageSize
	 * @param {Object} callback
	 * @param {Object} pageSize
	 */
	search.list = function(longitude, latitude, city, keyword, pageNumber, callback, pageSize){
		return ra('get', '/search/list', {
			longitude: longitude,
			latitude: latitude,
			pageSize: pageSize || 10,
			pageNumber: pageNumber,
			city: city,
			keyword: keyword,
		}, callback);
	};
	
	
	
	
	
	
	
	
	_.search = search;
	
}(window.dal, window.requestAdapter));
