<!-- Page that allow to views multiple charts related to  mix energie -->
<!--
TODO :


  - Maybe add select / calendar to filter data && charts
  - Finish /frenchMap
  - Add style
-->
<script setup>
import ChartComponent from '../components/ChartComponent.vue';
import { useMixEnergieStore } from '@/stores/mixEnergieStore';

const mixEnergieStore = useMixEnergieStore();
mixEnergieStore.getConsoElecGaz();
let chartOptionsConsoElecGaz = mixEnergieStore.getConsoElecGaz().optionsChartConsoElecGaz;
</script>

<template>
  <div class="content">
    <ChartComponent :chartOptions="chartOptionsConsoElecGaz" />
    <h1 class="content-mix-energie-title">Données éCO2mix nationales temps réel</h1>
    <p class="content-mix-energie-description">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>
    <ChartComponent :chartOptions="chartOptionsConsoElecGaz" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  justify-content: center;
  height: 100vh;
}
</style>
