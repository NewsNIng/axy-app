var dal = {
	//	BASE_URL: "http://192.168.1.213:8080/vihiManager/vihiapi",
	BASE_URL: "http://vh.anxin-net.com/vihiManager/vihiapi",
};

// 统一请求 适配器
function requestAdapter(type, url, params, callback) {
	url = dal.BASE_URL + url;

	// 获取用户account

	params.account = params.account || window.localStorage.getItem('_account_');

	//params.datatime = +(new Date());

	console.log("[" + type + "]" + url);
	console.log(JSON.stringify(params));

	var errDir = {
		"timeout": "请求超时",
		"error": "请求错误",
		"abort": "请求中断",
		"parsererror": "解析错误",
		"null": "请求为空"
	};

	var options = {
		data: params,
		type: type,
		timeout: 60000,
		success: function(data) {
			var o = {};
			if(data.code !== "0000" && data.code !== "0") {
				o.err = {
					code: data.code,
					message: data.message
				}
			}
			o.data = data.data;
			//只将请求结果的data字段返回
			callback(o.err, o.data);
		},
		error: function(xhr, type, err) {
			callback({
				code: xhr.status,
				message: errDir[type] || "其它错误"
				
			}, null);
		}
	};
	if(type.toUpperCase() === 'POST') {
		options.contentType = 'application/json;charset=UTF-8';
	}
	return mui.ajax(url, options);

}