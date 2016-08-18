"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}!function(){function e(e){this.$dispatch("change-view",e)}var t=Vue.extend({template:"#entry",methods:{changeView:e}}),r=Vue.extend({template:"#signin",data:function(){return{error:"",rules:{username:{required:{rule:!0,message:"请输入用户名/手机号。"}},pw:{required:{rule:!0,message:"请输入密码。"}}}}},methods:{changeView:e,focusControl:function(){this.$el.getElementsByTagName("input")[0].focus()},getError:function(){var e=this.getFirstInvalidControl();return e?this.$validator[e.name].errors[0].message:""},handleSubmit:function(e){this.error=this.getError(),this.isValid()?e.target.submit():this.getFirstInvalidControl().focus()},getFirstInvalidControl:function(){return this.$el.getElementsByClassName("invalid")[0]},isValid:function(){return this.$validator.valid}}}),n=Vue.extend({template:"#signup",data:function(){return{stepIndex:0,error:"",rules:{tel:{required:{rule:!0,message:"请输入手机号。"}},inviteCode:{required:{rule:!0,message:"请输入邀请码。"}},authCode:{required:{rule:!0,message:"请输入验证码。"}},pw:{required:{rule:!0,message:"请输入密码。"}},name:{required:{rule:!0,message:"请输入姓名。"}}}}},computed:{steps:{get:function(){return this.$el.getElementsByClassName("j-sign-step")},cache:!1},step:function(){return this.steps[this.stepIndex]},groups:function(){return[].concat(_toConsumableArray(this.steps)).map(function(e,t){return"step-"+t})},group:function(){return this.$validator["step-"+this.stepIndex]}},methods:{changeView:e,focusControl:function(){this.step.getElementsByTagName("input")[0].focus()},handleSubmit:function(e){this.error=this.getError(),this.isValid()?this.stepIndex<this.steps.length-1?this.nextStep():e.target.submit():this.getFirstInvalidControl().focus()},nextStep:function(){this.stepIndex++,this.$nextTick(this.focusControl)},getError:function(){var e=this.getFirstInvalidControl();return e?this.$validator[e.name].errors[0].message:""},getFirstInvalidControl:function(){return this.step.getElementsByClassName("invalid")[0]},handleFieldValid:function(e){this.clearError()},isValid:function(){return this.group.valid},clearError:function(){this.error=""}}});new Vue({el:"#app",components:{entry:t,signin:r,signup:n},data:{view:"entry"},methods:{handleChangeView:function(e){var t=this;this.view=e,this.$nextTick(function(){t.$children[0].focusControl()})}}})}();