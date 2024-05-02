<script setup>
import SelectPeriod from '@/components/SelectPeriod.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import { useConsumptionStore } from '@/stores/consumptionStore';

import NavBar from './components/NavBar.vue';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getLastDateAvailable();
const consumptionStore = useConsumptionStore();
consumptionStore.getLastDateAvailable();
</script>
<!-- TODO
- Add BURGER MENU
-->
<template>
  <div class="app">
    <NavBar />
    <div class="app-content">
      <header class="app-content-header">
        <h1 class="app-content-title">Données éCO2mix nationales</h1>
        <div
          v-if="eco2MixStore.limitDateEnd && consumptionStore.dateSelected"
          class="app-content-periode"
        >
          <SelectPeriod />
        </div>
      </header>
      <section class="app-content-main">
        <RouterView />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  height: 100vh;
  overflow-y: auto;
  line-height: 1.6;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  color: $white;
  display: flex;
  &-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    margin-left: 1rem;
    &-periode {
      display: flex;
      justify-content: space-between;
    }
  }
}

@media only screen and (max-width: $screen-md) {
  .app {
    &-content {
      margin-left: 0;
      align-items: center;
      width: 100%;
      &-periode {
        justify-content: center;
      }
    }
  }
}
</style>
