//template: '<footer class="app-font-size-28"><div class="app-color-main-dark" @tap="onDelTap()">删除设备</div><div @tap="onUnBindTap()">解绑主机</div></footer>',

Vue && Vue.component('dev-footer', {
	template: '<footer class="app-font-size-28"><div class="app-color-main-dark" @tap="onDelTap()">删除设备</div></footer>',
	props: ["deviceid", "comid"],
	methods: {
		onDelTap: function() {
			mui.confirm("删除后将无法关联主机，\n确定要删除吗？", "", ['残忍删除', '我再看看'], function(e) {
				!e.index && this._delDevice();
			}.bind(this));
		},
//		onUnBindTap: function() { 
//			mui.confirm("解除后将需要重新关联其它主机，\n确定要解绑吗？", "", ['解除', '取消'], function(e) {
//				!e.index && this.$emit('unbind');
//			}.bind(this));
//			
//		},
		
		_delDevice: function(){
			this.w = plus.nativeUI.showWaiting();
			
			plug.H5NativeBridge.DelSmartDeviceAsyn(1,1, function(rs){
				this.w.close();
				rs = JSON.parse(rs);
				if(!rs || rs.code !== 0){
					return plus.nativeUI.toast('删除配件失败');
				}
				plus.nativeUI.toast('删除成功');
				this.$emit('del', {});
			}.bind(this));
			
		}
	},
	

});