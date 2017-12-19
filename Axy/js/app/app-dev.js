(function(app) {
	var dev = {};

	var absTypeidDir = {
		"WG-100": 0x80
	};

	var _isEqual = function(name, type) {
		return type & (~(0x01 << 31)) === absTypeidDir[name];
	};
	
	dev.get0xType = function(name) {
		return absTypeidDir[name];
	};
	
	dev.findName = function(type){
		type = type & (~(0x01 << 31));
		for(var i in absTypeidDir){
			if(absTypeidDir[i] === type){
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

	app.dev = dev;
}(window.app || (window.app = {})));