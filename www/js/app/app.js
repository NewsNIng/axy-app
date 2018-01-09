// App 公共模块库 

//通过参数个数的不同实现重载
function addMethod(obj, name, fn) {
	var ofn = obj[name];
	obj[name] = function() {
		if(fn.length === arguments.length) {
			return fn.apply(this, arguments);
		} else if(typeof ofn === 'function') {
			return ofn.apply(this, arguments);
		}
	};
}

(function(app) {
	app.plusReady = function(fn) {
		window.plus ? setTimeout(fn.bind(this)) : document.addEventListener("plusready", fn.bind(this), false);
	};
}(window.app || (window.app = {})));

// 本地用户资料管理
(function(app) {
	var key = "axyappuserinfokey";

	function s(value) {
		return window.localStorage[value ? "setItem" : "getItem"](key, value);
	}
	app.user = {
		// 获取本地用户信息
		get: function() {
			return JSON.parse(s() || "{}");
		},
		// 保存本地用户信息
		set: function(u) {
			if(typeof u === "object") {
				u = JSON.stringify(u);
			}
			return s(u);
		},
		// 清除本地用户信息
		clear: function() {
			window.localStorage.setItem('_account_', '');
			return s("{}");
		},
		// 是否存有本地用户信息
		has: function() {
			var u = app.user.get();
			for(var k in u) {
				return true;
			}
			return false;
		}
	}
}(window.app || (window.app = {})));

// 拓展 user 功能
(function(app) {
	// 用户进行登录
	app.user.login = function() {

	};
	// 用户进行注销
	app.user.logout = function() {
		// 提示用户

		// 清除本地用户信息
		app.user.clear();

		// 重定向登录页面 or 重启App 
		// app.user.login();
	};

	// 检查用户是否登录
	app.user.checkLogin = function() {
		// 这里的登录暂时认为是本地拥有用户信息
		var has = app.user.has();
		if(has) {
			// 如果已经登录 就直接返回用户信息
			return app.user.get();
		} else {
			// 如果没登录，就可以跳转到登录页面或者做其它操作
			// app.user.login();
		}
	};

	// 重载 user.get 如果传入function 则跳转登录并且登录成功会通知这个回调函数
	addMethod(app.user, 'get', function(fn) {
		var u = null;
		if(app.user.has()) {
			u = app.user.get();
			return typeof fn === 'function' ? fn(u) : u;
		}
		return app.page && app.page.getLogin(fn);
	});
}(window.app));

/**
 * 设备信息
 */
(function(app) {
	var device = {};
	/**
	 * 异步回调获取应用信息
	 * @param {Function} callbck 回调函数
	 * @param {String} appid 应用appid 默认为本应用
	 */
	device.getInfo_async = function(callbck, appid) {
		plus.runtime.getProperty(appid || plus.runtime.appid, function(wgtinfo) {
			/*
			appid: (String 类型 )应用的APPID
			version: (String 类型 )应用的版本号
			name: (String 类型 )应用的名称
			description: (String 类型 )应用描述信息
			author: (String 类型 )应用描述信息
			email: (String 类型 )开发者邮箱地址
			license: (String 类型 )应用授权描述信息
			licensehref: (String 类型 )应用授权说明链接地址
			features: (String[] 类型 )应用许可特性列表
			*/

			wgtinfo.os = plus.os.name;
			callbck(wgtinfo);
		});
	};
	/**
	 * 获取由第三方调用启动参数，如（url启动）
	 */
	device.getArguments = function() {
		var s = plus.runtime.arguments;
		if(!s && !~s.indexOf('?')) {
			// 为空 或 无参时
			return null;
		}
		return s.split('?').pop().split('&').reduce(function(o, item) {
			// 分割 key value
			item = item.split('=');
			o[item[0]] = item[1] || null;
			return o;
		}, {});
	};

	/**
	 * 同步获取本应用数据
	 */
	addMethod(device, 'getVersion', function() {
		return window.localStorage.getItem("app_version");
	});
	/**
	 * 异步获取本应用数据
	 */
	addMethod(device, 'getVersion', function(fn) {
		device.getInfo_async(function(info) {
			window.localStorage.setItem('app_version', info.version);
			fn(info.version);
		});
	});

	// 自动保存最新的应用数据版本至本地储存
	//app.plusReady(function() {
	//	device.getVersion(function() {});
	//});

	app.device = device;
}(window.app));

(function(app) {

	var net = {};

	/**
	 * 获取当前的网络类型
	 */
	net.getType = function() {
		var networkTypes = {};
		networkTypes[plus.networkinfo.CONNECTION_UNKNOW] = "unknow"; //未知
		networkTypes[plus.networkinfo.CONNECTION_NONE] = "none"; //未连接
		networkTypes[plus.networkinfo.CONNECTION_ETHERNET] = "line"; //有线网络
		networkTypes[plus.networkinfo.CONNECTION_WIFI] = "wifi"; //wifi
		networkTypes[plus.networkinfo.CONNECTION_CELL2G] = "2g"; //2g
		networkTypes[plus.networkinfo.CONNECTION_CELL3G] = "3g"; //3g
		networkTypes[plus.networkinfo.CONNECTION_CELL4G] = "4g"; //4g
		return networkTypes[plus.networkinfo.getCurrentType()];
	};

	/**
	 * 增加网络变化监听
	 * @param {net.TYPE} name 需要监听的名称 可选
	 * @param {Function} fn 函数
	 */
	net.listen = function(name, fn) {
		if(typeof name === 'function') {
			fn = name;
			name = "";
		}
		document.addEventListener('netchange', function() {
			if(name && name !== net.getType()) {
				return false;
			}
			fn(net.getType());
		});
	};

	app.net = net;

}(window.app));

(function(app) {
	var ios = {};

	var __iosSafeBoxPath = "";
	
	var _account_;
	
	// 获取ios沙盒地址
	ios.getSafeBoxPath = function() {
		if(!__iosSafeBoxPath) {
			__iosSafeBoxPath = plus.io.convertLocalFileSystemURL("../../../../../../../") + '/';
		}
		if(__iosSafeBoxPath.indexOf('file://') < 0){
			__iosSafeBoxPath = 'file://' + __iosSafeBoxPath;
		}
		return __iosSafeBoxPath;
	}
	
	ios.getScreenshotByDevId = function(devid){
		if(!_account_){
			_account_ = window.localStorage.getItem('_account_');
		}
		if(!__iosSafeBoxPath) {
			__iosSafeBoxPath = plus.io.convertLocalFileSystemURL("../../../../../../../") + '/';
		}
		if(__iosSafeBoxPath.indexOf('file://') < 0){
			__iosSafeBoxPath = 'file://' + __iosSafeBoxPath;
		}
		__iosSafeBoxPath = __iosSafeBoxPath + "Documents/account_"+ _account_ +"/assets/" + devid + '.jpeg?t=' + new Date().getTime();
		return __iosSafeBoxPath;
	}

	app.ios = ios;
}(window.app));


(function(app) {
	var android = {};

	// 获取ios沙盒地址
	android.getScreenshotByDevId = function(devid) {
		return 'file:///storage/emulated/0/CameraFamily/Thumbnail/' + devid + '.jpeg?t=' + new Date().getTime();
	}

	app.android = android;
}(window.app));