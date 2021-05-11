import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: '',
    globalState: {}
  },
  mutations: {
    SET_TEST(state, test) {
      state.test = test
    },
    SET_MAIN_GLOBAL_STATE(state, globalState) {
      state.globalState = globalState
    },
    SET_MESSAGE(state, msg) {
      console.log(state.globalState)
      state.globalState.setGlobalState({
        ignore: 'master',
        user: {
          name: `${msg}:` + Date.now(),
        },
      });
    }
  },
  actions: {
    setTest({ commit }, test) {
      commit('SET_TEST', test)
    },
    setMainGlobal({ commit }, globalState) {
      commit('SET_MAIN_GLOBAL_STATE', globalState)
    },
    sendMessage({ commit }, msg) {
      commit('SET_MESSAGE', msg)
    }
  },
  modules: {},
});
