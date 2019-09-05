<template>
  <div class="app-content container">
    <div class="row">
      <newInvest class="col-lg-2"/>
      <showInvest class="col-lg-8"/>
      <summaryInvest class="col-lg-2"/>
    </div>
  </div>
</template>

<script>
  import newInvest from './newInvest.vue';
  import showInvest from './showInvest.vue';
  import summaryInvest from './summaryInvest.vue';

  export default {
    name: 'AppContent',
    components:{
      newInvest,
      showInvest,
      summaryInvest
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.app-content{
    margin-top: 60px;
  }
</style>
