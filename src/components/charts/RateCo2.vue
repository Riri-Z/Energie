<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
</script>

<template>
  <div class="chart-co2">
    <ChartComponent
      v-if="eco2MixStore.chartCo2Emission"
      :chartOptions="eco2MixStore.chartCo2Emission"
    />

    <ErrorComponent v-else mainTitle="Erreur eco2mix" />
  </div>
</template>

<style lang="scss"></style>
