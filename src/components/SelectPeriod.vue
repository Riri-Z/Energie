<script setup>
import Datepicker from 'vue3-datepicker';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import { ref } from 'vue';
import { LIMIT_START_DATE_DATA } from '@/utils/constants';

const eco2MixStore = useEco2mixStore();
const dateStart = ref(eco2MixStore.dateStart);
const dateEnd = ref(eco2MixStore.dateEnd);
const limitDateStart = ref(eco2MixStore.limitDateStart);
const limitDateEnd = ref(eco2MixStore.limitDateEnd);
const updateChart = () => {
  eco2MixStore.getECO2mixRealTimeData();
  eco2MixStore.getECO2mixTradeEnergy();
  eco2MixStore.getCo2Rate();
};
const ondateEndChange = (payload) => {
  const key = 'dateEnd';
  return eco2MixStore.setSelectdateEnd(payload, key);
};
const ondateStartChange = (payload) => {
  console.log('payload', payload);
  const key = 'dateStart';
  return eco2MixStore.setSelectdateStart(payload, key);
};
</script>

<template>
  <div class="selection-periode">
    <div class="selection-periode-start">
      <p class="selection-periode-start-label">Début</p>
      <div class="selection-periode-start-date-container">
        <Datepicker
          v-model="dateStart"
          @update:modelValue="ondateStartChange"
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
</template>

<style lang="scss" scoped>
.selection-periode {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  &-start {
    display: flex;
    flex-direction: row;
    gap: 10px;
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
      &-text {
        text-align: center;
        margin: auto;
      }
    }
  }
}
</style>
