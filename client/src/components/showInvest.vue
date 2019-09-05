<template>
  <div class="container">
  
    <!-- generate one div for fixed income and another for variable income -->
    <div style="float:left; margin-top:30px" class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
      v-for="(investment_type, index) in all_investments"
      v-bind:item="investment_type"
      v-bind:index="index"
      v-bind:key="index">

      <p class='error' v-if="error">{{ error }}</p>

      <h4>{{investment_type.title}}</h4>

      <!-- generate the incomes table -->
      <table class="table table-striped" style="width: 95%">

        <thead>
          <tr>
            <th>Data</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>

        <tbody
          v-for="(investment, i) in investment_type.investments"
          v-bind:item="investment"
          v-bind:index="i"
          v-bind:key="investment._id">
          <tr>
            <td>{{ investment.date}}</td>
            <td>{{ investment.value}}</td>
            <td><button class="btn btn-light"
              @click="deleteInvestment(investment, index, i)">x</button></td>
          </tr>
        </tbody>

      </table>

    </div>
  </div>
  
</template>

<script>

import {serverBus} from '../main';

import InvestmentService from '../InvestmentService';

export default {
  name: 'showInvest',
  data() {
    return {
      all_investments: [
        {title: "Renda Fixa", investments: []},
        {title: "Renda Variável", investments: []}
      ],
      error: ''
    }
  },
  async created() {

    //when the user adds a new investment
    //receive an event with the new investment's data and add it to the array
    serverBus.$on('addedInvestment', (new_investment) => {
      let data = {
        _id: new_investment._id,
        type: new_investment.type,
        value: parseFloat(new_investment.value),
        date: new_investment.date
      };
     
      if(new_investment.type == 0) {
        this.all_investments[0].investments.unshift(data);
      }
      else if(new_investment.type == 1) {
        this.all_investments[1].investments.unshift(data);
      }
    });

    //get all investments and separate by type
    try {
      let db_invests = await InvestmentService.getInvestments();

      for(let i = 0; i < db_invests.length; i++) {
        if(db_invests[i].type == 0) {
          this.all_investments[0].investments.push(db_invests[i]);
        }
        else if(db_invests[i].type == 1) {
          this.all_investments[1].investments.push(db_invests[i]);
        }
      }

      //get the sum of fized income and variable income
      let fixed_arr = this.all_investments[0].investments;
      let var_arr = this.all_investments[1].investments;
      let fixed_sum = 0;
      let var_sum = 0;

      for(let i = 0; i < fixed_arr.length; i++) {
        fixed_sum += parseFloat(fixed_arr[i].value);
      }
      for(let i = 0; i < var_arr.length; i++) {
        var_sum += parseFloat(var_arr[i].value);
      }

      //send an event with the sum of fixed income and the sum of var income
      serverBus.$emit('summaryCalculated', fixed_sum, var_sum);
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async deleteInvestment(investment, index, i) {
      
      this.all_investments[index].investments.splice(i, 1);

      //send an event so other components can update their data
      serverBus.$emit('deletedElement', investment);

      //delete from database
      await InvestmentService.delInvestment(investment._id);
      
    }
  }
}

</script>
