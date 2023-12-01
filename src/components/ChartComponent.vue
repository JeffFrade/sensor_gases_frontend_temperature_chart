<template>
    <div class="main">
        <h1 class="text-center">Gráfico de Temperaturas</h1>
        <hr>
        <Bar id="temperature-chart" class="chart" :options="chartOptions" :data="chartData"/>
    </div>
</template>

<style scoped>
    .main {
        width: 100%;
        height: 100%;
    }

    .text-center {
        text-align: center;
    }

    .chart {
        height: 100%;
        width: 700px;
    }
</style>

<script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
    name: 'ChartComponent',
    components: { 
        Bar 
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
