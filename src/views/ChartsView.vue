<!-- Page that allow to views multiple charts related to  mix energie -->
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
    <ChartComponent :chartOptions="chartOptions" msg="Test" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 100vh;

  display: flex;
  flex-direction: column;
}
.chart-title {
  font-size: 2.5em;
  display: flex;
  justify-content: center;
}
</style>
