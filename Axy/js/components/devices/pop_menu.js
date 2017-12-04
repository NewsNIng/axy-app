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
		up: function() {
			this.$emit('hide');
		}
	}
});

// 操作菜单容器组件
Vue.component('dev-btns', {
	//template: '<div class="com-dev-btns"><div></div><button @tap.stop="save()">保存</button><button @tap="cancel()">取消</button></div>',
	template: '<ul class="mui-table-view ul_bottom app-font-size-28"><li class="mui-table-view-cell" @tap.stop="save()">保存</li><li class="mui-table-view-cell" @tap="cancel()">取消</li></ul>',
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
	template: '<div v-show="show"  class="com-dev com-dev-360 app-font-size-30"><ul class="mui-table-view app-font-size-28"><li class="mui-table-view-cell pop_title">请选择摄像机状态</li><li class="mui-table-view-cell">布防</li><li class="mui-table-view-cell">撤防</li></ul><dev-btns @action="onAction"></dev-btns></div>',
	data: function() {
		return {
			arr: [{
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
		all: function() {
			for(var i in arr) {
				if(arr[i].state === false) {
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
			this.$emit(save ? 'save' : 'cancel');
		}
	}
});
Vue.component('dev-men', {
	template: '<div v-show="show"  class="com-dev"><input v-model="content" /><dev-btns @action="onAction"></dev-btns></div>',
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
			this.$emit(save ? 'save' : 'cancel', {
				content: this.content
			});

		}
	}
});
//智能灯控
Vue.component('dev-light', {
	template:'<div v-show="show" class="com-dev com-dev-light app-font-size-28"><div class="pop_title">请选择智能灯控状态</div><div class="light_list"><template v-for="o,i in lightList"><div :data-text="o.name" :class="{active: o.state}" @tap="onLightTap(o)"></div></template></div><div class="allNo"><ul class="mui-table-view ul_bottom"><li class="mui-table-view-cell"><a class=""><span class="all_text">设备全开</span><span class="mui-badge"><div ref="dev_light_switch" class="mui-switch mui-switch-mini app-switch-main" :class="{\'mui-active\': allNo}"><div class="mui-switch-handle"></div></div></span></a></li></ul></div><dev-btns @action="onAction"></dev-btns></div>',
	data: function() {
		return {
			//智能灯控
			//allNo: false,
			lightList: [{
				name: "K1",
				state: false,
			}, {
				name: "K2",
				state: false,
			}, {
				name: "K3",
				state: false,
			}, {
				name: "K4",
				state: false,
			}, {
				name: "K5",
				state: false,
			}],
		}
	},
	computed: {
		allNo: function(){
			return this.lightList.every(function(item){
				return item.state;
			});
		}
	},
	props: {
		show: {
			default: false
		}
	},
	
	mounted: function(){
		this.$refs.dev_light_switch.addEventListener("toggle",function(event){
			this.switchAll(event.detail.isActive);
		}.bind(this));
	},
	
	methods: {
		onAction: function(save) {
			this.$emit(save ? 'save' : 'cancel', {
				lightList: this.lightList,
				all: this.allNo,
			});

		},
		//智能灯控
		onLightTap: function(o) {
			o.state = !o.state;
		},
		
		switchAll: function(state){
			this.lightList = this.lightList.map(function(item){
				item.state = state;
				return item;
			});
		}
	}
});