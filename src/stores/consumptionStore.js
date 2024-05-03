import { defineStore } from 'pinia';
import { formatDateToApi } from '@/utils/convertDate';
import { parseISO } from 'date-fns';
import frenchMap from '@highcharts/map-collection/countries/fr/fr-all.topo.json';

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
    setChartOption(value) {
      this.frenchMapOptions = value;
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
    computeMapOptions(data) {
      const mappedData = data.map((entry) => {
        return {
          'hc-key': entry.regionCodeISO3166,
          electricity: entry.consommation_brute_electricite_totale,
          gas: entry.consommation_brute_gaz_totale,
        };
      });
      const chartOption = {
        chart: {
          renderTo: 'chart-wrapper',
          map: frenchMap,
          backgroundColor: null,
          height: 600,
          aspectRatio: 16 / 9, // Ratio 16:9
        },
        title: {
          text: "Consommation quotidienne brute régionale (jusqu'en 2024-02-29)",
          style: {
            color: '#FFFFFF',
          },
        },
        subtitle: {
          text: 'Ce jeu de données présente la consommation régionale d’électricité (en MW) et de gaz (en MW PCS 0°C).',

          style: {
            color: '#FFFFFF',
          },
        },
        mapNavigation: {
          enabled: true,
        },
        colorAxis: {
          min: 0,
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Consommation brute régionale',
            states: {
              hover: {
                color: '#58e1c1',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
            allAreas: false,
            tooltip: {
              backgroundColor: null,
              borderWidth: 0,
              shadow: false,
              useHTML: true,
              pointFormatter: function () {
                return (
                  '<span>' +
                  this.name +
                  '</span><br/>' +
                  'Électricité : <b>' +
                  this.electricity +
                  '</b> MW<br/>' +
                  'Gaz : <b>' +
                  this.gas +
                  '</b> MW (PCS 0°C)'
                );
              },
            },

            data: mappedData,
          },
        ],
      };

      this.setChartOption(chartOption);
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
        if (result.length > 0) {
          this.computeMapOptions(result);
        } else {
          this.setError(true);
        }
      } catch (error) {
        console.error('Error : ', error);
      }
      const data = [];
      return data;
    },
  },
});
