<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import { useMixEnergieStore } from '@/stores/mixEnergieStore';
import ErrorComponent from '@/components/ErrorComponent.vue';

const mixEnergieStore = useMixEnergieStore();
mixEnergieStore.getConsoElecGaz();
</script>

<template>
  <div class="home-view-content">
    <ChartComponent
      v-if="mixEnergieStore.chartOptionsConsoElecGaz"
      :chartOptions="mixEnergieStore.chartOptionsConsoElecGaz"
    />

    <ErrorComponent
      v-else
      mainTitle="Erreur pour le graphique Consommation d'électricité et de gaz (2011 à 2021)"
    />
  </div>
</template>

<style lang="scss" scoped>
.home-view-content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  height: 100vh;
  &-mix-energie {
    &-title {
      font-family: 'Quicksand-bold';
    }
    &-description {
      font-family: 'Quicksand';
    }
  }
}
</style>
