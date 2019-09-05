<template>
  <div id="app" class="container">
    <AppNav/>
    <AppContent/>
  </div>
</template>

<script>
  import AppNav from './components/AppNav.vue'
  import AppContent from './components/AppContent.vue'

  export default {
    name: 'app',
    components: {
      AppNav,
      AppContent
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
