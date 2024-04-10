import { defineStore } from 'pinia';
import { LIMIT_DATE_DATA } from '@/utils/constants';

export const useEco2mixStore = defineStore('eco2mix', {
  state: () => ({
    chartOptionsEco2Mix: null,
    limitDateStart: new Date(LIMIT_DATE_DATA),
    dateStart: new Date(LIMIT_DATE_DATA),
    limitDateEnd: new Date(LIMIT_DATE_DATA),
    dateEnd: new Date(LIMIT_DATE_DATA)
  }),
  getters: {
    /*  dateStart: (state) => state.dateStart,
     dateEnd: (state) => state.dateEnd, */
  },
  actions: {
    selectdateStart(newValue) {
      this.dateStart = newValue;
      console.log('this.dateStart', this.dateStart);
    },
    selectdateEnd(newValue) {
      console.log('newValue', newValue);
      this.dateEnd = newValue;
    },

    /**
     * - Compute data  to display ECO2mix_daily
     * @returns {Object}
     */
    async getECO2mixRealTimeData() {
      console.log('this.dateStart', this.dateStart);
      console.log('this.dateEnd', this.dateEnd);

      return 'getECO2mixRealTimeData';
    }
  }
});
