<template>
  <div id="app"></div>
  <router-view />
</template>

<script setup>

</script>


<style lang="less" scoped>
@import './common/style/mixin';

html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
