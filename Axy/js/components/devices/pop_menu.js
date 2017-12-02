// 遮罩组件
Vue.component('dev-mask', {
	template: '<div class="com-dev-mask" v-show="show" @tap.self="up()"><slot></slot></div>',
	data: function() {
		return {

		}
	},
//	mounted: function() {
//
//	},
	props: {
		show: {
			default: false
		}
	},
	methods: {
		up: function(){
			this.$emit('hide');
		}
	}
});

// 操作菜单容器组件
Vue.component('dev-btns', {
	template: '<div class="com-dev-btns"><div></div><button @tap.stop="save()">保存</button><button @tap="cancel()">取消</button></div>',

	methods: {
		save: function() {
			this.$emit('action', true);
		},
		cancel: function() {
			this.$emit('action', false);
		}
	}
});

// AX-360摄像机弹框设置
Vue.component('dev-360', {
	template: '<div class="com-dev com-dev-360 app-font-size-30"><ul class="mui-table-view app-font-size-28"><li class="mui-table-view-cell pop_title">请选择摄像机状态</li><li class="mui-table-view-cell">布防</li><li class="mui-table-view-cell">撤防</li></ul><ul class="mui-table-view ul_bottom app-font-size-28"><li class="mui-table-view-cell">取消</li></ul></div>',
	data: function() {
		return {
			arr: [
				{
				 	name: 'x1',
					state: false
				},
				{
					name: 'x2',
					state: false
				}
			]
		}
	},
	
	computed: {
		all: function(){
			for(var i in arr){
				if(arr[i].state === false){
					return false;
				}
			}
			return true;
		}
	},
	props: {
		show: {
			default: false,
		}
	},
	methods: {
		onAction: function(save) {
			this.$emit(save ? 'save': 'cancel');	
		}
	}
});
Vue.component('dev-men', {
	template: '<div class="com-dev" v-if="show"><input v-model="content" /><dev-btns @action="onAction"></dev-btns></div>',
	data: function() {
		return {
			content: "默认值"
		}
	},
//	mounted: function() {
//
//	},
	props: {
		show: {
			default: false
		}
	},
	methods: {
		onAction: function(save) {
			this.$emit(save ? 'save': 'cancel', {
				content: this.content
			});
			
		}
	}
});