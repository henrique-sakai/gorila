<template>
  <div class="container">

    <div class="form create-investment" style="margin-top:30px">
      <label for="create-investment"><h5>Adicionar novo investimento:</h5></label>
      
      <div class="form-group row">
        <label for="investment-type" class="col-xs-3 col-sm-3 col-md-3 col-lg-11 form-label">Tipo</label>
        <select id="investment-type" class="col-xs-9 col-sm-9 col-md-9 col-lg-11" v-model="new_investment.type">
          <option v-for="option in options" :value="option.value" :key="option.value">{{option.text}}</option>
        </select>
      </div>

      <div class="form-group row">
        <label for="investment-value" class="col-xs-3 col-sm-3 col-md-3 col-lg-11 form-label">Valor:</label>
        <input id="investment-value" class="col-xs-9 col-sm-9 col-md-9 col-lg-11" type="number" @change="format()" v-model="new_investment.value">
      </div>

      <div class="form-group row">
        <label for="investment-date" class="col-xs-3 col-sm-3 col-md-3 col-lg-11 form-label">Data:</label>
        <input id="investment-date" class="col-xs-9 col-sm-9 col-md-9 col-lg-11" type="date" v-model="new_investment.date">
      </div>

      <p v-if="incomplete_form">Erro: Verifique se todos os dados foram preenchidos corretamente.</p>

      <button class="btn btn-primary"
        @click="createInvestment">
          Create!
      </button>

      <hr class="col-md-12">
    </div>

    <div style="margin-bottom: 60px"></div>

  </div>
</template>

<script>

  import {serverBus} from '../main';
  import InvestmentService from '../InvestmentService';

  export default {
    name: 'newInvest',
    data() {
      return {
        options: [ //data to fill the 'select' element
          {value: -1, text: '---'},
          {value: 0, text: 'Renda Fixa'},
          {value: 1, text: 'Renda Variável'}
        ],
        new_investment: { //initial values of the fields
          _id: 0,
          type: -1,
          value: null,
          date: null
        },
        incomplete_form: false, //indicates if the warning message must be displayed
      }
    },
    methods: {
      async createInvestment() {

        //verifies input data
        if(this.new_investment.type == -1 || 
          this.new_investment.value == null ||
          this.new_investment.value <= 0 ||
          this.new_investment.date == null) {
            this.incomplete_form = true;
            return;
        }

        this.incomplete_form = false;

        //save data in the db
        let doc = await InvestmentService.insertInvestment(this.new_investment);

        this.new_investment._id = doc.data._id;

        //send an event with the data of the added investment to be displayed in the list
        serverBus.$emit('addedInvestment', this.new_investment);
      },
      format() {
        this.new_investment.value = parseFloat(this.new_investment.value).toFixed(2);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
create-investment{
  padding-left: 20px;
  padding-right: 20px;
}
input{
  position: relative;
  display: block;
  margin : 0 auto;
}
select{
  position: relative;
  display: block;
  margin : 0 auto;
}
</style>
