(function(w, pg) {
	var B;
	_plusFn = function() {
		B = w.plus.bridge;
	};
	
	if(w.plus) {
		setTimeout(_plusFn);
	} else {
		document.addEventListener("plusready", _plusFn, true);
	}

	pg.fun2ok = function(fn) {
		return typeof fn === 'function' ? function(args) {
			fn(args);
		} : null;
	}

	pg.getCallBackId = function(s, f) {
		return B.callbackId(pg.fun2ok(s), pg.fun2ok(f));
	}

	pg.asyncExec = function(_BARCODE, _METHODNAME, _ARGARR, _SFN, _FFN) {
		return;
		_ARGARR.unshift(pg.getCallBackId(_SFN, _FFN));
		return B.exec(_BARCODE, _METHODNAME, _ARGARR);
	}

	pg.syncExec = function(_BARCODE, _METHODNAME, _ARGARR) {
		return;
		return B.execSync(_BARCODE, _METHODNAME, _ARGARR);
	}

	/**
	 * JSON 转 XML
	 * @param {Object} o
	 */
	pg.json2xml = function(_o) {
		function _jo2xml(o) {
			var str = "";
			if(!o.tagName) {
				return str;
			};
			str += '<' + o.tagName;
			for(var i in o.attr) {
				str += ' ' + i + '=' + '"' + o.attr[i] + '"';
			}
			str += '>';
			for(var j in o.children) {
				str += _jo2xml(o.children[j]);
			}
			str += '</' + o.tagName + '>';
			return str;
		};
		return '<?xml version="1.0" encoding="utf-8"?>' + _jo2xml(_o);
	}

	
}(window, window.plug || (window.plug = {})));

(function(w) {
	var xmlFactory = {};

	var cid = 10;

	var pucIDTag = "<PUC_ID></PUC_ID>";
	var videoTag = "<Message><MEDIA><VIDEO>";
	var videoTag_ = "</VIDEO></MEDIA></Message>";
	var zonesTag = "<Message><SYSTEM><ZONES>";
	var zonesTag_ = "</ZONES></SYSTEM></Message>";
	var deviceNameTag = "<Message><SYSTEM>";
	var deviceNamTag_ = "</SYSTEM></Message>";

	var recplansTag = "<Message><SYSTEM><RECPLANS>";
	var recplansTag_ = "</RECPLANS></SYSTEM></Message>";
	var alarmPlansTag = "<Message><SYSTEM><PLANS>";
	var alarmPlansTag_ = "</PLANS></SYSTEM></Message>";
	var netTag = "<Message><NET>";
	var netTag_ = "</NET></Message>";
	var timeZonesTag = "<Message><SYSTEM>";
	var timeZonesTag_ = "</SYSTEM></Message>";

	xmlFactory.CreatDeviceName = function(DeviceName) {
		var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>" +
			"<Message CID=\"" + (cid++) + "\" " + "Verison=\"2.0.0\" MsgType=\"MSG_SET_PARAM_V2_REQ\">" +
			"<DSW_BODY>" + pucIDTag +
			deviceNameTag +
			"<LOCATION VALUE=\"" + DeviceName + "\"/>" +
			deviceNamTag_ +
			"</DSW_BODY>" +
			"</Message>";
		return xml;
	};

	/**
	 * 设置wifi参数
	 */
	xmlFactory.CreatAnxinWifi = function(ssid, wifiPassword) {
		var wifiXml = "";

		wifiXml = "<WIFI EN=\"1\"  SSID=\"" +
			ssid +
			"\"  PASSW=\"" + wifiPassword +
			"\"  SECURITYTYPE=\"1\"  ISHEX=\"0\"  IP=\"\"  MAC=\"\"  SIGNAL=\"\" />";

		var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>" +
			"<Message CID=\"" + (cid++) + "\" " + "Verison=\"2.0.0\" MsgType=\"MSG_SET_PARAM_V2_REQ\">" +
			"<DSW_BODY>" + pucIDTag +
			netTag +
			wifiXml +
			netTag_ +
			"</DSW_BODY>" +
			"</Message>";

		return xml;
	};
		
		
	xmlFactory.CreatAlarmListXml = function(arr){
		var zoneXML = "";
		var temp;
		for(var i = 0, l = arr.length; i < l; i++){
			temp = arr[i];
			zoneXML += "<PLAN ACTION=\"1\""
				+" START=\""
				+ temp.start
				+"\" END=\""+temp.end
				+"\" RECYCLE=\""+temp.recycle
				+"\" />";
		}
		
		
		var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>"
				+ "<Message CID=\""+(cid++)+"\" "+ "Verison=\"2.0.0\" MsgType=\"MSG_SET_PARAM_V2_REQ\">"
				+"<DSW_BODY>"+pucIDTag
				+alarmPlansTag
				+zoneXML
				+alarmPlansTag_ 
				+"</DSW_BODY>"
				+"</Message>";		
		return xml;
	
	}
	
	w.xmlFactory = xmlFactory;
}(window));

(function(w) {
	var pg = w.plug,
		N = 'H5NativeBridge',
		pgn = pg[N] || (pg[N] = {});

	var splice = Array.prototype.splice;

	/**
	 * 初始化原生系统（需在用户登录成功后初始化原生系统）
	 * @param {String} username 用户名
	 * @param {String} serverurl 顶级服务器地址
	 * @param {Function} sfn 正确回调函数
	 * @param {Function} ffn 失败回调函数
	 */
	pgn.InitNativeSystem = function(username, password, serverurl, sfn, ffn) {
		return pg.asyncExec(N, 'InitNativeSystem', [username, password, serverurl], sfn, ffn);
	};

	/**
	 * 初始化及更新原生设备列表
	 * @param {Array} datas 设备列表组成的json字符串，具体参考前端 接口名称: 获取主机摄像机列表(分页） 详细说明。
	 */
	pgn.InitNativeDevList = function(datas) {
		return pg.syncExec(N, 'InitNativeDevList', [datas]);
	};

	/**
	 * 播放设备音视频
	 * @param {Number} deviceid 设备ID
	 * @param {Number} way 播放通道，如果是单通道默认为0
	 * @param {Number} way2  内部通道或者外部通道 0 -- 内部通道 1-- 外部通道 通道号从0开始 除104GN外其他的都默认为内部通道
	 */
	pgn.StartDevicePlay = function(deviceid, way, way1, devName, sf, ff) {
		typeof way === 'undefined' && (way = 0);
		typeof way1 === 'undefined' && (way1 = 1);
		return pg.asyncExec(N, 'StartDevicePlay', [deviceid, way, way1, devName], sf, ff);
	};

	/**
	 * 获取所有设备的运行状态
	 */
	pgn.GetAllDeviceRunStateSync = function() {
		return pg.syncExec(N, 'GetAllDeviceRunStateSync', []);
	}

	/**
	 * 获取所有设备的信息
	 */
	pgn.GetAllDeviceInfoASync = function(sf, ff) {
		return pg.asyncExec(N, 'GetAllDeviceInfoASync', [], sf, ff);
	}

	/**
	 * 
	 * @param {Object} deviceid 设备ID
	 * @param {Object} iqid 智能配件ID
	 * @param {Object} name 配件名称
	 * @param {Object} delay 延时 单位秒
	 * @param {Object} ptz ptz巡航轨迹集（若无默认为0）
	 * @param {Object} bindV 绑定视频通道号
	 * @param {Object} sf
	 * @param {Object} ff
	 */
	//pgn.AddSmartDeviceAsyn = function(deviceid, iqid, name, delay, ptz, bindV, sf, ff) {
	//	return pg.asyncExec(N, 'AddSmartDeviceAsyn', [deviceid, iqid, name, delay, ptz, bindV], sf, ff);
	//};

	/**
	 * 删除单个配件
	 * @param {Number} deviceid 设备ID
	 * @param {String} iqid 智能配件ID （十六进制）
	 * @param {Function} sf 正确回调函数
	 * @param {Function} ff 失败回调函数
	 */
	//pgn.DelSmartDeviceAsyn = function(deviceid, iqid, sf, ff) {
	//	return pg.asyncExec(N, 'DelSmartDeviceAsyn', [deviceid, iqid], sf, ff);
	//};

	/**
	 * 修改配件的信息
	 * @param {Number} deviceid 设备ID
	 * @param {Number} iqid 智能配件ID
	 * @param {String} name 智能配件名称
	 * @param {Boolean} _switch 关闭或者开启配件功能
	 * @param {Number} step 延时 单位秒
	 * @param {Function} sf 正确回调函数
	 * @param {Function} ff 失败回调函数
	 */
	//pgn.UpdateSmartDeviceAsyn = function(deviceid, iqid, name, _switch, step, ptzSet, bindV, sf, ff) {
	//	return pg.asyncExec(N, 'UpdateSmartDeviceAsyn', [deviceid, iqid, name, _switch, step, ptzSet, bindV], sf, ff);
	//};

	/**
	 * 获取本地录像&拍照的记录
	 */
	pgn.GetLocalRecordInfoSync = function() {
		return pg.syncExec(N, 'GetLocalRecordInfoSync', []);
	};

	/**
	 * 获取已经下载的告警图片和告警录像
	 */
	// TODO

	// 动作
	pgn.ACTION = {
		KEY_OPEN: 'KEY_OPEN',
		KG_OPT: ' KG_OPT',
		SOS: 1,
		JY: 2,
		CF: 4,
		SF: 8,
	};
	// 指令
	pgn.COMD = {
		QUERY: '<OPT VAL="QUERY"></OPT>',
		OPEN: '<OPT VAL="OPEN" ></OPT>',
	};

	/**
	 * 智能配件查询通道
	 * @param {Number} deviceid 设备ID
	 * @param {Number} iqid 配件ID
	 * @param {ACTION} action 动作 示例： KEY_OPEN
	 * @param {COMD} comd 指令 示例：<OPT VAL="QUERY">
	 * @param {Function} sf
	 * @param {Function} ff
	 */
	//pgn.SmartDeviceQueryChannelAsyn = function(deviceid, iqid, action, comd, sf, ff) {
	//	return pg.asyncExec(N, 'SmartDeviceQueryChannelAsyn', [deviceid, iqid, action, comd], sf, ff);
	//};

	/**
	 * 智能配件控制通道
	 * @param {Number} deviceid 设备ID
	 * @param {Number} iqid 配件ID
	 * @param {ACTION} action 动作 示例： KEY_OPEN
	 * @param {COMD} comd 指令 示例：<OPT VAL="QUERY">
	 * @param {Function} sf
	 * @param {Function} ff
	 */
	//pgn.SmartDeviceControlChannelAsyn = function(deviceid, iqid, action, comd, sf, ff) {
	//	return pg.asyncExec(N, 'SmartDeviceControlChannelAsyn', [deviceid, iqid, action, comd], sf, ff);
	//};

	/**
	 * 查询通道返回数据
	 */
	// TODO

	//===================================设备操作=====================================

	/**
	 * 设置设备参数通道
	 * @param {Number} deviceid 设备id
	 * @param {Object} xmljson 特殊格式JOSO参数  
	 * @param {Function} sf
	 * @param {Function} ff
	 */
	//pgn.SetDeviceParamAsyn = function(deviceid, xmljson, sf, ff) {
		//xmljson = pg.json2xml(xmljson);
		//console.log(xmljson);
	//	return pg.asyncExec(N, 'SetDeviceParamAsyn', [deviceid, xmljson], sf, ff);
	//};

	/**
	 * 手机遥控器SOS/布撤防/静音
	 * @param {Number} deviceid 设备id
	 * @param {ACTION} action 动作类型
	 * @param {Function} sf
	 * @param {Function} ff
	 */
	//pgn.VirtualityRemoteControlAsyn = function(deviceid, action, sf, ff) {
	//	return pg.asyncExec(N, 'VirtualityRemoteControlAsyn', [deviceid, action], sf, ff);
	//};

	/**
	 * 重启主机
	 * @param {Number} deviceid 设备id
	 * @param {Function} sf
	 * @param {Function} ff
	 */
	//pgn.RebootDeviceAsyn = function(deviceid, sf, ff) {
	//	return pg.asyncExec(N, 'RebootDeviceAsyn', [deviceid], sf, ff);
	//};

	/**
	 * 内网主机列表
	 */
	//pgn.GetLanDevHostList = function() {
	//	return pg.syncExec(N, 'GetLanDevHostList', []);
	//}
	/**
	 * 获取原生推送id
	 */
	pgn.GetPushInfoSyn = function() {
		return pg.syncExec(N, 'GetPushInfoSyn', []);
	}

	pgn.StartVoiceSetWifi = function(ssid, pwd, random) {
		return pg.syncExec(N, 'StartVoiceSetWifi', [ssid, pwd, random]);
	}

	pgn.StopVoiceSetWifi = function() {
		return pg.syncExec(N, 'StopVoiceSetWifi', []);
	}

	pgn.CheckDevWifiConnect = function(random) {
		return pg.syncExec(N, 'CheckDevWifiConnect', [random]);
	}

	
	pgn.GetAllSmartDeviceState = function(sf, ff) {
		return pg.asyncExec(N, 'GetAllSmartDeviceState', [], sf, ff);
	};
	
	
	//连接 WG100  
	pgn.ConnectWG100 = function(devid, sf, ff){
		return pg.asyncExec(N, 'ConnectWG100', [devid], sf, ff);
	};
	//静音
	pgn.WG100Mute = function(){
		return pg.syncExec(N, 'WG100Mute', []);
	};
	//按住喊话
	pgn.WG100Call = function(){
		return pg.syncExec(N, 'WG100Call', []);
	};
	//松手监听  
	pgn.WG100Listen = function(){
		return pg.syncExec(N, 'WG100Listen', []);
	};
	// 断开连接
	pgn.DisconnectWG100 = function(){
		return pg.syncExec(N, 'DisconnectWG100', []);
	}
	
	
	/**
	 * 获取指定摄像机在指定时间内的本地录像和截图记录
	 * @param {String} deviceID 设备id 为空时表示所有摄像机
	 * @param {Strintg} createTime 要求格式：“yyyy-MM-dd”,为空时表示搜索结果不限制时间区间
	 */
	pgn.GetLocalRecordInfoSync = function(deviceID, createTime){
		return pg.syncExec(N, 'GetLocalRecordInfoSync', [deviceID, createTime]);
	};
	
	/**
	 * 获取手机附近的wifi列表
	 */
	pgn.GetPhoneWifiListAsyn  = function(sf, ff){
		return pg.asyncExec(N, 'GetPhoneWifiListAsyn', [], sf, ff);
	};
	
	
	// 通知原生账户信息变化
	pgn.NotifyAccountInfoChange = function(){
		return pg.syncExec(N, 'NotifyAccountInfoChange', []);
	}

}(window));