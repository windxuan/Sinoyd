import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// 定义一个容器
let store = new Vuex.Store({
  state: {
  	isEdit: false,           //编辑弹框 true or false
  	addDate: {},
    editDate: {},
    dialogVisible: false,//是否显示dialog弹框表单
    searchList: [],  //存放满足查询条件的数据
    temporaryList: [], // 临时用来储存templateList里面的数据
    templateList: [	 //原始数据
      {
        id: 1,
        name: 'test',
        username: '始祖鸟',
        post: '啊啊啊'
      },
      {
        id: 2,
        name: 'test1',
        username: '测试一号2',
        post: '123'
      },
      {
        id: 3,
        name: 'test2',
        username: '大师级用户',
        post: 'QAQ'
      },
      {
        id: 4,
        name: 'test3',
        username: '测试4',
        post: '滴滴滴'
      }
    ],
    userInfo: { //新增列表数据
          name: '',//名字
          username: '',//用户名
          password: '',//密码
          tell: '',//电话
          post: '',//职位
          delivery: false,
          type: []
        },
    title: '',//标头：新增 or 编辑
    id: '',
    changeFrom: '',//显示的dialog
    queryForm: '' //查询字段
  },
  getters: {

  },
  mutations: {
    setIsEdit(state, val) {
      state.isEdit = val;
    },
    onState (state, payload) {
      const data = JSON.parse(payload)
      state.id = data.id
      state.title = data.title
      state.changeFrom = data.changeFrom
      state.dialogVisible = data.dialogVisible
    },
  	// 新增
  	onCreateItem(state, val) {
      state.templateList.push(val)
	},
  	// 删除
  	onDeleteItem(state, index) {
      state.templateList.splice(index,1)
	},
  	// 编辑
  	onUpdateTemplate(state, val){
        const update = JSON.stringify(state.templateList.find((update) => {
          return update.id === state.id
        }))
        if (update) {
          state.userInfo = JSON.parse(update)
        } else {
          state.userInfo = {
            name: '',
            username: '',
            password: '',
            tell: '',
            post: '',
            delivery: false,
            type: []
          }
        }
      },
      // 提交
      commitFrom (state, payload) {
        let data = state.userInfo.find((ele) => {
          return ele.id === state.id
        })
        for (var index in data) {
          data[index] = JSON.parse(payload)[index]
        }
      },
      resetPassword(state) {
        state.userInfo.name = '';
        state.userInfo.username = '';
        state.userInfo.password = '';
        state.userInfo.tell = '';
        state.userInfo.post = '';
        state.userInfo.type = [];
      },
      // 搜索
      findData (state, payload) {
        state.queryForm = payload
      }
  	},
  actions: {
  	addAction(context){
  	  // 改变状态，必须提交一个mutation

  	},
  },
  modules: {
  	// 子模块
  }
})

export default store
