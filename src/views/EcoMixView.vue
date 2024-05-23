<template>
  <LoadingComponent v-if="eco2MixStore.getLoading && !eco2MixStore.getError" />
  <div v-if="eco2MixStore" class="eco-mix-view-content">
    <div class="eco-mix-view-content-error" v-if="eco2MixStore.getError">
      Le serveur est actuellement hors service. Veuillez réessayer plus tard :)
    </div>
    <div v-else class="eco-mix-view-content-container">
      <p
        v-if="eco2MixStore.getchartsConfig.length > 0"
        class="eco-mix-view-content-container-disclaimer"
      >
        * Si la période est supérieur à deux semaines, vous ne pourrez pas télécharger les formats
        suivants : PNG, JPEG, PDF, et SVG
      </p>

      <main class="eco-mix-view-content-container-charts">
        <template
          v-bind:key="chartConfig.title"
          v-for="chartConfig in eco2MixStore.getchartsConfig"
        >
          <ChartComponent :chartOptions="chartConfig" constructorType="chart" />
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
const eco2MixStore = useEco2mixStore();
</script>

<style lang="scss" scoped>
.eco-mix-view-content {
  &-title {
    font-size: 1.8rem;
  }

  &-description {
    text-align: justify;
  }

  &-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
  }

  &-container {
    display: flex;
    flex-direction: column;
    &-disclaimer {
      padding: 0;
      margin: 0;
      font-size: 0.7rem;
      font-style: italic;
      color: $white;
    }
    &-charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 90%;
      max-height: 90%;
      gap: 5px;
    }
  }
}
@media only screen and (max-width: $screen-md) {
  .eco-mix-view-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-container {
      align-items: center;
      &-charts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: unset;
        width: 90vw;
      }
    }
  }
}
</style>
