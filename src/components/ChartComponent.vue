<script setup>
// data to display
const props = defineProps({
  chartOptions: Object,
});
</script>

<template>
  <highcharts class="chart" :options="props.chartOptions"></highcharts>
</template>

<style lang="scss" scoped>
.chart {
  min-height: 400px;
  max-width: 100%;
}
</style>
