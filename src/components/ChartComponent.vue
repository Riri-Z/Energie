<script setup>
// data to display
const props = defineProps({
  chartOptions: Object,
  msg: String
});
</script>

<template>
  <p>{{ props.msg }}</p>
  <highcharts :options="props.chartOptions"></highcharts>
</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
}
.chart-title {
  font-size: 2.5em;
  display: flex;
  justify-content: center;
}
</style>

<!--


                    "dataset_id": "nb-clients-prod-region",
 -->
