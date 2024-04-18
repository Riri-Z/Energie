<template>
  <div class="eco-mix-view-content">
    <h1 class="eco-mix-view-content-title">Données éCO2mix nationales temps réel</h1>
    <p class="eco-mix-view-content-description">
      Bienvenue dans notre application dédiée à l'éco 2 mix en France ! L'objectif du site est de
      vous permettre de visualiser les tendances de consommation, les variations de production et la
      répartition des différentes sources d'énergie dans le pays.
    </p>
    <SelectPeriod />
    <section class="eco-mix-view-content-charts-container">
      <MixEnergy />

      <!-- Émissions de CO2 par kWh produit en France -->
      <RateCo2 />

      <!-- Trade Energie  -->
      <TradeEnergy />

      <!-- consommation electrique  -->
      <MixEnergy />
    </section>
  </div>
</template>

<script setup>
import MixEnergy from '@/components/charts/MixEnergy.vue';
import RateCo2 from '@/components/charts/RateCo2.vue';
import TradeEnergy from '@/components/charts/TradeEnergy.vue';
import SelectPeriod from '@/components/SelectPeriod.vue';
</script>

<style lang="scss" scoped>
.eco-mix-view-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  max-width: 100%;
  &-title {
    font-size: 1em;
  }
  &-description {
    max-width: 100%;
  }
  &-charts-container {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 10px;

    justify-content: space-between;
    @media screen and (max-width: $screen-dp) {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
