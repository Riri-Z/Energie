<script setup>
// data to display
const props = defineProps({
  chartOptions: Object
});
</script>

<template>
  <highcharts :options="props.chartOptions"></highcharts>
</template>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-direction: column;
}
.chart-title {
  font-size: 2.5em;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>

<!--
                    "dataset_id": "nb-clients-prod-region",
 -->
