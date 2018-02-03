(function(app) {
	var dev = {};

	var absTypeidDir = {
		"AX-903": 0x17, // 电力主机
		"AX-360": 0x20, // 360

		"AX-403": 0x30, // AX_403
		"AX-203": 0x31, // AX_203
		"AX-503": 0x32, // AX_503
		"AX-803": 0x33, // AX_803

		"AX-603": 0x35, //AX-603 半球
		"AX-803A": 0x36, //AX-803 数字
		"AX-403A": 0x37, // AX_403A
		"AX-203A": 0x38, // AX_203A

		"AX-503HD": 0x39, //AX-503HD筒机(1920X1080)

		"AX-203D": 0x3a, //AX-203D   龙猫摄像机（回声消除）
		"WG-100": 0x80, // 智能网关
		"AX-904": 0x90, // GPRS报警主机

		"VH-104MG": 0x1044, // 4路混合DVR
		"VH-104DG": 0x1045, // 4路DVR
		"VH-104GN": 0x1046, // 4路NVR
		"none": 0, // 未知

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

	dev.fixType = function(type) {
		return type & (~(0x01 << 31));
	}

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

	// 是否布防
	dev.isArm = function(workmode) {
		var aaa = 0x01 << 30;
		return(workmode & aaa) == aaa;
	}

	dev.getArmBit = function() {
		return 0x01 << 30;
	}

	app.dev = dev;
}(window.app || (window.app = {})));