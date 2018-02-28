// 配件相关

(function(_, ra) {
	var devaccessory = {};

	// 获取所有配件列表
	devaccessory.allacc = function(callback) {
		return ra("get", "/devaccessory/allacc", {}, callback);
	};
	
	// 获取配件支持的我的设备列表
	devaccessory.accessorySupportDevList = function(aid, callback){
		return ra("get", "/devaccessory/accessorySupportDevList", {
			aid: aid
		}, callback);
	}
	
	
	/**
	 * 获取配件状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.getStatus = function(id, type, devid, devtype, callback) {
		return ra("post", "/devaccessory/status", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 设置智能灯控
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} position
	 * @param {Object} on
	 * @param {Object} callback
	 */
	devaccessory.light = function(id, devid, devtype, position, on, callback) {
		return ra("post", "/devaccessory/light", {
			id: id,
			devid: devid,
			devtype: devtype,
			position: position,
			on: on
		}, callback);
	}
	/**
	 * 智能灯控(单火线)调节亮度值
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} position
	 * @param {Object} value
	 * @param {Object} callback
	 */
	devaccessory.brightness = function(id, type, devid, devtype, position, value, callback) {
		return ra("post", "/devaccessory/brightness", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			position: position,
			value: value
		}, callback);
	}

	/**
	 * 智能插座开关控制
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} on
	 * @param {Object} callback
	 */
	devaccessory.socket = function(id, type, devid, devtype, on, callback) {
		return ra("post", "/devaccessory/socket", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			on: on
		}, callback);
	}

	/**
	 * 获取智能插座开关状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.socket_data = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/socket", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 配件告警时是否静音
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} silence
	 * @param {Object} action
	 * @param {Object} delay
	 * @param {Object} zonetype
	 * @param {Object} chnID
	 * @param {Object} externChn
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} ptzset
	 * @param {Object} callback
	 */
	devaccessory.silence = function(id, type, devid, devtype, silence, action, delay, zonetype, chnID, externChn, x, y, ptzset, callback) {
		return ra("post", "/devaccessory/silence", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			silence: silence,
			action: action,
			delay: delay,
			zonetype: zonetype,
			chnID: chnID,
			externChn: externChn,
			x: x,
			y: y,
			ptzset: ptzset
		}, callback);
	}

	/**
	 * 设置窗帘升降控制器动作
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} action
	 * @param {Object} callback
	 */
	devaccessory.curtainlifter = function(id, type, devid, devtype, action, callback) {
		return ra("post", "/devaccessory/curtainlifter", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			action: action
		}, callback);
	}

	/**
	 * 获取窗帘升降控制器状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.curtainlifter_get = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/curtainlifter", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 设置窗帘控制器动作
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} action
	 * @param {Object} callback
	 */
	devaccessory.curtain = function(id, type, devid, devtype, action, callback) {
		return ra("post", "/devaccessory/curtain", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			action: action
		}, callback);
	}

	/**
	 * 修改配件名称
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} newName
	 * @param {Object} name
	 * @param {Object} action
	 * @param {Object} delay
	 * @param {Object} zonetype
	 * @param {Object} chnID
	 * @param {Object} externChn
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} ptzset
	 * @param {Object} callback
	 */
	devaccessory.name = function(aid, type, devid, devtype, newName, name, action, delay, zonetype, chnID, externChn, x, y, ptzset, callback) {
		return ra("post", "/devaccessory/name", {
			aid: aid,
			type: type,
			devid: devid,
			devtype: devtype,
			newName: newName,
			name: name,
			action: action,
			delay: delay,
			zonetype: zonetype,
			chnID: chnID,
			externChn: externChn,
			x: x,
			y: y,
			ptzset: ptzset
		}, callback);
	}

	/**
	 * 获取智能灯控状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.light_state = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/light", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 配件从设备解绑
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.unbindcam = function(id, type, devid, devtype, callback) {
		return ra("post", "/devaccessory/unbindcam", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 获取甲醛探测器状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.formaldehydedetector = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/formaldehydedetector", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 配件绑定到设备
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} newDevid
	 * @param {Object} action
	 * @param {Object} delay
	 * @param {Object} zonetype
	 * @param {Object} chnID
	 * @param {Object} externChn
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} ptzset
	 * @param {Object} callback
	 */
	devaccessory.bindcam = function(devaccessoryinfo, newDevid, devtype, callback) {
		devaccessoryinfo.newDevid = newDevid;
		devaccessoryinfo.devtype = devtype;
		devaccessoryinfo.id = devaccessoryinfo.aid;
		return ra("post", "/devaccessory/bindcam", devaccessoryinfo, callback);
	}

	/**
	 * 获取窗帘控制器状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.curtain_state = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/curtain", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 获取CO探测器状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.codectector = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/codectector", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 获取燃气探测器状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.gasdectector = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/gasdectector", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 设置普通门锁
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} open
	 * @param {Object} password
	 * @param {Object} callback
	 */
	devaccessory.lock = function(id, type, devid, devtype, open, password, callback) {
		return ra("post", "/devaccessory/lockv2", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			open: open,
			password: password
		}, callback);
	}

	/**
	 * 设置V2门锁
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} open
	 * @param {Object} password
	 * @param {Object} callback
	 */
	devaccessory.lockv2 = function(id, type, devid, devtype, open, password, callback) {
		return ra("post", "/devaccessory/lockv2", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			open: open,
			password: password
		}, callback);
	}

	/**
	 * 获取普通门锁状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.lock_get = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/lock", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 获取V2门锁状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.lockv2_get = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/lockv2", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 获取磁力门锁状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.magneticLock = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/magneticLock", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 设置磁力门锁
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} open
	 * @param {Object} password
	 * @param {Object} callback
	 */
	devaccessory.magneticLock_set = function(id, type, devid, devtype, open, password, callback) {
		return ra("post", "/devaccessory/magneticLock", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			open: open,
			password: password
		}, callback);
	}

	/**
	 * 获取红外模块状态
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} callback
	 */
	devaccessory.irModule = function(id, type, devid, devtype, callback) {
		return ra("get", "/devaccessory/irModule", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype
		}, callback);
	}

	/**
	 * 发送红外码
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} data
	 * @param {Object} callback
	 */
	devaccessory.irModule_set = function(id, type, devid, devtype, data, callback) {
		return ra("post", "/devaccessory/irModule", {
			id: id,
			type: type,
			devid: devid,
			devtype: devtype,
			data: data
		}, callback);
	}

	/**
	 * 修改配件告警延迟
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} name
	 * @param {Object} action
	 * @param {Object} delay
	 * @param {Object} zonetype
	 * @param {Object} chnID
	 * @param {Object} externChn
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} ptzset
	 * @param {Object} newdelay
	 * @param {Object} callback
	 */
	devaccessory.delay = function(accessory, devType, newdelay, callback) {
		accessory.devType = devType;
		accessory.newdelay = newdelay;
		return ra("post", "/devaccessory/delay", accessory, callback);
	}

	/**
	 * 修改配件使能
	 * @param {Object} accessory
	 * @param {Object} callback
	 */
	devaccessory.enable = function(accessory, devType, callback) {
		accessory.devType = devType;
		return ra("post", "/devaccessory/enable", accessory, callback);
	}

	/**
	 * 删除配件
	 * @param {Object} accessory
	 * @param {Object} callback
	 */
	devaccessory.devDelete = function(accessory, devType, callback) {

		accessory.devtype = devType;
		return ra("post", "/devaccessory/delete", accessory, callback);
	}

	/**
	 * 通过配件ID获取配件初始化信息
	 * @param {Object} id 配件id
	 * @param {Object} callback
	 */
	devaccessory.initbyid = function(id, callback) {
		return ra("get", "/devaccessory/initbyid", {
			id: id
		}, callback);
	}

	/**
	 * 甲醛趋势图
	 * @param {Object} devid 设备ID
	 * @param {Object} areaid 防区ID
	 * @param {Object} type 1天，2月,3年
	 * @param {Object} callback
	 */
	devaccessory.formaldehydeChart = function(devid, areaid, type, callback) {
		return ra('get', "/alarm/formaldehyde/list", {
			devid: devid,
			areaid: areaid,
			type: type
		}, callback);
	}

	/**
	 * 根据配件及设备id获取配件详情
	 * @param {Object} devid 设备id
	 * @param {Object} aid 配件id
	 * @param {Object} callback
	 */
	devaccessory.getinfo = function(devid, aid, callback) {
		return ra('get', "/devaccessory/getinfo", {
			devid: devid,
			aid: aid
		}, callback);
	}

	/**
	 * 获取V2门锁状态
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} callback
	 */
	devaccessory.getLockv2 = function(devid, devtype, id, type, callback) {
		return ra("get", "/devaccessory/lockv2", {
			devid: devid,
			devtype: devtype,
			id: id,
			type: type
		}, callback);
	}

	/**
	 * 设置V2门锁状态
	 * @param {Object} devid
	 * @param {Object} devtype
	 * @param {Object} id
	 * @param {Object} type
	 * @param {Object} callback
	 */
	devaccessory.setLockv2 = function(devid, devtype, id, type, open, password, callback) {
		return ra("post", "/devaccessory/lockv2", {
			devid: devid,
			devtype: devtype,
			id: id,
			type: type,
			open: open,
			password: password
		}, callback);
	}

	_.devaccessory = devaccessory;

}(window.dal, window.requestAdapter));