// 商家相关
(function(_, ra){
	var store = {};
	
	/**
	 * 商家入驻
	 * @param {Object} info 商家信息
	 * @param {Function} callback 回调
	 */
	store.add = function(info, callback){
		/**
		 * 
		 */
		return ra("post", "/store/add", info, callback);
	}
	
	store.category = function(callback){
		return ra("get", "/store/category", {}, callback);
	}
	
	
	
	
	_.store = store;
	
}(window.dal, window.requestAdapter));
