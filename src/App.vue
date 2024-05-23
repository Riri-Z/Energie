<script setup>
import SelectPeriod from '@/components/SelectPeriod.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import { useConsumptionStore } from '@/stores/consumptionStore';
import LoadingComponent from '@/components/LoadingComponent.vue';
import NavBar from './components/NavBar.vue';
const eco2MixStore = useEco2mixStore();
eco2MixStore.getLastDateAvailable();
eco2MixStore.setLoading(true);
const consumptionStore = useConsumptionStore();
consumptionStore.getLastDateAvailable();
</script>

<template>
  <div class="app">
    <NavBar />
    <div class="app-content">
      <header class="app-content-header">
        <h1 class="app-content-header-title">Données éCO2mix nationales</h1>
        <LoadingComponent v-if="eco2MixStore.loading" />

        <div
          v-if="eco2MixStore.limitDateEnd && consumptionStore.dateSelected"
          class="app-content-header-periode"
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

    &-header {
      &-periode {
        display: flex;
        justify-content: space-between;
      }
      &-title {
        font-family: Quicksand-Semi-Bold;
      }
    }
  }
}

@media only screen and (max-width: $screen-md) {
  .app {
    flex-direction: column;

    &-content {
      margin-left: 0;
      align-items: center;
      width: 100%;

      &-header {
        display: flex;
        flex-direction: column;
        text-align: center;
        &-periode {
          justify-content: center;
        }

        &-title {
          font-size: 1.4rem;
        }
      }
    }
  }
}

@media only screen and (max-width: $screen-xs) {
  .app {
    &-content {
      &-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        &-title {
          text-align: center;
        }
      }
    }
  }
}
</style>
