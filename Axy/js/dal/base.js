var dal = {
	BASE_URL_DEV: "http://192.168.1.213:8080/vihiManager/vihiapi",
	BASE_URL_TEST: "http://47.106.92.195/vihiManager/vihiapi",
	BASE_URL: "http://vh.anxin-net.com/vihiManager/vihiapi",
	BASE_DOMAIN: "vh.anxin-net.com",
	QQS_DOMAIN: "qqs.isee110.com",
	// http://vh.anxin-net.com/vihiManager/vihiapp/share/index.html

	BASE_URL_TOP: "http://www.isee110.com/api",
	BASE_SHARE_URL: "http://vh.anxin-net.com/vihiManager/vihiapp/share/module/index.html",
	//BASE_SHARE_URL: "http://192.168.1.103:8080/module/index.html",
	BASE_URL_VERSION: "216",
};

dal.isVihiDomain = function() {
	var domain = window.localStorage.getItem('_domain_') || "";
	return dal.BASE_URL.indexOf(domain) >= 0
};

dal.errDir = {
	"timeout": "请求超时",
	"error": "网络连接错误，请检查！",
	"abort": "网络连接中断，请检查！",
	"parsererror": "解析错误",
	"null": "请求为空"
};

dal.tokenCodeDir = {
	"401": "TokenTimeOut", // token过期
	"402": "UserUnAuthorized", // token失效
	"403": "Forbidden", // token不存在
};

/**
 * 统一请求 适配器
 * @param {String} type  post/get
 * @param {String} url  请求地址
 * @param {Object} params  参数
 * @param {Function} callback  回调函数
 */
function requestAdapter(type, url, params, callback) {
	// 优先获取 单个接口设置的 url
	var BASE_URL = params.BASE_URL;
	if(BASE_URL) {
		delete params.BASE_URL;
	} else {
		BASE_URL = window.localStorage.getItem('_domain_') || dal.BASE_URL;
	}
	var apiUrl = url;
	url = BASE_URL + url;
	// 获取用户权限信息
	params.account = params.account || window.localStorage.getItem('_account_') || "";

	var randomID = (Math.random() * 10000).toFixed(0);
 
	console.log("[" + apiUrl + "]请求: [" + type + "] " + "编号: [" + randomID + "] AppUrl: [" + window.location.href.split("/www/")[1] + "]");
	console.log("[" + apiUrl + "]时间: [" + new Date().getTime() + "] 地址: [" + url + "]");
	console.log("[" + apiUrl + "]参数: [json]" + JSON.stringify(params));

	var options = {
		headers: {
			token: window.localStorage.getItem('_token_') || "",
			loginid: window.localStorage.getItem('_loginid_') || "",
			imei: window.localStorage.getItem('_imei_') || "",
			account: params.account,
//			appversion: dal.BASE_URL_VERSION,
		},
		data: params,
		type: type,
		timeout: 60000,
		success: function(data) {
			var o = {};
			console.log("[" + apiUrl + "]返回: [" + randomID + "] 时间: [" + new Date().getTime() + "]" + JSON.stringify(data));

			if(dal.tokenCodeDir[data.code]) {

				//if(data.code === "403") {
				// alert("[" + apiUrl + "]" + JSON.stringify(data));
				// token 验证失败 通知 zeus
				var zeus = plus.webview.getWebviewById("zeus");
				if(!zeus) {
					console.log("ZEUS WINDOW NOFIND");
					return
				}
				var jsstr = "ni.Broadcast && ni.Broadcast._emitSelf && ni.Broadcast._emitSelf('token_error', " + JSON.stringify(data) + ")";
				zeus.evalJS(jsstr);

				return;
			}
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
			var errmsg = dal.errDir[type] || "其它错误";
			//console.log("["+errmsg+"]" + url);
			callback({
				code: xhr.status,
				message: errmsg

			}, null);
		}
	};
	if(type.toUpperCase() === 'POST') {
		options.contentType = 'application/json;charset=UTF-8';
	}
	return mui.ajax(url, options);

}