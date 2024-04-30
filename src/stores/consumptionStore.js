import { defineStore } from 'pinia';
import { formatDateToApi, timeStampTotimeStampPlus2 } from '@/utils/convertDate';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';

export const useConsumptionStore = defineStore('consumption', {
  state: () => ({
    frenchMapOptions: null,
    limitDateStart: null,
    dateSelected: null,
    limitDateEnd: null,
    dateEnd: null,
    error: false,
  }),
  actions: {
    setChartOption(value, key) {
      this[key] = value;
    },
    setSelectDate(value, key) {
      this[key] = value;
    },
    setError(value) {
      this.error = value;
    },
    async getLastDateAvailable() {
      try {
        const url = new URL(
          import.meta.env.VITE_API_URL +
            import.meta.env.VITE_API_ENDPOINT_CONSUMPTION +
            '/' +
            import.meta.env.VITE_API_PATH_LAST_RECORD,
        );
        const headers = {
          'Content-Type': 'application/json',
        };
        const method = 'GET';

        const response = await fetch(url, {
          method,
          headers,
        });
        const result = await response.json();

        if (result?.date != null) {
          const lastDateAvailable = parseISO(result.date);

          const keys = ['dateSelected', 'limitDateEnd', 'limitDateStart', 'dateEnd'];
          keys.forEach((key) => this.setSelectDate(lastDateAvailable, key));
          this.getConsumptions(lastDateAvailable);
        }
      } catch (error) {
        this.setError(true);
        console.error(error);
      }
    },
    // Une seul date, et non un range
    async getConsumptions(date = this.dateSelected) {
      try {
        const url = new URL(
          import.meta.env.VITE_API_URL + import.meta.env.VITE_API_ENDPOINT_CONSUMPTION,
        );
        url.searchParams.append('date', formatDateToApi(date));
        const options = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        };

        const result = await fetch(url, options).then((response) => response.json());
      } catch (error) {
        console.error('Error : ', error);
      }
      const data = [];
      return data;
    },
  },
});
