import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    global: {},
    payload: {}
  },
  mutations: {
    SET_GLOBAL(state, props) {
      state.global = props
    },
    SET_GLOBAL_USER_NAME(state, name) {
      // state.global.user.name = name
      state.global.setGlobalState && state.global.setGlobalState({
        user: name
      })
    },
    STATE_CHANGE(state, payload) {
      state.payload = payload
    }
  },
  actions: {
    setGlobal({commit}, props) {
      commit('SET_GLOBAL', props)
    },
    setGlobalUserName({commit}, name) {
      commit('SET_GLOBAL_USER_NAME', name)
    },
    stateChange({commit}, payload) {
      commit('STATE_CHANGE', payload)
    }
  },
  modules: {},
});
