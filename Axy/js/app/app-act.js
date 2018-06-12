! function(app) {
	var act = {};
	var sencesType = {
		1: "回家模式",
		2: "离家模式",
		3: "回店模式",
		4: "离店模式",
		5: "自定义模式",
		6: "设备互联"
	}
	var actions = [{
		img: "../../../image/smart/scenes/execute.png",
		name: "布防",
		actionId: 0x100,
		tip: '请选择设备',
		alarmOn: 1,
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "撤防",
		actionId: 0x100,
		tip: '请选择设备',
		alarmOn: 0,
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "声光铃响",
		actionId: 0x200,
		tip: '请选择声光',
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "触发指定场景",
		actionId: 0x300,
		tip: '请选择场景',
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "开灯",
		actionId: 0x400,
		tip: '请选择灯控',
		parseFunc: 'lightPos'
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "关灯",
		actionId: 0x401,
		tip: '请选择灯控',
		parseFunc: 'lightPos'
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "开窗帘",
		actionId: 0x500,
		tip: '请选择窗帘',
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "关窗帘",
		actionId: 0x501,
		tip: '请选择窗帘',
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "开插座",
		actionId: 0x600,
		tip: '请选择插座',
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "关插座",
		actionId: 0x601,
		tip: '请选择插座',
	}, {
		img: "../../../image/smart/scenes/execute.png",
		name: "打开门锁",
		actionId: 0x700,
		tip: '请选择门锁',
	}];
	var conditions = [{
		img: "../../../image/smart/scenes/condition.png",
		name: "定时启动",
		conditiontype: 0x100
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "红外感应",
		conditiontype: 0x200
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "门磁打开",
		conditiontype: 0x300
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "门磁闭合",
		conditiontype: 0x301
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "温度超出指定值",
		conditiontype: 0x400
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "温度低于指定值",
		conditiontype: 0x401
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "湿度超出指定值",
		conditiontype: 0x500
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "湿度低于指定值",
		conditiontype: 0x501
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "PM2.5超出指定值",
		conditiontype: 0x600
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "PM2.5低于指定值",
		conditiontype: 0x601
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "甲醛浓度超出指定值",
		conditiontype: 0x700
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "甲醛浓度低于指定值",
		conditiontype: 0x701
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "一氧化碳浓度超出指定值",
		conditiontype: 0x800
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "一氧化碳浓度低于指定值",
		conditiontype: 0x801
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "燃气浓度超出指定值",
		conditiontype: 0x900
	}, {
		img: "../../../image/smart/scenes/condition.png",
		name: "燃气浓度低于指定值",
		conditiontype: 0x901
	}];
	
	act['getActions'] = function() {
		return JSON.parse(JSON.stringify(actions))
	}
	
	act['getConditions'] = function() {
		return JSON.parse(JSON.stringify(conditions))
	}
	
	act['getIconByActionId'] = function(actionid) {
		try {
			return actions.filter(function(item) {
				return item.actionId == actionid
			})[0].img
		} catch(e) {
			return ''
		}
	}
	act['getIconByConditionId'] = function(conditionId) {
		try {
			return conditions.filter(function(item) {
				return item.conditiontype == conditionId
			})[0].img
		} catch(e) {
			return ''
		}
	}
	act['getConditionNameById'] = function(conditionId){
		try {
			return conditions.filter(function(item) {
				return item.conditiontype == conditionId
			})[0].name
		} catch(e) {
			return ''
		}
	}
	
	act['lightPos'] = function(arg) {
		if(arg && arg.length > 0) {
			return arg.map(function(item,i) {
				return {
					text: (i + 1) + '灯控通道',
					value: item,
					type: 'lightPos'
				}
			})
		}
	}
	act['parseObjToString'] = function(data) {
		var str = '';
		if(data.type == 'lightPos') {
			str = data.value + '灯控通道'
			return str
		}
		return '';
	}
	act['parseType'] = function(type) {
		return sencesType[type]
	}
	act['getSenceTypePicker'] = function() {
		return [{
				value: 1,
				text: '回家模式'
			},
			{
				value: 2,
				text: '离家模式'
			},
			{
				value: 3,
				text: '回店模式'
			},
			{
				value: 4,
				text: '离店模式'
			},
			{
				value: 5,
				text: '自定义模式'
			}
		]
	}
	app.act = act;
}(window.app = window.app || {})