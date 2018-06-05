// 系统相关
(function(_, ra) {
	var devparam = {};

	function plusReady(fn) {
		if(window.plus) {
			setTimeout(fn);
		} else {
			document.addEventListener("plusready", fn);
		}
	}

	/**
	 * 获取设备详细信息
	 * @param {String} devid 设备id
	 * @param {String} type 设备类型
	 * @param {Function} callback
	 */
	devparam.basicinfo = function(devid, type, callback) {
		return ra('get', '/devparam/basicinfo', {
			devid: devid,
			type: type,
		}, callback);
	};

	/**
	 * 获取设备布防计划
	 * @param {String} devid
	 * @param {String} type
	 * @param {Function} callback
	 */
	devparam.alarmplan = function(devid, type, callback) {
		return ra('get', '/devparam/alarmplan', {
			devid: devid,
			type: type,
		}, callback);
	};

	devparam.setAlarmplan = function(devid, type, data, callback) {
		return ra("post", '/devparam/alarmplan', {
			devid: devid,
			type: type,
			data: data
		}, callback);
	};

	/**
	 * 获取设备录像计划
	 * @param {String} devid
	 * @param {String} type
	 * @param {Function} callback
	 */
	devparam.recordplan = function(devid, type, callback) {
		return ra('get', '/devparam/recordplan', {
			devid: devid,
			type: type,
		}, callback);
	};

	devparam.setRecordplan = function(devid, type, data, callback) {
		return ra("post", '/devparam/recordplan', {
			devid: devid,
			type: type,
			data: data
		}, callback);
	};

	/**
	 * 设备重启
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} callback
	 */
	devparam.reboot = function(devid, type, callback) {
		return ra('post', '/devparam/reboot', {
			devid: devid,
			type: type,
		}, function(){
			// [事件] 重启设备
			plusReady(function(){
				plus.statistic.eventTrig("restart", {});	
			});
			callback.apply(callback, arguments);
		});
	};

	devparam.wifi = function(devid, type, ssid, passw, callback) {
		return ra('post', '/devparam/wifi', {
			devid: devid,
			type: type,
			ssid: ssid,
			passw: passw,
			en: 1, // 使能
			securitytype: 1, // 0open1pwa2wep
			ishex: 1, // 1 16进制 0 ascii
		}, callback);
	};

	/**
	 * 更改设备名称
	 * @param {String} devid
	 * @param {String} type
	 * @param {String} location 设备新名称
	 * @param {Object} callback
	 */
	devparam.devname = function(devid, type, location, callback) {
		return ra('post', '/devparam/devname', {
			devid: devid,
			type: type,
			location: location
		}, function(){
			// [事件] 修改设备或配件名称
			plusReady(function(){
				plus.statistic.eventTrig("modify", {
					type: "devive"
				});	
			});
			
			callback.apply(callback, arguments);
		});
	};

	/**
	 * 更改设备名称 location
	 * @param {String} devid
	 * @param {String} location 设备新名称
	 * @param {Object} callback
	 */
	devparam.location = function(devid, location, callback) {
		return ra('post', '/devparam/location', {
			devid: devid,
			location: location
		}, callback);
	};

	/**
	 *  设备布撤防,SOS，静音
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} state  1:sos 2:静音 4:撤防 8:设防
	 * @param {Object} callback
	 */
	devparam.remotecontrol = function(devid, type, state, callback) {
		return ra('post', '/devparam/remotecontrol', {
			devid: devid,
			type: type,
			state: state
		}, callback);
	};

	// 设置摄像机正反方向
	devparam.imageorientation = function(devid, type, upside, callback) {
		return ra('post', '/devparam/imageorientation', {
			devid: devid,
			type: type,
			upside: upside
		}, callback);
	};

	// 获取摄像机正反方向
	devparam.getImageorientation = function(devid, type, callback) {
		return ra('get', '/devparam/imageorientation', {
			devid: devid,
			type: type
		}, callback);
	};

	devparam.openled = function(devid, type, on, callback) {
		return ra('post', '/devparam/openled', {
			devid: devid,
			type: type,
			on: on
		}, callback);
	};
	devparam.getOpenled = function(devid, type, callback) {
		return ra('get', '/devparam/openled', {
			devid: devid,
			type: type
		}, callback);
	};

	/**
	 * 获取设备告警参数
	 * @param {Object} devid 设备id
	 * @param {Object} type 设备类型
	 */
	devparam.getAlarm = function(devid, type, callback) {
		return ra("get", "/devparam/alarm", {
			devid: devid,
			type: type
		}, callback);
	};

	/**
	 * 设置设备告警参数
	 * @param {Object} devid 设备id
	 * @param {Object} type 设备类型
	 * @param {Object} recTime 录像时间
	 * @param {Object} interval 时间间隔
	 * @param {Object} durationTime 播放时间
	 */
	devparam.setAlarm = function(devid, type, en, recTime, interval, durationTime, callback) {
		return ra("post", "/devparam/alarm", {
			devid: devid,
			type: type,
			en: en,
			recTime: recTime,
			interval: interval,
			durationTime: durationTime
		}, callback);
	};

	/**
	 * 多路设备通道
	 * @param {String} devid
	 * @param {Number} devtype
	 * @param {Function} callback
	 */
	devparam.chlist = function(devid, type, callback) {
		return ra("get", "/devparam/chlist", {
			devid: devid,
			type: type
		}, callback);
	};

	/**
	 * 设备GPRS信号强度
	 * @param {String} devid 
	 * @param {Number} type
	 */
	devparam.gprsParam = function(devid, type, callback) {
		return ra("get", "/devparam/gprsParam", {
			devid: devid,
			type: type
		}, callback);
	};

	/**
	 * 设备WIFI参数
	 * @param {String} devid 
	 * @param {Number} type
	 */
	devparam.getwifi = function(devid, type, callback) {
		return ra("get", "/devparam/getwifi", {
			devid: devid,
			type: type
		}, callback);
	};

	/**
	 * 360开关隐私模式
	 * @param {String} devid
	 * @param {Boolean} state
	 */
	devparam.setPrivacy = function(devid, state, callback) {
		return ra("post", "/devparam/setPrivacy", {
			devid: devid,
			state: +state,
			clientID: plus.device.uuid,
		}, callback);
	};

	_.devparam = devparam;

}(window.dal, window.requestAdapter));