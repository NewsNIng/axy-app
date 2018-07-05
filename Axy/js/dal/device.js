// 设备相关
(function(_, ra) {

	var IMEI = "";

	var PUSH_ID;

	var SENDMODE;

	function initPlus() {
		IMEI = plus.device.uuid;
		PUSH_ID = new ni.Cache('push_key', "", {
			plus: true
		});
		SENDMODE = new ni.Cache('send_mode', 36,{
			plus: true
		})
	}
	
	function plusReady(fn) {
		if(window.plus) {
			setTimeout(fn);
		} else {
			document.addEventListener("plusready", fn);
		}
	}

	plusReady(initPlus);
	
	var device = {};

	/**
	 * 设备添加
	 * @param {String} devid 设备id
	 */
	device.add = function(devid, callback) {
		return ra("post", "/device/add", {
			devid: devid,
			target: PUSH_ID.data || "",
			sendmode: SENDMODE.data,
		}, callback);
	};
	
	/**
	 * 4.0蓝牙设备的添加
	 */
	device.add40Blue = function(devid, cid, p2pPasswd, callback){
		return ra("post", "/device/add", {
			devid: devid,
			cid: cid,
			p2pPasswd: p2pPasswd,
			target: PUSH_ID.data || "",
			sendmode: SENDMODE.data,
		}, callback);
	}

	/**
	 * 设备列表（分页）
	 * @param {Number} pageNumber 
	 * @param {Number} pageSize
	 */
	device.list = function(pageNumber, callback, pageSize) {
		return ra("get", "/device/list", {
			pageNumber: pageNumber,
			pageSize: pageSize || 10,
			imei: IMEI
		}, callback);
	};

	/**
	 * 设备删除
	 */
	device.delete = function(devid, callback) {
		return ra('post', '/device/delete/' + devid, {}, function() {
			// [事件] 删除设备
			app && app.statis && app.statis.emit("delete", {});
			callback.apply(callback, arguments);
		});
	}

	/**
	 * 分享设备删除
	 */
	device.deleteshare = function(devid, callback) {
		var account = window.localStorage.getItem("_account_");
		return ra('post', '/device/delete/share/' + devid + '/user/' + account, {}, function(data) {
			// [事件] 删除设备
			app && app.statis && app.statis.emit("delete", {});
			callback.apply(callback, arguments);
		});
	}
	device.logs = {
		/**
		 * 摄像机日志列表
		 * @param {Object} pageNumber
		 * @param {Object} devid
		 * @param {Object} pageSize
		 */
		list: function(pageNumber, devid, callback, pageSize, eventid, hdtypeid, handlers, attime) {
			return ra('post', '/device/log/list', {
				pageNumber: pageNumber,
				pageSize: pageSize || 10,
				devid: devid,
				eventid: eventid,
				hdtypeid: hdtypeid,
				handlers: handlers,
				attime: attime
			}, callback);
		}
	}

	/**
	 * 电力主机
	 */
	device.electric = {
		// 当前状态
		state: function(_id, callback) {
			return ra('get', '/device/electric/state/' + _id, {}, callback);
		},
		// 告警日志
		alarmlist: function(_id, pageNumber, callback, pageSize) {
			return ra('get', '/alarm/electric/list', {
				did: _id,
				pageNumber: pageNumber,
				pageSize: pageSize || 10
			}, callback);
		},
		// 绑定摄像头主机
		binding: function(devid, binding, callback) {
			return ra('post', '/device/electric/binding', {
				devid: devid,
				binding: binding
			}, callback);
		},
		// 解绑摄像头主机
		unbinding: function(devid, callback) {
			return ra('post', '/device/electric/clearbinding', {
				devid: devid,
			}, callback);
		},
		// 获取绑定设备信息详情
		getDeviceInfo: function(devid, callback){
			return ra("get", '/device/electric/getDeviceInfo', {
				devid: devid
			}, callback)
		},

	};

	/**
	 * 设备分享
	 * @param {String} did 设备主键
	 * @param {Number} authorize 权限
	 */
	device.share = function(did, authorize, callback) {
		return ra("get", "/share/getVcode", {
			did: did,
			authorize: authorize
		}, callback);
	};

	/**
	 * 获取分享的设备
	 * @param {String} code
	 */
	device.getShare = function(code, callback) {
		return ra("get", "/share/codeValidation", {
			keystr: code
		}, callback);
	};

	/**
	 * 获取我的分享好友列表
	 */
	device.shareList = function(callback) {
		return ra("get", "/share/list", {}, callback);
	};

	device.shareListByDevid = function(devid, callback) {
		return ra("get", "/share/list", {
			devid: devid,
		}, callback);
	}

	device.delShare = function(id, callback) {
		return ra("post", "/share/delete/" + id, {}, callback);
	};

	/**
	 * 获取设备告警参数
	 * @param {Object} type 设备类型
	 * @param {Object} devid 设备id
	 */
	device.alarm = function(type, devid, callback) {
		return ra("get", "/devparam/alarm", {
			type: type,
			devid: devid
		}, callback);
	}

	_.device = device;

}(window.dal, window.requestAdapter));