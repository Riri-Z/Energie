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
mixEnergieStore.getMixEnergyData;

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
    <ChartComponent :chartOptions="chartOptions" />
    <ChartComponent :chartOptions="chartOptions" />
    <ChartComponent :chartOptions="chartOptions" />
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
