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
		return ra("post", "/devparam/basicinfo", {
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
		return ra("post", "/devparam/getAlarmClockList", {
			devid: devid,
			type: type
		}, callback);
	}
	
	/**
	 * 新建闹钟
	 * @param {Object} time
	 * @param {Object} weekdays
	 * @param {Object} enable
	 * @param {Object} repeat
	 * @param {Object} diaboloDuration
	 * @param {Object} devid
	 * @param {Object} type
	 * @param {Object} callback
	 */
	aiBox.addAlarmClock = function(time, weekdays, enable, repeat, diaboloDuration, devid, type, callback) {
		return ra("post", "/devparam/addAlarmClock", {
			time: time,
			weekdays: weekdays,
			enable: enable,
			repeat: repeat,
			diaboloDuration: diaboloDuration,
			devid: devid,
			type: type
		});
	}
	
	/**
	 * 编辑闹钟
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
	aiBox.updateAlarmClock = function(id, time, weekdays, enable, repeat, diaboloDuration, devid, type, callback) {
		return ra("post", "/devparam/updateAlarmClock", {
			id: id,
			time: time,
			weekdays: weekdays,
			enable: enable,
			repeat: repeat,
			diaboloDuration: diaboloDuration,
			devid: devid,
			type: type
		});
	}
	
	/**
	 * 删除闹钟
	 * @param {Object} id
	 * @param {Object} devid
	 * @param {Object} type
	 */
	aiBox.delAlarmClock = function(id, devid, type) {
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
	aiBox.setBroadcastInfo = function(devid, type, timeReport, alarmClockReminder, alarmPush, weatherReport, callReminder, callback) {
		return ra("post", "/devparam/setBroadcastInfo", {
			devid: devid,
			type: type,
			timeReport: timeReport,
			alarmClockReminder: alarmClockReminder,
			alarmPush: alarmPush,
			weatherReport: weatherReport,
			callReminder: callReminder
		}, callback);
	}

	_.aiBox = aiBox;

}(window.dal, window.requestAdapter));