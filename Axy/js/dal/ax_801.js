// 配件相关

(function(_, ra) {
	var aiBox = {};
	
	/**
	 * 获取智能音响基本信息
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} callback
	 */
	aiBox.basicInfo = function(devid, type, callback) {
		return ra("get", "/devparam/basicinfo", {
			devid: devid,
			type: type,
		}, callback);
	}
	
	/**
	 * 获取智能音响闹钟列表
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} callback
	 */
	aiBox.getAlarmClockList = function(devid, type, callback) {
		return ra("get", "/devparam/getAlarmClockList", {
			devid: devid,
			type: type
		}, callback);
	}
	
	/**
	 * 新建闹钟
	 * @param {Object} time, weekdays, enable, repeat, diaboloDuration, devid, type,
	 * @param {Object} time
	 * @param {Object} weekdays
	 * @param {Object} enable
	 * @param {Object} repeat
	 * @param {Object} diaboloDuration
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} callback
	 */
	aiBox.addAlarmClock = function(obj, callback) {
		return ra("post", "/devparam/addAlarmClock", obj, callback);
	}
	
	/**
	 * 编辑闹钟
	 * @param {Object} {id, time, weekdays, enable, repeat, diaboloDuration, devid, type} 对象
	 * @param {Object} id
	 * @param {Object} time
	 * @param {Object} weekdays
	 * @param {Object} enable
	 * @param {Object} repeat
	 * @param {Object} diaboloDuration
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} callback
	 */
	aiBox.updateAlarmClock = function(obj, callback) {
		return ra("post", "/devparam/updateAlarmClock", obj, callback);
	}
	
	/**
	 * 删除闹钟
	 * @param {Number} id 
	 * @param {String} devid 设备id
	 * @param {Number} type
	 * @param {Function} callback 
	 */
	aiBox.delAlarmClock = function(id, devid, type, callback) {
		return ra("post", "/devparam/delAlarmClock", {
			id: id,
			devid: devid,
			type: type
		}, callback);
	}
	
	/**
	 * 设置语音播报信息
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} timeReport
	 * @param {Object} alarmClockReminder
	 * @param {Object} alarmPush
	 * @param {Object} weatherReport
	 * @param {Object} callReminder
	 * @param {Object} callback
	 */
	aiBox.setBroadcastInfo = function(obj, callback) {
		return ra("post", "/devparam/setBroadcastInfo", obj, callback);
	}

	_.aiBox = aiBox;

}(window.dal, window.requestAdapter));