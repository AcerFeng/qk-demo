<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Vue.js Demo"/>
    <div>payload: {{ payload }}</div>
    <div>vue: {{ vuetest }}</div>
    <ElButton type="text" @click="test">test</ElButton>
    <ElButton type="text" @click="test2">test2</ElButton>
    <el-button @click="dialogVisible = true" type="text">Open Dialog</el-button>

    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="Dialog"
      width="30%">
      <span>dialog message</span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button @click="dialogVisible = false" type="primary">ok</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      test() {
        console.log(this.$store.state)
      },
      test2() {
        this.$store.dispatch('setGlobalUserName', 'from vue ' + Date.now())
      },
      handleClose(done) {
        this.$confirm('Sure to close？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
    computed: {
      payload() {
        return this.$store.state.payload
      },
      vuetest() {
        return this.$store.state.global
      }
    }
  };
</script>
