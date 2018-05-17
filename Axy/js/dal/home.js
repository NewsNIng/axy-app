// 系统相关
(function(_, ra){
	var home = {};
	
	/**
	 * 轮播图列表
	 * @param {Object} callback
	 */
	home.advert = function(callback){
		return ra('get', '/home/advert', {}, callback);
	}
	
	home.theme = {
		// 主页 猜你喜欢
		get: function(callback){
			return ra('get', '/home/theme', {}, callback);
		},
		/**
		 * 【主题】列表（分页）
		 * @param {Object} pageNumber
		 * @param {Object} callback
		 * @param {Object} pageSize
		 */
		list: function(pageNumber, callback, pageSize){
			return ra('get', '/home/theme/list', {
				pageNumber:　pageNumber,
				pageSize:　pageSize　|| 10
			}, callback);
		},
		tap: function(id, callback){
			return ra('get', '/home/theme/'+ id, {}, callback);
		}
	}
	
	
	
	_.home = home;
	
}(window.dal, window.requestAdapter));
