<template>
  <div class="production-wrapper-container">
    <ChartComponent
      v-if="eco2MixStore.chartOptionsEco2Mix"
      :chartOptions="eco2MixStore.chartOptionsEco2Mix"
    />

    <ErrorComponent v-else mainTitle="Erreur eco2mix" />
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getECO2mixRealTimeData();
</script>

<style lang="scss" scoped>
.production-wrapper-container {
  flex-basis: calc(50% - 20px);
  padding: 10px;
  margin: 5px;
  box-sizing: border-box;
}
</style>
