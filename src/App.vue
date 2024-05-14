<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
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
const route = useRoute();
const isEco2MixTab = computed(() => route.name === 'Eco2Mix');
</script>

<template>
  <div class="app">
    <NavBar />
    <div class="app-content">
      <header class="app-content-header">
        <h1 class="app-content-header-title">Données éCO2mix nationales</h1>
        <LoadingComponent v-if="eco2MixStore.loading" />

        <div
          v-if="eco2MixStore.limitDateEnd && consumptionStore.dateSelected && !eco2MixStore.loading"
          class="app-content-header-periode"
        >
          <SelectPeriod />
        </div>
      </header>
      <p
        class="app-disclaimer"
        v-if="isEco2MixTab && eco2MixStore.limitDateEnd && !eco2MixStore.loading"
      >
        * Si la période est supérieur à deux semaines, vous ne pourrez pas télécharger les formats
        suivants : PNG, JPEG, PDF, et SVG
      </p>
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
  &-disclaimer {
    padding: 0;
    margin: 0;
    font-size: 0.7rem;
    font-style: italic;
    color: $white;
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
