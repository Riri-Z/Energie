<template>
  <div class="eco-mix-view-content">
    <h1 class="eco-mix-view-content-mix-energie-title">Données éCO2mix nationales temps réel</h1>
    <p class="eco-mix-view-content-mix-energie-description">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>
    <section>
      <div class="eco-mix-view-content-selection-periode">
        <div class="eco-mix-view-content-selection-periode-start">
          <p>Début</p>
          <Datepicker
            v-model="dateStart"
            @update:modelValue="ondateStartChange"
            :upper-limit="limitDateStart"
          />
        </div>
        <div class="eco-mix-view-content-selection-periode-end">
          <p>Fin</p>
          <Datepicker
            v-model="dateEnd"
            @update:modelValue="ondateEndChange"
            :upper-limit="limitDateEnd"
          />
        </div>
      </div>
      <button @click="updateChart">FETCH</button>
    </section>

    <section class="chart">
      <ChartComponent
        v-if="eco2MixStore.chartOptionsEco2Mix"
        :chartOptions="eco2MixStore.chartOptionsEco2Mix"
      />

      <ErrorComponent v-else mainTitle="Erreur eco2mix" />
    </section>
  </div>
</template>

<script setup>
import Datepicker from 'vue3-datepicker';
import ChartComponent from '@/components/ChartComponent.vue';
import { ref } from 'vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';

const eco2MixStore = useEco2mixStore();
const dateStart = ref(eco2MixStore.dateStart);
const dateEnd = ref(eco2MixStore.dateEnd);
const limitDateStart = ref(eco2MixStore.limitDateStart);
const limitDateEnd = ref(eco2MixStore.limitDateEnd);
/*
TODO :
  - selection de la période
  - Fetch de l'api pour récupérer les data à afficher en fonction de la période
  - afficher le composant chart pour visualiser les data
*/
/*
Call Api to fetch data
*/
eco2MixStore.getECO2mixRealTimeData();
const updateChart = () => {
  eco2MixStore.getECO2mixRealTimeData();
};

// Fonction à appeler lorsque dateEnd change
const ondateEndChange = (payload) => {
  return eco2MixStore.selectdateEnd(payload);
};
const ondateStartChange = (payload) => {
  return eco2MixStore.selectdateStart(payload);
};
</script>

<style lang="scss" scoped>
.eco-mix-view-content {
  &-selection-periode {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
}
</style>
