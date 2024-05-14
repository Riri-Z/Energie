<script setup>
// data to display
const props = defineProps({
  chartOptions: Object,
  constructorType: String,
});
</script>

<template>
  <div class="chart-container">
    <highcharts
      v-if="props.chartOptions"
      :constructorType="props.constructorType"
      :options="props.chartOptions"
    ></highcharts>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  margin: 0.5rem;
}
@media only screen and (max-width: $screen-sm) {
  .chart-container {
    width: 90%;
  }
}

@media only screen and (max-width: $screen-dp) {
  .chart-container {
    width: 100%;
  }
}
</style>
