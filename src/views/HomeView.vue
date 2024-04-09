<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import { useMixEnergieStore } from '@/stores/mixEnergieStore';
import ErrorComponent from '@/components/ErrorComponent.vue';

const mixEnergieStore = useMixEnergieStore();
mixEnergieStore.getConsoElecGaz();
/*mixEnergieStore.getECO2mixRealTimeData(); */
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

    <h1 class="home-view-content-mix-energie-title">Données éCO2mix nationales temps réel</h1>
    <p class="home-view-content-mix-energie-description">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>
    <ChartComponent :chartOptions="mixEnergieStore.chartOptionsConsoElecGaz" />
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
