// 
(function(_, ra) {
	var common = {};

	/**
	 * 生成短链
	 * @param {String} url
	 * @param {Function} callback
	 */
	common.generateDURL = function(url, callback) {

		var options = {
			data: {
				format: "json",
				url: url
			},
			type: "GET",
			dataType: "json",
			success: function(data) {
				if(data.err) {
					return callback(data, null);
				}
				callback(null, data.url);

			},
			
			error: function(xhr, type, err) {
				callback({
					code: xhr.status,
					message: ""
				}, null);
			}
		};
		return mui.ajax("http://suo.im/api.php", options);
	}

	_.common = common;

}(window.dal, window.requestAdapter));