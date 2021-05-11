import Vue from 'vue/dist/vue.esm';
import store from "../store";

function vueRender({ loading }) {
  return new Vue({
    template: `
      <div id="subapp-container">
        <h4 v-if="loading" class="subapp-loading">Loading...</h4>
        <h3>main:{{test}}</h3>
        <input v-model="msg" type="text" />
        <button @click="sendMessage">send</button>
        <div id="subapp-viewport"></div>
      </div>
    `,
    el: '#subapp-container',
    data() {
      return {
        loading,
        msg: ''
      };
    },
    computed: {
      test() {
        return store.state.test
      }
    },
    methods: {
      sendMessage() {
        store.dispatch('sendMessage', this.msg)
      }
    }
  });
}

let app = null;

export default function render({ loading }) {
  if (!app) {
    app = vueRender({ loading });
  } else {
    app.loading = loading;
  }
}
