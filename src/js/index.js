(() => {
	let views = {
		ENTRY: 'entry',
		SIGNIN: 'signin',
		SIGNUP: 'signup',
	};

	new Vue({
		el: '#app',

		data: {
			views,
			view: views.ENTRY,
			step: 0
		},

		computed: {
			canNext() {
				// TODO
			}
		},

		methods: {
			changeView(viewType) {
				this.view = viewType;
				Vue.nextTick(this.focusControl);
			},

			nextStep() {
				this.step++;
				Vue.nextTick(this.focusControl);
			},

			focusControl() {
				this.$el.getElementsByTagName('input')[0].focus();
			}
		}
	});
})();