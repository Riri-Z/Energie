<!-- Page that allow to views multiple charts related to  mix energie -->
<!--
TODO :
  - Compute data to be exploitable for charts
  - display chart along right data
  - add description to chart
  - Maybe add select / calendar to filter data && charts
  - Make chart component works with real data
  - Finish /frenchMap
  - Add style
  - Move fetch API and compute data to an SERVER
-->
<script setup>
import ChartComponent from '../components/ChartComponent.vue';
import { useMixEnergieStore } from '@/stores/mixEnergieStore';

const mixEnergieStore = useMixEnergieStore();
mixEnergieStore.getAllAvailableMixEnergyData();
mixEnergieStore.getConsoElecGaz();
let chartOptionsConsoElecGaz = mixEnergieStore.getConsoElecGaz().optionsChartConsoElecGaz;
console.log('chartOptionsConsoElecGaz', chartOptionsConsoElecGaz);

const testChartOptions = {
  chart: {
    type: 'column'
  },
  title: {
        text: 'Data input as column arrays'
      },
  series: [

  {
      name: 'Corn',
      data: [406292, 260000, 107000, 68300, 27500, 14500]
    },
    {
      name: 'Wheat',
      data: [51086, 136000, 5500, 141000, 107180, 77000]
    }]

};

const chartOptions = {
  series: [
    {
      data: [1, 2, 3]
    }
  ]
};
</script>

<template>
  <div class="chart-container">
    <ChartComponent :chartOptions="chartOptionsConsoElecGaz" />
    <ChartComponent :chartOptions="testChartOptions" />
    <ChartComponent :chartOptions="chartOptions" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  &-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
