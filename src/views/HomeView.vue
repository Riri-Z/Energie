<!-- Page that allow to views multiple charts related to  mix energie -->
<!--
TODO :
  - fetch  data in pinia (mix energie en france)
  - retreive data  in components
  - display chart along right data
  - add description to chart
  - refactor chart component
  - Add style
-->
<script setup>
import ChartComponent from '../components/ChartComponent.vue';

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
