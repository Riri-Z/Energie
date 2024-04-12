<script setup>
import Datepicker from 'vue3-datepicker';
import ChartComponent from '@/components/ChartComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { ref } from 'vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import refresh from '@/assets/icons/refresh.png';
import { LIMIT_START_DATE_DATA } from '@/utils/constants';
const eco2MixStore = useEco2mixStore();
const dateStart = ref(eco2MixStore.dateStart);
const dateEnd = ref(eco2MixStore.dateEnd);
const limitDateStart = ref(eco2MixStore.limitDateStart);
const limitDateEnd = ref(eco2MixStore.limitDateEnd);

eco2MixStore.getECO2mixRealTimeData();
eco2MixStore.getLastDateAvailable();
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

<template>
  <div class="production-electricity-wrapper-container-chart">
    <section>
      <div class="production-electricity-wrapper-selection-periode">
        <div class="production-electricity-wrapper-selection-periode-start">
          <p>Début</p>
          <Datepicker
            v-model="dateStart"
            @update:modelValue="ondateStartChange"
            :upper-limit="limitDateStart"
            :lower-limit="new Date(LIMIT_START_DATE_DATA)"
            inputFormat="dd-MM-yyyy"
          />
        </div>
        <div class="production-electricity-wrapper-selection-periode-end">
          <p>Fin</p>
          <Datepicker
            v-model="dateEnd"
            @update:modelValue="ondateEndChange"
            :upper-limit="limitDateEnd"
            :lowerLimit="eco2MixStore.dateStart"
            inputFormat="dd-MM-yyyy"
          />
        </div>
        <div class="production-electricity-wrapper-selection-periode-refresh">
          <button
            class="production-electricity-wrapper-selection-periode-refresh-btn"
            @click="updateChart"
          >
            <img
              class="production-electricity-wrapper-selection-periode-refresh-btn-icon"
              :src="refresh"
              alt="button-refresh"
            />
            <p class="production-electricity-wrapper-selection-periode-refresh-btn-text">
              Actualiser le graphique
            </p>
          </button>
        </div>
      </div>
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

<style lang="scss" scoped>
.production-electricity-wrapper {
  &-selection-periode {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    width: 100%;
    &-refresh {
      display: flex;
      flex-direction: row;
      &-btn {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>
