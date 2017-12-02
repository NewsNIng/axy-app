// 遮罩组件
Vue.component('dev-mask', {
	template: '<div class="com-dev-mask" v-show="show" @tap.self="up()"><slot></slot></div>',
	data: function() {
		return {

		}
	},
	mounted: function() {

	},
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
	template: '<div class="com-dev-btns"><div><slot></slot></div><button @tap.stop="save()">保存</button><button @tap="cancel()">取消</button></div>',

	methods: {
		save: function() {
			this.$emit('action', true);
		},
		cancel: function() {
			this.$emit('action', false);
		}
	}
});

// 摄像头设置组件
Vue.component('dev-360', {
	template: '<div class="com-dev" v-if="show">我是360摄像机<dev-btns @action="onAction"></dev-btns></div>',
	data: function() {
		return {

		}
	},
	mounted: function() {

	},
	props: {
		show: {
			default: false
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
	mounted: function() {

	},
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