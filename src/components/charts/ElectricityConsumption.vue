<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
</script>

<template>
  <div class="chart-co2">
    <ChartComponent
      v-if="eco2MixStore.chartOptionsElectricityConsumption"
      :chartOptions="eco2MixStore.chartOptionsElectricityConsumption"
    />

    <ErrorComponent v-else mainTitle="Erreur consommation d'electricité" />
  </div>
</template>

<style lang="scss"></style>
