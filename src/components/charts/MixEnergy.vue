<template>
  <div class="production-wrapper-container">
    <section class="production-wrapper-container-chart">
      <ChartComponent
        v-if="eco2MixStore.chartOptionsEco2Mix"
        :chartOptions="eco2MixStore.chartOptionsEco2Mix"
      />

      <ErrorComponent v-else mainTitle="Erreur eco2mix" />
    </section>
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getECO2mixRealTimeData();
</script>

<style lang="scss" scoped>
.production-wrapper-container {
}
</style>
