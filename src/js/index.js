(() => {
	function changeView(viewType) {
		this.$dispatch('change-view', viewType);
	}

	function handleFieldValid(e) {
		this.clearError();
	}

	function clearError() {
		this.error = '';
	}

	function getError() {
		let firstInvalidControl = this.getFirstInvalidControl();

		return firstInvalidControl ? this.$validator[firstInvalidControl.name].errors[0].message : '';
	}

	let entry = Vue.extend({
		template: '#entry',

		methods: {
			changeView
		}
	});

	let signin = Vue.extend({
		template: '#signin',

		data() {
			return {
				error: '',

				rules: {
					username: {
						required: {
							rule: true,
							message: '请输入用户名/手机号。'
						}
					},

					pw: {
						required: {
							rule: true,
							message: '请输入密码。'
						}
					}
				}
			};
		},

		methods: {
			changeView,
			handleFieldValid,
			clearError,
			getError,

			focusControl() {
				this.$el.getElementsByTagName('input')[0].focus();
			},

			handleSubmit(e) {
				this.error = this.getError();

				if (this.isValid()) {
					e.target.submit();
				} else {
					this.getFirstInvalidControl().focus();
				}
			},

			getFirstInvalidControl() {
				return this.$el.getElementsByClassName('invalid')[0];
			},

			isValid() {
				return this.$validator.valid;
			},
		}
	});

	let signup = Vue.extend({
		template: '#signup',

		data() {
			return {
				stepIndex: 0,
				error: '',

				rules: {
					tel: {
						required: {
							rule: true,
							message: '请输入手机号。'
						}
					},

					inviteCode: {
						required: {
							rule: true,
							message: '请输入邀请码。'
						}
					},

					authCode: {
						required: {
							rule: true,
							message: '请输入验证码。'
						}
					},

					pw: {
						required: {
							rule: true,
							message: '请输入密码。'
						}
					},

					name: {
						required: {
							rule: true,
							message: '请输入姓名。'
						}
					}
				}
			};
		},

		computed: {
			steps: {
				get() {
					return this.$el.getElementsByClassName('j-sign-step');
				},

				cache: false
			},

			step() {
				return this.steps[this.stepIndex];
			},

			groups() {
				return [...this.steps].map((step, index) => 'step-' + index);
			},

			group() {
				return this.$validator[`step-${this.stepIndex}`];
			}
		},

		methods: {
			changeView,
			handleFieldValid,
			clearError,
			getError,

			focusControl() {
				this.step.getElementsByTagName('input')[0].focus();
			},

			handleSubmit(e) {
				this.error = this.getError();

				if (this.isValid()) {
					if (this.stepIndex < this.steps.length - 1) {
						this.nextStep();
					} else {
						e.target.submit();
					}
				} else {
					this.getFirstInvalidControl().focus();
				}
			},

			nextStep() {
				this.stepIndex++;
				this.$nextTick(this.focusControl);
			},

			getFirstInvalidControl() {
				return this.step.getElementsByClassName('invalid')[0];
			},

			isValid() {
				return this.group.valid;
			}
		}
	});

	new Vue({
		el: '#app',

		components: {
			entry,
			signin,
			signup
		},

		data: {
			view: 'entry'
		},

		methods: {
			handleChangeView(viewType) {
				this.view = viewType;
				this.$nextTick(() => {
					this.$children[0].focusControl();
				});
			}
		}
	});
})();