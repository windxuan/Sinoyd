import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义容器

let store = new Vuex.Store({
	state: {
		count: 100
	},
	mutations: {
		addIncrement(state,payload){
			  state.count += payload.n;
		},
		deIncrement(state,payload){
			state.count -= payload.de;
		}
	},
	actions: {
		addAction({commit,dispatch}){
			setTimeout(()=>{
			  //改变状态,提交mutation addIncrement
			  commit("addIncrement",{n:5})
			},1000)
			  dispatch("textAction",{text:"测试"})
		},
		deAction(context){
			setTimeout(()=>{
			  context.commit("deIncrement",{de:3})
			},1000)
		},
		textAction(context,obj){
			console.log(obj);
		}
	}
})

export default store
