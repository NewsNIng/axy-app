// App 公共模块库 


// 本地用户资料管理
(function(app){
	var key = "axyappuserinfokey";
	function s(value){
		return window.localStorage[value ? "setItem": "getItem"](key, value);
	}
	app.user = {
		// 获取本地用户信息
		get: function(){
			return JSON.parse(s() || "{}");
		},
		// 保存本地用户信息
		set: function(u){
			if(typeof u === "object"){
				u = JSON.stringify(u);
			}
			return s(u);
		},
		// 清除本地用户信息
		clear: function(){
			return s("{}");
		},
		// 是否存有本地用户信息
		has: function(){
			var u = s();
			for(var k in u){
				return true;
			}
			return false;
		}
	}
}(window.app || (window.app = {})));


// 拓展 user 功能
(function(app){
	// 用户进行登录
	app.user.login = function(){
		
	};
	// 用户进行注销
	app.user.logout = function(){
		// 提示用户
		
		// 清除本地用户信息
		// app.user.clear();
		
		// 重定向登录页面
		// app.user.login();
	};
	
	
	// 检查用户是否登录
	app.user.checkLogin = function(){
		// 这里的登录暂时认为是本地拥有用户信息
		var has = app.user.has();
		if(has){
			// 如果已经登录 就直接返回用户信息
			return app.user.get();
		}else{
			// 如果没登录，就可以跳转到登录页面或者做其它操作
			// app.user.login();
		}
	};
}(window.app));



