<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getECO2mixTradeEnergy();
</script>

<template>
  <div class="chart-trade-energy-container">
    <ChartComponent
      v-if="eco2MixStore.chartCommercialTrade"
      :chartOptions="eco2MixStore.chartCommercialTrade"
    />

    <ErrorComponent v-else mainTitle="Erreur sur les échanges commerciaux" />
  </div>
</template>

<style lang="scss" scoped>
.chart-trade-energy-container {
  flex-basis: calc(50% - 20px);
  padding: 10px;
  margin: 5px;
  box-sizing: border-box;
}
</style>
