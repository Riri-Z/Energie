<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Datepicker from 'vue3-datepicker';
import { fr } from 'date-fns/locale';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import { useConsumptionStore } from '@/stores/consumptionStore';
import { ref } from 'vue';
import { LIMIT_START_DATE_DATA } from '@/utils/constants';
const route = useRoute();
const isEco2MixTab = computed(() => route.name === 'Eco2Mix');
/* eco2MixStore */
const eco2MixStore = useEco2mixStore();
const dateStart = ref(eco2MixStore.dateStart);
const dateEnd = ref(eco2MixStore.dateEnd);
const limitDateStart = ref(eco2MixStore.limitDateStart);
const limitDateEnd = ref(eco2MixStore.limitDateEnd);

/* consumptionStore */
const consumptionStore = useConsumptionStore();
const dateSelected = ref(consumptionStore.dateSelected);

const updateChart = () => {
  eco2MixStore.setError(false);
  eco2MixStore.setChartsConfig([]);
  eco2MixStore.setLoading(true);
  eco2MixStore.getECO2mixRealTimeData();
};
const ondateEndChange = (payload) => {
  const key = 'dateEnd';
  return eco2MixStore.setSelectDate(payload, key);
};
const ondateStartChange = (payload) => {
  const key = 'dateStart';
  return eco2MixStore.setSelectDate(payload, key);
};
const onDateConsumptionChange = (payload) => {
  const key = 'dateSelected';
  consumptionStore.setLoading(true);
  consumptionStore.setSelectDate(payload, key);
  return consumptionStore.getConsumptions(payload);
};
</script>

<template>
  <div v-if="isEco2MixTab" class="selection-periode">
    <div class="selection-periode-start">
      <p class="selection-periode-start-label">Début</p>
      <div class="selection-periode-start-date-container">
        <Datepicker
          v-model="dateStart"
          @update:modelValue="ondateStartChange"
          :locale="fr"
          :upper-limit="limitDateStart"
          :lower-limit="new Date(LIMIT_START_DATE_DATA)"
          inputFormat="dd-MM-yyyy"
        />
      </div>
    </div>
    <div class="selection-periode-end">
      <p class="selection-periode-end-label">Fin</p>
      <div class="selection-periode-end-date-container">
        <Datepicker
          v-model="dateEnd"
          @update:modelValue="ondateEndChange"
          :locale="fr"
          :upper-limit="limitDateEnd"
          :lowerLimit="eco2MixStore.dateStart"
          inputFormat="dd-MM-yyyy"
        />
      </div>
    </div>
    <div class="selection-periode-refresh">
      <button class="selection-periode-refresh-btn" @click="updateChart">
        <p class="selection-periode-refresh-btn-text">Appliquer</p>
      </button>
    </div>
  </div>
  <div v-if="!isEco2MixTab">
    <div class="selection-periode-start">
      <p class="selection-periode-start-label">Date</p>
      <div class="selection-periode-start-date-container">
        <Datepicker
          v-model="dateSelected"
          @update:modelValue="onDateConsumptionChange"
          :locale="fr"
          :upper-limit="limitDateEnd"
          :lower-limit="new Date(LIMIT_START_DATE_DATA)"
          inputFormat="dd-MM-yyyy"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selection-periode {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-family: Quicksand;
  font-style: italic;
  font-size: 1.2rem;
  height: 4rem;
  &-start {
    display: flex;
    flex-direction: row;
    gap: 10px;
    &-label {
      font-family: Quicksand;
      font-style: italic;
      font-size: 1.2rem;
    }
    &-date-container {
      align-self: center;
    }
  }

  &-end {
    display: flex;
    flex-direction: row;
    gap: 10px;

    &-date-container {
      align-self: center;
    }
  }

  &-refresh {
    &-btn {
      font-size: 100%;
      font-weight: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      margin: 0;
      padding: 0;
      cursor: pointer;
      margin-left: 0.5rem;
      width: 7rem;
      height: 1.5rem;
      border-radius: 0.375rem;
      background-color: #f6f4ec;
      &-text {
        text-align: center;
        margin: auto;
        font-family: Quicksand-bold;
        font-size: 0.75rem;
      }
    }
  }
}
</style>
