<template>
  <div class="selection-periode">
    <div class="selection-periode-start">
      <p>Début</p>
      <Datepicker
        v-model="dateStart"
        @update:modelValue="ondateStartChange"
        :upper-limit="limitDateStart"
        :lower-limit="new Date(LIMIT_START_DATE_DATA)"
        inputFormat="dd-MM-yyyy"
      />
    </div>
    <div class="selection-periode-end">
      <p>Fin</p>
      <Datepicker
        v-model="dateEnd"
        @update:modelValue="ondateEndChange"
        :upper-limit="limitDateEnd"
        :lowerLimit="eco2MixStore.dateStart"
        inputFormat="dd-MM-yyyy"
      />
    </div>
    <div class="selection-periode-refresh">
      <button class="selection-periode-refresh-btn" @click="updateChart">
        <img class="selection-periode-refresh-btn-icon" :src="refresh" alt="button-refresh" />
        <p class="selection-periode-refresh-btn-text">Actualiser</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import Datepicker from 'vue3-datepicker';
import { useEco2mixStore } from '@/stores/eco2mixStore';
import refresh from '@/assets/icons/refresh.png';
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
  return eco2MixStore.setSelectdateEnd(payload);
};
const ondateStartChange = (payload) => {
  return eco2MixStore.setSelectdateStart(payload);
};
</script>

<style scoped lang="scss">
.selection-periode {
  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 15px;
  max-width: 100%;
  padding-bottom: 20px;
  &-refresh {
    display: flex;
    flex-direction: row;
    width: 100px;
    height: 40px;
    align-self: end;

    &-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: #2ea44f;
      padding: 6px 16px;
      border: 1px solid rgba(27, 31, 35, 0.15);
      border-radius: 6px;
      font-size: 14px;
      appearance: none;
      font-weight: 600;
      line-height: 20px;
    }

    @media screen and (max-width: $screen-md) {
      width: 50px;
    }
  }
}
</style>
