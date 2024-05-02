<!--The page provides an overview of mix-energie consumption on the map of France. -->

<script setup>
import frenchMap from '@highcharts/map-collection/countries/fr/fr-all.topo.json';
import { useConsumptionStore } from '@/stores/consumptionStore.js';
import ChartComponent from '@/components/ChartComponent.vue';

const consumptionStore = useConsumptionStore();
</script>

<template>
  <div>
    <h1>
      Consommation quotidienne brute régionale(jusqu'en 2024-02-29) Consommation annuelle
      d’électricité et gaz par région et par secteur d’activité (jusqu'en 2021)
    </h1>
    <p>
      Ce jeu de données présente les courbes de consommation régionale d’électricité et de gaz
      journalieres en MW.
    </p>
    <div v-if="consumptionStore.frenchMapOptions">
      <highcharts
        :constructorType="`mapChart`"
        class="hc"
        :options="consumptionStore.frenchMapOptions"
        ref="chart"
      ></highcharts>
    </div>
  </div>
</template>

<style></style>
