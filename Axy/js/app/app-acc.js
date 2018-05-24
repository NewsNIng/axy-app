(function(app) {

	var acc = {};

	var accNameDir = {
		// 1: "未知类型",
		0x00: "PIR",
		0x10: "声光报警器",
		0x11: "开关量报警器",
		0x13: "旧灯光控制器",
		0x14: "警示牌",
		0x15: "智能插座",
		0x16: "甲醛报警器",
		0x17: "智能锁",
		0x18: "红外遥控模块",
		0x19: "新灯光控制(单火线)",
		0x20: "迎宾器",
		0x21: "新灯光控制(零火线)",
		0x22: "窗帘控制器",
		0x23: "遥控器",
		0x24: "磁力锁",
		//0x25: "电力安全主机",
		0x26: "窗帘升降器",
		0x27: "新智能锁",
		0x28: "新智能锁（LK-02R）",
		0x29: "新声光报警器",
		0x30: "紧急按钮报警器",
		0x41: "门磁",
		0x50: "烟雾报警器",
		0x70: "振动报警器",
		0x81: "红外幕帘",
		0x91: "小报(隐形防盗网)",
		0xa0: "燃气报警器",
		0xa1: "一氧化碳报警器",
		0xFF0000: "有线输入",
		0xFF0001: "手机遥控"
	};
	
	// 智能控制配件
	var accSmart = [
		0x13,
		0x15,
		0x17,
		0x18,
		0x19,
		0x21,
		0x22,
		0x26,
		0x27,
		0x28
	];
	
	// 通过type查找配件名称
	acc.findName = function(type){
		var s = accNameDir[type];
		return s || "未知类型";
	};
	
	// 是否是智能控制配件
	acc.isTypeSmart = function(type){
		return accSmart.indexOf(type) >= 0;
	};
	
	// 是否是智能安全配件
	acc.isTypeSafe = function(type){
		return !acc.isTypeSmart(type);
	};

	acc.islight = function(type){
		return type === 0x19||type === 0x21;
	};

	app.acc = acc;

}(window.app || (window.app = {})))