<template>
  <div class="eco-mix-view-content">
    <h1 class="eco-mix-view-content-title">Données éCO2mix nationales temps réel</h1>
    <p class="eco-mix-view-content-description">
      Bienvenue dans notre application dédiée à l'éco 2 mix en France ! L'objectif du site est de
      vous permettre de visualiser les tendances de consommation, les variations de production et la
      répartition des différentes sources d'énergie dans le pays.
    </p>
    <div v-if="eco2MixStore.error">Error with api</div>

    <article v-if="eco2MixStore.limitDateEnd" class="eco-mix-view-content-container">
      <SelectPeriod />
      <section class="eco-mix-view-content-container-charts">
        <!--      Production d'électricité par filière -->
        <MixEnergy />

        <!--    Consommation electrique en France -->
        <ElectricityConsumption />

        <!--       Émissions de CO2 par kWh produit en France -->
        <RateCo2 />

        <!-- Trade Energie -->
        <TradeEnergy />
      </section>
    </article>
  </div>
</template>

<script setup>
import MixEnergy from '@/components/charts/MixEnergy.vue';
import RateCo2 from '@/components/charts/RateCo2.vue';
import TradeEnergy from '@/components/charts/TradeEnergy.vue';
import ElectricityConsumption from '@/components/charts/ElectricityConsumption.vue';
import SelectPeriod from '@/components/SelectPeriod.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';

const eco2MixStore = useEco2mixStore();
eco2MixStore.getLastDateAvailable();
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    &-charts {
      max-width: 100%;
    }
  }
}
</style>
