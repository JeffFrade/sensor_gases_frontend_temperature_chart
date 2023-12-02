<template>
    <div class="row">
      <h1 class="text-center">Gráfico de Temperaturas</h1>
      <hr/>

      <div class="col-md-8">
        <Bar id="temperature-chart" class="chart" :options="chartOptions" :data="chartData"/>
      </div>

      <div class="col-md-4">
        <BoxComponent v-if="this.$store.getters.getTemperatureMax" :total="this.$store.getters.getTemperatureMax" color="danger" name="Temperatura Máxima" icon="temperature-high"/>
        <BoxComponent v-if="this.$store.getters.getTemperatureMin" :total="this.$store.getters.getTemperatureMin" color="primary" name="Temperatura Mínima" icon="temperature-low"/>
      </div>
    </div>
</template>

<style scoped>
    .chart {
        height: 100%;
        width: 700px;
    }
</style>

<script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import BoxComponent from './BoxComponent.vue'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
    name: 'ChartComponent',
    components: { 
      Bar,
      BoxComponent
    },

    computed: {
      chartData() {

        return {
          labels: Object.values(this.$store.getters.getDateTemperatures),
          datasets: [ 
            { 
              label: 'Temperatura Máxima (ºC)',
              data: Object.values(this.$store.getters.getMaxTemperatures),
              backgroundColor: '#dc3545',
            },

            { 
              label: 'Temperatura Mínima (ºC)',
              data: Object.values(this.$store.getters.getMinTemperatures),
              backgroundColor: '#007bff',
            } 
          ]
        }
      },

      chartOptions() {
        return {
          responsive: true
        }
      }
    },

    beforeCreate() {
      this.$store.dispatch('login')
      this.$store.dispatch('getTemperature')
    }
  }
</script>
