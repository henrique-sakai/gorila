<template>
  <div class="container">

    <h5 style="margin-top:30px">Visão Geral</h5>

    <br>

    <div>
      <p>Soma da Renda Fixa: {{fix_invest_sum}}</p>
      <p>Soma da Renda Variável: {{var_invest_sum}}</p>
      <p>Total investido: {{invest_sum}}</p>
    </div>

    <br>

    <div>
      <p>Renda Fixa: {{fix_percentage}}% do total</p>
      <p>Renda Variável: {{var_percentage}}% do total</p>
    </div>

  </div>
</template>

<script>

import {serverBus} from '../main';

export default {
  name: 'summaryInvest',
  data() {
    return {
      fix_invest_sum: 0,
      var_invest_sum: 0,
      error: ''
    }
  },
  computed: {
    invest_sum: function() {
      return (this.fix_invest_sum + this.var_invest_sum).toFixed(2);
    },
    fix_percentage: function() {
      return (100 * this.fix_invest_sum / this.invest_sum).toFixed(2);
    },
    var_percentage: function() {
      return (100 * this.var_invest_sum / this.invest_sum).toFixed(2);
    }
  },
  async created() {

    //listen to event that will send the sum of fixed income and the sum of variable income
    serverBus.$on('summaryCalculated', (fixed_sum, var_sum) => {
      this.fix_invest_sum = parseFloat(fixed_sum);
      this.var_invest_sum = parseFloat(var_sum);
    });

    //when the user adds a new investment
    //receive an event with the new investment's data and updates the summary info
    serverBus.$on('addedInvestment', (new_investment) => {

      if(new_investment.type == 0) {
        this.fix_invest_sum += parseFloat(new_investment.value);
      }
      else if(new_investment.type == 1) {
        this.var_invest_sum += parseFloat(new_investment.value);
      }

    });

    //when the user deletes an investment
    //receive an event with the investment's data and updates the summary info
    serverBus.$on('deletedElement', (del_investment) => {

      if(del_investment.type == 0) {
        this.fix_invest_sum -= del_investment.value;
      }
      else if(del_investment.type == 1) {
        this.var_invest_sum -= del_investment.value;
      }
    });

  }
};
</script>