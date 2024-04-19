import { defineStore } from 'pinia';
import { LIMIT_END_DATE_DATA } from '@/utils/constants';
import { formatDateToApi, timeStampTotimeStampPlus2 } from '@/utils/convertDate';
import { format } from 'date-fns';
const todayDate = new Date(LIMIT_END_DATE_DATA);

export const useEco2mixStore = defineStore('eco2mix', {
  state: () => ({
    limit_end_data: null,
    chartOptionsEco2Mix: null,
    chartCo2Emission: null,
    chartCommercialTrade: null,
    limitDateStart: new Date(LIMIT_END_DATE_DATA),
    dateStart: new Date(todayDate.setHours(0, 0, 0, 0)),
    limitDateEnd: new Date(LIMIT_END_DATE_DATA),
    dateEnd: new Date(LIMIT_END_DATE_DATA),
  }),
  getters: {},
  actions: {
    selectdateStart(newValue) {
      this.dateStart = newValue;
    },
    handleLimitDateEnd(newValue) {
      this.limitDateEnd = newValue;
    },
    selectdateEnd(newValue) {
      this.dateEnd = newValue;
    },
    updateChartOptionsEco2Mix(newValue) {
      this.chartOptionsEco2Mix = newValue;
    },
    updateChartCo2Emission(newValue) {
      this.chartCo2Emission = newValue;
    },
    updateChartCommercialTrade(newValue) {
      this.chartCommercialTrade = newValue;
    },
    async getLastDateAvailable() {
      const url = new URL('http://localhost:3000/eco2mix/lastRecord');
      const headers = {
        'Content-Type': 'application/json',
      };
      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers,
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
      const url = new URL(`http://localhost:3000/eco2mix/totalproduction`); // A variabiliser
      url.searchParams.append('startDate', formatDateToApi(start));
      url.searchParams.append('endDate', formatDateToApi(end));

      const headers = {
        'Content-Type': 'application/json',
      };

      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers,
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const values = result.data;

        for (const element of values) {
          element.timeStamp = Date.parse(element.date_heure);
        }
        /* Mix energie chart */
        const seriesData = [
          {
            name: 'Fioul',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.fioul]),
          },
          {
            name: 'Charbon',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.charbon]),
          },
          {
            name: 'Gaz',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.gaz]),
          },
          {
            name: 'Nucleaire',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.nucleaire]),
          },
          {
            name: 'Eolien',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.eolien]),
          },
          {
            name: 'Solaire',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.solaire]),
          },
          {
            name: 'Hydraulique',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(item.timeStamp),
              item.hydraulique,
            ]),
          },
          {
            name: 'Pompage',
            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.pompage]),
          },
          {
            name: 'Bioenergies',
            data: values.map((item) => [
              timeStampTotimeStampPlus2(item.timeStamp),
              item.bioenergies,
            ]),
          },
        ];

        const chartOptionsEco2Mix = {
          chart: {
            type: 'area',
          },

          title: {
            text: "La production d'électricité par filière",
            align: 'left',
          },
          yAxis: {
            title: {
              useHTML: true,
              text: 'MW',
            },
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date Heure',
            },
          },
          tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
          },
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
          },
          series: seriesData,
          accessibility: {
            enabled: false,
          },
        };

        this.updateChartOptionsEco2Mix(chartOptionsEco2Mix);
        return 'getECO2mixRealTimeData';
      }
    },
    async getCo2Rate(start = this.dateStart, end = this.dateEnd) {
      // A variabiliser
      const url = new URL(`http://localhost:3000/eco2mix/co2Rate`);
      url.search = new URLSearchParams({
        startDate: formatDateToApi(start),
        endDate: formatDateToApi(end),
      });
      const headers = {
        'Content-Type': 'application/json',
      };

      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers,
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const values = result.data;

        for (const element of values) {
          element.timeStamp = Date.parse(element.date_heure);
        }

        /* CO2 chart */
        const xAxisCo2 = {
          categories: values.map((item) => {
            const date = item.timeStamp;

            return date;
          }),
          accessibility: {
            description: 'Date/Heure du relevé du taux de Co2',
          },
          labels: {
            format: '{value:%d-%m %H:%M}',
          },
          type: 'datetime',
          title: {
            text: 'Date Heure',
          },
        };

        const seriesCo2 = [
          {
            name: 'Taux de Co2',

            data: values.map((item) => {
              return item.taux_co2;
            }),
          },
        ];
        const chartCo2Emission = {
          chart: {
            type: 'line',
          },
          time: {
            timezone: 'Europe/Berlin',
          },
          title: {
            text: 'Émissions de CO2 par kWh produit en France',
          },
          xAxis: xAxisCo2,

          yAxis: {
            title: {
              text: 'Taux Co2 eq/kwh',
            },
          },
          tooltip: {
            crosshairs: true,
            shared: true,
          },

          series: seriesCo2,
        };
        this.updateChartCo2Emission(chartCo2Emission);
      }
      return true;
    },
    async getECO2mixTradeEnergy(start = this.dateStart, end = this.dateEnd) {
      // A variabiliser
      const url = new URL(`http://localhost:3000/eco2mix/energiesTrade`);
      url.search = new URLSearchParams({
        startDate: formatDateToApi(start),
        endDate: formatDateToApi(end),
      });
      const headers = {
        'Content-Type': 'application/json',
      };

      const method = 'GET';

      const response = await fetch(url, {
        method,
        headers,
      });
      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        const values = result.data;

        const categories = values.map((item) => {
          return format(Date.parse(item.date_heure), 'dd-MM');
        });

        /* trade xAxis */
        const xAxis = {
          categories: [...new Set(categories)],
          accessibility: {
            description: 'Date',
          },
          labels: {
            format: '{value:%d-%m}',
          },
          type: 'datetime',
          title: {
            text: 'Date',
          },
        };

        // Regrouper les données par date
        const aggregatedData = [];

        // Boucler à travers les données
        values.forEach((item) => {
          const date = item.date;
          const index = aggregatedData.findIndex((e) => e.date === date);
          if (index == -1) {
            let newItem = {
              date: date,
              ech_comm_angleterre: item.ech_comm_angleterre,
              ech_comm_espagne: item.ech_comm_espagne,
              ech_comm_italie: item.ech_comm_italie,
              ech_comm_suisse: item.ech_comm_suisse,
              ech_comm_allemagne_belgique: item.ech_comm_allemagne_belgique,
            };
            return aggregatedData.push(newItem);
          }

          // Additionner les valeurs pour chaque propriété
          for (const key in item) {
            if (key !== 'date' && key !== 'date_heure' && item[key] !== null) {
              let value = parseInt(item[key]);
              aggregatedData[index][key] = +aggregatedData[index][key] + value;
            }
          }
        });

        const series = aggregatedData.reduce((acc, curr) => {
          for (const key in curr) {
            if (key !== 'date' && key !== 'date_heure') {
              const index = acc.findIndex((i) => i.name === key);
              const value = +curr[key];
              if (index === -1) {
                acc.push({ name: key, data: [value] });
              } else {
                acc[index].data.push(value);
              }
            }
          }

          return acc;
        }, []);
        const configurationChartCommercialTrade = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Echanges commerciales avec les pays frontaliers',
          },
          xAxis: xAxis,
          credits: {
            enabled: false,
          },
          plotOptions: {
            column: {
              borderRadius: '25%',
            },
          },
          series: series,
        };
        this.updateChartCommercialTrade(configurationChartCommercialTrade);
      }
      return true;
    },
  },
});
