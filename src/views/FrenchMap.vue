<script setup>
import { useConsumptionStore } from '@/stores/consumptionStore.js';
import ChartComponent from '@/components/ChartComponent.vue';
const consumptionStore = useConsumptionStore();
</script>

<template>
  <div class="container">
    <div class="container-map">
      <ChartComponent
        v-if="consumptionStore.frenchMapOptions"
        :chartOptions="consumptionStore.frenchMapOptions"
        constructorType="mapChart"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 80vh;
  width: 80vw;
  &-map {
    max-height: 100%;
  }
}
</style>
