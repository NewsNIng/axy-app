window.Config = (function(url) {
	var c = {};

	c.getUrl = function() {
		return url.protocol + '://' + url.host + ':' + url.port + '/' + url.path + '/' + url.verison + '/';
	}

	return c;
}({
	protocol: 'http', //协议类型 
	host: 'xx.xx.com', //服务器域名
	port: '80', //端口号 
	path: 'xx', //文件名
	verison: 'openapi/v1' //版本
}));