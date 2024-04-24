import { defineStore } from 'pinia';
import { formatDateToApi, timeStampTotimeStampPlus2 } from '@/utils/convertDate';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';

export const useEco2mixStore = defineStore('eco2mix', {
  state: () => ({
    limit_end_data: null,
    chartOptionsEco2Mix: null,
    chartOptionsElectricityConsumption: null,
    chartCo2Emission: null,
    chartCommercialTrade: null,
    limitDateStart: null,
    dateStart: null,
    limitDateEnd: null,
    dateEnd: null,
    error: false,
  }),
  getters: {},
  actions: {
    setSelectdateStart(date) {
      this.dateStart = date;
    },
    setLimitDateStart(date) {
      this.limitDateEnd = date;
    },
    setlimit_end_data(date) {
      this.limit_end_data = date;
    },
    setLimitDateEnd(date) {
      this.limitDateEnd = date;
    },
    setSelectdateEnd(date) {
      this.dateEnd = date;
    },
    updateChartOptionsEco2Mix(newValue) {
      this.chartOptionsEco2Mix = newValue;
    },
    updateChartOptionsElectricityConsumption(newValue) {
      this.chartOptionsElectricityConsumption = newValue;
    },
    updateChartCo2Emission(newValue) {
      this.chartCo2Emission = newValue;
    },
    updateChartCommercialTrade(newValue) {
      this.chartCommercialTrade = newValue;
    },
    setError(value) {
      this.error = value;
    },
    async getLastDateAvailable() {
      try {
        const url = new URL(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH_LAST_RECORD);
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
          this.setlimit_end_data(lastDateAvailable);
          this.setSelectdateStart(lastDateAvailable);
          this.setLimitDateEnd(lastDateAvailable);
          this.setSelectdateEnd(lastDateAvailable);
          this.setSelectdateStart(lastDateAvailable);
        }
      } catch (error) {
        this.setError(true);
        console.log('error', error);
      }
    },
    transformDataForChartEco2mix(values) {
      for (const element of values) {
        element.timeStamp = Date.parse(element.date_heure);
      }
      /* Mix energie chart */
      const seriesElictricityProduction = [
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
          data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.hydraulique]),
        },
        {
          name: 'Pompage',
          data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.pompage]),
        },
        {
          name: 'Bioenergies',
          data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.bioenergies]),
        },
      ];

      const chartOptionsEco2Mix = {
        chart: {
          type: 'area',
        },
        subtitle: {
          text: 'Source: <a href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
          align: 'left',
        },
        title: {
          text: "La production d'électricité par filière",
          align: 'left',
        },
        yAxis: {
          title: {
            text: ' Mégawattheures (MWh)',
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
          verticalAlign: 'bottom',
        },
        series: seriesElictricityProduction,
        accessibility: {
          enabled: false,
        },
      };

      const seriesElectricityConsumption = [
        {
          name: 'Consommation',
          data: values.map((item) => [
            timeStampTotimeStampPlus2(item.timeStamp),
            item.consommation,
          ]),
        },
        {
          name: 'Prevision_j1',
          data: values.map((item) => [
            timeStampTotimeStampPlus2(item.timeStamp),
            item.prevision_j1,
          ]),
        },
        {
          name: 'Prevision_j',
          data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.prevision_j]),
        },
      ];

      const chartOptionsElectricityConsumption = {
        title: {
          text: 'Consommation electrique en France',
          align: 'left',
        },
        loading: {
          hideDuration: 1000,
          showDuration: 1000,
        },
        subtitle: {
          text: 'Source: <a href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
          align: 'left',
        },
        yAxis: {
          title: {
            text: 'Consommation nationale',
          },
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date Heure',
          },
        },

        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
        },
        tooltip: {
          shared: true,
          headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },

        series: seriesElectricityConsumption,
      };
      return { chartOptionsEco2Mix, chartOptionsElectricityConsumption };
    },
    /**
     * - Compute data  to display ECO2mix_daily
     * @returns {Object}
     */
    async fetchECO2mixRealTimeData(start = this.dateStart, end = this.dateEnd) {
      const url = new URL(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH_TOTAL_PRODUCTION);
      url.searchParams.append('startDate', formatDateToApi(start));
      url.searchParams.append('endDate', formatDateToApi(end));

      const headers = {
        'Content-Type': 'application/json',
      };

      const method = 'GET';

      try {
        const response = await fetch(url, {
          method,
          headers,
        });

        return await response.json();
      } catch (error) {
        console.error('Error fetching ECO2mix data:', error);
        throw new Error('Failed to fetch ECO2mix data');
      }
    },
    async getECO2mixRealTimeData(start = this.dateStart, end = this.dateEnd) {
      try {
        const result = await this.fetchECO2mixRealTimeData(start, end);

        if (Array.isArray(result.data) && result.data.length > 0) {
          const data = this.transformDataForChartEco2mix(result.data);
          const { chartOptionsEco2Mix, chartOptionsElectricityConsumption } = data;
          this.updateChartOptionsEco2Mix(chartOptionsEco2Mix);
          this.updateChartOptionsElectricityConsumption(chartOptionsElectricityConsumption);

          return 'Data fetched successfully';
        } else {
          this.setError(true);
          return 'No data available';
        }
      } catch (error) {
        console.error('Error getting ECO2mix real-time data:', error);
        return 'Error getting ECO2mix real-time data';
      }
    },
    async getCo2Rate(start = this.dateStart, end = this.dateEnd) {
      const url = new URL(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH_CO2_RATE);
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

        const seriesCo2 = [
          {
            name: 'Taux de Co2',

            data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.taux_co2]),
          },
        ];
        const chartCo2Emission = {
          chart: {
            type: 'line',
          },
          title: {
            text: 'Émissions de CO2 par kWh produit en France',
            align: 'left',
          },
          subtitle: {
            text: 'Source: <a href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
            align: 'left',
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date Heure',
            },
          },
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
      const url = new URL(import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PATH_ENERGIES_TRADE);
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
            align: 'left',
          },
          subtitle: {
            text: 'Source: <a href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
            align: 'left',
          },
          xAxis: xAxis,
          yAxis: {
            title: {
              text: 'Mégawattheures (MWh)',
            },
          },
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
