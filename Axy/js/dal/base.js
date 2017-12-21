/* fly.js https://github.com/wendux/fly */
//!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}({1:function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports={type:function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()},isObject:function(e,t){return t?"object"===this.type(e):e&&"object"===(void 0===e?"undefined":n(e))},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},encode:function(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")},formatParams:function(e){var t=[];for(var r in e){var n=e[r];this.isObject(n)&&(n=JSON.stringify(n)),t.push(this.encode(r)+"="+this.encode(n))}return t.join("&")},merge:function(e,t){for(var r in t)e.hasOwnProperty(r)?this.isObject(t[r],1)&&this.isObject(e[r],1)&&this.merge(e[r],t[r]):e[r]=t[r];return e}}},5:function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(1),a="undefined"!=typeof document,s=function(){function e(t){n(this,e),this.engine=t||XMLHttpRequest,this.interceptors={response:{use:function(e,t){this.handler=e,this.onerror=t}},request:{use:function(e){this.handler=e}}},this.config={method:"GET",baseURL:"",headers:{},timeout:0,withCredentials:!1}}return o(e,[{key:"request",value:function(e,t,r){var n=this,o=new this.engine,s=new Promise(function(s,u){r=r||{},n.config.headers=i.merge(n.config.headers||{},{"Content-Type":"application/x-www-form-urlencoded"}),i.merge(r,n.config);var c=n.interceptors.request,f=n.interceptors.response;r.body=t||r.body;var p=!1,l={reject:function(e){p=!0,u(e)},resolve:function(e){p=!0,s(e)}};if(e=i.trim(e||""),r.method=r.method.toUpperCase(),r.url=e,(!c.handler||(r=c.handler(r,l)))&&!p){e=i.trim(r.url),!e&&a&&(e=location.href);var d=i.trim(r.baseURL||"");if(0!==e.indexOf("http")){var h="/"===e[0];if(!d&&a){var m=location.pathname.split("/");m.pop(),d=location.protocol+"//"+location.host+(h?"":m.join("/"))}if("/"!==d[d.length-1]&&(d+="/"),e=d+(h?e.substr(1):e),a){var y=document.createElement("a");y.href=e,e=y.href}}var b=i.trim(r.responseType||"");o.withCredentials=!!r.withCredentials;var g="GET"===r.method;g&&r.body&&(t=i.formatParams(r.body),e+=(-1===e.indexOf("?")?"?":"&")+t),o.open(r.method,e);try{o.timeout=r.timeout||0,"stream"!==b&&(o.responseType=b)}catch(e){}i.isFormData(r.body)||-1===["object","array"].indexOf(i.type(r.body))||(r.headers["Content-type"]="application/json;charset=utf-8",t=JSON.stringify(r.body));for(var v in r.headers)if("content-type"!==v.toLowerCase()||!i.isFormData(r.body)&&r.body&&!g)try{o.setRequestHeader(v,r.headers[v])}catch(e){}else delete r.headers[v];var w=function(e){return f.onerror&&(e=f.onerror(e,l)),e};o.onload=function(){if(o.status>=200&&o.status<300||304===o.status){var e=o.response||o.responseText;-1===(o.getResponseHeader("Content-Type")||"").indexOf("json")||i.isObject(e)||(e=JSON.parse(e));var t={data:e,engine:o,request:r};if(i.merge(t,o._response),f.handler&&(t=f.handler(t,l)||t),p)return;s(t)}else{var n=new Error(o.statusText);if(n.status=o.status,n=w(n)||n,p)return;u(n)}},o.onerror=function(e){var t=new Error(e.msg||"Network Error");t.status=0,t=w(t),p||u(t)},o.ontimeout=function(){var e=new Error("timeout [ "+o.timeout+"ms ]");e.status=1,e=w(e),p||u(e)},o._options=r,setTimeout(function(){o.send(g?null:t)},0)}});return s.engine=o,s}},{key:"all",value:function(e){return Promise.all(e)}},{key:"spread",value:function(e){return function(t){return e.apply(null,t)}}}]),e}();["get","post","put","delete","patch"].forEach(function(e){s.prototype[e]=function(t,r,n){return this.request(t,r,i.merge({method:e},n))}}),s.prototype,function(e,t){t()}(0,function(){window.fly=new s,window.Fly=s}),e.exports=s}});
//# sourceMappingURL=fly.min.js.map




// base
// 实例级配置 上线时混淆配置
// fly.config = {
// 	headers :{
//		'content-type': 'application/json',
//	},
//	baseURL: "http://192.168.1.213:8080/dswweb/vihiapi", //请求基地址
//	timeout: 8000, //超时时间，为0时则无超时限制
////	withCredentials: false //跨域时是否发送cookie
//};

//添加请求拦截器
//fly.interceptors.request.use(function(config, promise) {
//	
//	console.log(JSON.stringify(config));
//	return config;
//});
//
//
////添加响应拦截器，响应拦截器会在then/catch处理之前执行
//fly.interceptors.response.use(function(response, promise) {
//		var data = response.data;
//		var o = {};
//		if(data.code !== "0000"){
//			o.err = {
//				code: data.code,
//				message: data.message
//			}
//		}
//		o.data = data.data;
//		//只将请求结果的data字段返回
//		return o;
//	},
//	function(err, promise) {
//		//发生网络错误后会走到这里
//		//promise.resolve(err);
//		if(err.status === undefined){
//			err.status = 3;	
//		}
//		var ts = ["网络错误","请求超时","下载失败","请求失败"][err.status];
//		return {
//			code: err.status,
//			message: ts + "-" + err.message
//		};
//	}
//);

var dal = {
	BASE_URL: "http://192.168.1.213:8080/vihiManager/vihiapi",
};



// 统一请求 适配器
function requestAdapter(type, url, params, callback){
	url = dal.BASE_URL + url;
	
	// 获取用户account
	
	params.account = params.account || window.localStorage.getItem('_account_'); 
	
	//params.datatime = +(new Date());
	
	
	console.log("["+type+"]" +url);
	console.log(JSON.stringify(params));
	
	var options = {
		data: params,
		type: type,
		timeout: 30000,
		success: function(data){
			var o = {};
			if(data.code !== "0000" && data.code !== "0"){
				o.err = {
					code: data.code,
					message: data.message
				}
			}
			o.data = data.data;
			//只将请求结果的data字段返回
			callback(o.err, o.data);
		},
		error: function(err){
			if(err.status === undefined){
				err.status = 3;	
			}
			var ts = ["网络错误","请求超时","下载失败","请求失败"][err.status];
			ts = ts || "其它错误";
			callback({
				code: err.status,
				message: ts + "-" + err.message
			},null);
		}
	};
	if(type.toUpperCase() === 'POST'){
		options.contentType = 'application/json;charset=UTF-8';
	}
	return mui.ajax(url ,options);
	
	return fly.request(url, params, {
		method: type
	})
	.then(function(o){
		callback(o.err, o.data);
	})
	.catch(function(err){
		callback(err, null);
	});
}
