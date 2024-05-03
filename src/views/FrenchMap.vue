<script setup>
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
    <ChartComponent
      v-if="consumptionStore.frenchMapOptions"
      :chartOptions="consumptionStore.frenchMapOptions"
      constructorType="mapChart"
    />
  </div>
</template>

<style></style>
