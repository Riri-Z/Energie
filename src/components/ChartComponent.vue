<script setup>
// data to display
const props = defineProps({
  chartOptions: Object,
});
</script>

<template>
  <div class="chart-container">
    <highcharts v-if="props.chartOptions" :options="props.chartOptions"></highcharts>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  flex-basis: calc(50% - 10px);
  box-sizing: border-box;
}
</style>
