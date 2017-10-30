var sp = String.prototype;

/**
 * 版本转换数值
 * 例： 1.0.2 => 102    3.4.0 => 340
 */
sp.version2number = function(){
	return +(this.replace(/\./g, ''));
}
