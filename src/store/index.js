import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {}
  },
  mutations: {
    setState(state, data) {//设置
      for (let i = 0; i < data.length; i++) {
        state[data[i].name] = data[i].value;
      }
    },
    delState(state, nameArr) {//置空
      nameArr.forEach(item => {
        state[item] = null;
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
