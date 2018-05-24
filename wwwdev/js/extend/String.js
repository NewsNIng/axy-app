var sp = String.prototype;

/**
 * 版本转换数值
 * 例： 1.0.2 => 102    3.4.0 => 340
 */
sp.version2number = function(){
	return +(this.replace(/\./g, ''));
}

/*
 * 检测手机号
 */
sp.checkTel = function(){
	var rex = /^1\d{10}$/g;
	return rex.test(this);
}

/*
 * 检测密码
 */
sp.checkPwd = function(){
	var rex = /^[a-zA-Z]\w{5,17}$/g;
	return rex.test(this);
}
