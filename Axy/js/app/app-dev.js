(function(app) {
	var dev = {};

	var absTypeidDir = {
		"WG-100": 0x80, // 智能网关
		"AX-903": 0x17, // 电力主机
		"AX-904": 0x90, // GPRS报警主机
		"VH-104MG": 0x1044, // 4路混合DVR
		"VH-104DG": 0x1045, // 4路DVR
		"VH-104GN": 0x1046, // 4路NVR

	};

	var _isEqual = function(name, type) {
		return type & (~(0x01 << 31)) === absTypeidDir[name];
	};

	dev.get0xType = function(name) {
		return absTypeidDir[name];
	};

	dev.findName = function(type) {
		type = type & (~(0x01 << 31));
		for(var i in absTypeidDir) {
			if(absTypeidDir[i] === type) {
				return i;
			}
		}
		return "";
	};

	dev.isEqual = function(name, type) {
		if(typeof name === 'function') {
			return name(type);
		}
		if(typeof name === 'string') {
			return _isEqual(name, type);
		}
		return
	}

	// 修复设备名称
	dev.fixName = function(name) {
		if(!name) {
			return ""
		}
		return name.replace(/<[^<]*>/gi, "");
	}

	app.dev = dev;
}(window.app || (window.app = {})));