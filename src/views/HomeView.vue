<!-- Page that allow to views multiple charts related to  mix energie -->
<!--
TODO :


  - Maybe add select / calendar to filter data && charts
  - Finish /frenchMap
  - Add style
-->
<script setup>
import ChartComponent from '../components/ChartComponent.vue';
import { useMixEnergieStore } from '@/stores/mixEnergieStore';

const mixEnergieStore = useMixEnergieStore();
mixEnergieStore.getConsoElecGaz();
let chartOptionsConsoElecGaz = mixEnergieStore.getConsoElecGaz().optionsChartConsoElecGaz;
</script>

<template>
  <div class="chart-container">
    <ChartComponent :chartOptions="chartOptionsConsoElecGaz" />
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
