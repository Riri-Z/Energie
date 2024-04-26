<template>
  <div class="eco-mix-view-content">
    <h1 class="eco-mix-view-content-title">Données éCO2mix nationales temps réel</h1>
    <div v-if="eco2MixStore.error">Error with api</div>

    <section v-if="eco2MixStore.limitDateEnd" class="eco-mix-view-content-container-charts">
      <!--      Production d'électricité par filière-->
      <ChartComponent
        v-if="eco2MixStore.chartOptionsEco2Mix"
        :chartOptions="eco2MixStore.chartOptionsEco2Mix"
      />

      <!--Consommation electrique en France-->
      <ChartComponent
        v-if="eco2MixStore.chartOptionsElectricityConsumption"
        :chartOptions="eco2MixStore.chartOptionsElectricityConsumption"
      />

      <!--Émissions de CO2 par kWh produit en France-->
      <ChartComponent
        v-if="eco2MixStore.chartCo2Emission"
        :chartOptions="eco2MixStore.chartCo2Emission"
      />

      <!-- Trade Energie -->
      <ChartComponent
        v-if="eco2MixStore.chartCommercialTrade"
        :chartOptions="eco2MixStore.chartCommercialTrade"
      />
    </section>
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
</script>

<style lang="scss" scoped>
.eco-mix-view-content {
  &-title {
    font-size: 1.8rem;
  }
  &-description {
    text-align: justify;
  }
  &-container {
    &-charts {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}
</style>
