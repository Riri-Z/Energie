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
        return [entry.regionCodeISO3166, entry.consommation_brute_electricite_totale];
      });
      const chartOption = {
        chart: {
          map: frenchMap,
        },
        title: {
          text: 'Consommation electrique et gaz journalieres en France',
        },
        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>',
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox',
          },
        },
        colorAxis: {
          min: 0,
        },
        series: [
          {
            name: 'Consommation',
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
            allAreas: false,

            tooltip: {
              formatter: function () {
                let tooltip = '<b>' + this.point.name + '</b><br/>';
                tooltip +=
                  'Consommation brute gaz grtgaz: ' +
                  this.point.options.consommation_brute_gaz_grtgaz +
                  ' MW<br/>';
                tooltip +=
                  'Consommation brute gaz terega: ' +
                  this.point.options.consommation_brute_gaz_terega +
                  ' MW<br/>';
                tooltip +=
                  'Consommation brute gaz totale: ' +
                  this.point.options.consommation_brute_gaz_totale +
                  ' MW<br/>';
                tooltip +=
                  'Consommation brute électricité totale: ' +
                  this.point.options.consommation_brute_electricite_totale +
                  ' MW';
                return tooltip;
              },
              shared: true,
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
