<template>
  <div class="eco-mix-view-content">
    <div class="eco-mix-view-content-error" v-if="eco2MixStore.error">
      Oops, something went wrong ...
    </div>

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
  &-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
  }
  &-container {
    &-charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 90%;
      max-height: 90%;
    }
  }
}
@media only screen and (max-width: $screen-md) {
  .eco-mix-view-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-container {
      &-charts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: unset;
        width: 90vw;
      }
    }
  }
}
</style>
