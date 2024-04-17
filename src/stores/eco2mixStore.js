import { defineStore } from 'pinia';
import { LIMIT_END_DATE_DATA } from '@/utils/constants';
import { isoStringToUtC2, timeStampTotimeStampPlus2 } from '@/utils/convertDate';
const todayDate = new Date(LIMIT_END_DATE_DATA);

export const useEco2mixStore = defineStore('eco2mix', {
  state: () => ({
    limit_end_data: null,
    chartOptionsEco2Mix: null,
    chartCo2Emission: null,
    limitDateStart: new Date(LIMIT_END_DATE_DATA),
    dateStart: new Date(todayDate.setHours(0, 0, 0, 0)),
    limitDateEnd: new Date(LIMIT_END_DATE_DATA),
    dateEnd: new Date(LIMIT_END_DATE_DATA)
  }),
  getters: {},
  actions: {
    selectdateStart(newValue) {
      console.log('newValue', newValue);

      this.dateStart = newValue;
    },
    handleLimitDateEnd(newValue) {
      this.limitDateEnd = newValue;
    },
    selectdateEnd(newValue) {
      this.dateEnd = newValue;
    },
    async getLastDateAvailable() {
      const url = new URL('http://localhost:3000/eco2mix/lastRecord');
      const headers = {
        'Content-Type': 'application/json'
      };
      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers
      });
      const result = await response.json();
      if (result.date != null) {
        this.limit_end_data = result.date;
      }
      return true;
    },
    /**
     * - Compute data  to display ECO2mix_daily
     * @returns {Object}
     */
    async getECO2mixRealTimeData(start = this.dateStart, end = this.dateEnd) {
      /*
      TODO :
       - créer un utils pour gerer la TIMEZONE  toISOString  +2  afin d'avoir UTC+2
        -fetch API
        -Compute data
        - update this.chartOptionsEco2Mix
        - Display last data available (8/04)
      */
      const url = new URL(`http://localhost:3000/eco2mix/totalproduction`);
      url.searchParams.append('startDate', isoStringToUtC2(start.toISOString()));
      url.searchParams.append('endDate', isoStringToUtC2(end.toISOString()));

      const headers = {
        'Content-Type': 'application/json'
      };

      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const values = result.data;

        /* Mix energie chart */
        const seriesData = [
          {
            name: 'Fioul',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.fioul
            ])
          },
          {
            name: 'Charbon',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.charbon
            ])
          },
          {
            name: 'Gaz',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.gaz
            ])
          },
          {
            name: 'Nucleaire',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.nucleaire
            ])
          },
          {
            name: 'Eolien',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.eolien
            ])
          },
          {
            name: 'Solaire',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.solaire
            ])
          },
          {
            name: 'Hydraulique',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.hydraulique
            ])
          },
          {
            name: 'Pompage',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.pompage
            ])
          },
          {
            name: 'Bioenergies',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.bioenergies
            ])
          }
        ];

        const chartOptionsEco2Mix = {
          chart: {
            type: 'area'
          },
          title: {
            text: "La production d'électricité par filière",
            align: 'left'
          },
          yAxis: {
            title: {
              useHTML: true,
              text: 'MW'
            }
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date Heure'
            }
          },
          tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top'
          },
          series: seriesData,
          accessibility: {
            enabled: false
          }
        };

        /* CO2 chart */
        const xAxisCo2 = {
          categories: values.map((item) => {
            const date = timeStampTotimeStampPlus2(Date.parse(item.date_heure));

            return date;
          }),
          accessibility: {
            description: 'Heure du relevé'
          },
          labels: {
            format: '{value:%d-%m %H:%M:%S}'
          },
          type: 'datetime',
          title: {
            text: 'Date Heure'
          }
        };

        const seriesCo2 = [
          {
            name: 'Taux de Co2',

            data: values.map((item) => {
              return item.taux_co2;
            })
          }
        ];
        const chartCo2Emission = {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Émissions de CO2 par kWh produit en France'
          },
          xAxis: xAxisCo2,

          yAxis: {
            title: {
              text: 'Taux Co2 eq/kwh'
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },

          series: seriesCo2
        };
        this.chartOptionsEco2Mix = chartOptionsEco2Mix;
        this.chartCo2Emission = chartCo2Emission;
        return 'getECO2mixRealTimeData';
      }
    }
  }
});
