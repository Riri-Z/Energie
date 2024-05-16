<template>
  <div class="eco-mix-view-content">
    <div class="eco-mix-view-content-error" v-if="eco2MixStore.error">
      Oops, something went wrong ...
    </div>
    <LoadingComponent v-if="eco2MixStore.getIsAllChartsLoaded" />
    <div v-else class="eco-mix-view-content-container">
      <p class="eco-mix-view-content-container-disclaimer">
        * Si la période est supérieur à deux semaines, vous ne pourrez pas télécharger les formats
        suivants : PNG, JPEG, PDF, et SVG
      </p>

      <main class="eco-mix-view-content-container-charts">
        <!--Production d'électricité par filière-->
        <ChartComponent
          v-if="eco2MixStore.chartOptionsEco2Mix"
          :chartOptions="eco2MixStore.chartOptionsEco2Mix"
          constructorType="chart"
        />

        <!--Consommation electrique en France -->
        <ChartComponent
          v-if="eco2MixStore.chartOptionsElectricityConsumption"
          :chartOptions="eco2MixStore.chartOptionsElectricityConsumption"
          constructorType="chart"
        />

        <!--Émissions de CO2 par kWh produit en France -->
        <ChartComponent
          v-if="eco2MixStore.chartCo2Emission"
          :chartOptions="eco2MixStore.chartCo2Emission"
          constructorType="chart"
        />

        <!-- Trade Energie -->
        <ChartComponent
          v-if="eco2MixStore.chartCommercialTrade"
          :chartOptions="eco2MixStore.chartCommercialTrade"
          constructorType="chart"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
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
    display: flex;
    flex-direction: column;
    &-disclaimer {
      padding: 0;
      margin: 0;
      font-size: 0.7rem;
      font-style: italic;
      color: $white;
    }
    &-charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 90%;
      max-height: 90%;
      gap: 5px;
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
