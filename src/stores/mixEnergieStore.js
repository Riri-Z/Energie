import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { API_ODRE_URL } from '@/utils/constants';

export const useMixEnergieStore = defineStore('mixEnergie', () => {
  /* PROPERTIES */
  let mixEnergyData = ref([]);

  /* COMPUTED */

  /* METHODS */
  const getMixEnergyData = async () => {
    try {
      const response = await fetch(API_ODRE_URL);
      console.log('response', response);
      if (response.status !== 200 || !response.ok) {
        return console.error('Response error is :', response);
      }
      mixEnergyData.value = await response.json();
    } catch {
      console.error('Something failed while fetching data');
    }
  };

  return { mixEnergyData, getMixEnergyData };
});
