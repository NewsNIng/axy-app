(function(app){
	var aiBox = {};
	aiBox.getGradeByNumber = function(pmNumber){
		var gradeArr = [50,100,150,200,300];
		var gradeArrStr = ['优','良','轻度污染','中度污染','重度污染','严重污染'];
		for(var i = 0, len = gradeArr.length; i < len ; i++){
			if(pmNumber <= gradeArr[i]){
				break;
			}
		}
		return gradeArrStr[i]
	}
	app.aiBox = aiBox;
})(window.app = window.app || {})
