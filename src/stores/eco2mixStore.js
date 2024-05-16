import { defineStore } from 'pinia';
import {
  formatDateToApi,
  isRangeLongerThanTwoWeeks,
  timeStampTotimeStampPlus2,
} from '@/utils/convertDate';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';

export const useEco2mixStore = defineStore('eco2mix', {
  state: () => ({
    chartOptionsEco2Mix: null,
    chartOptionsEco2MixLoading: false,
    chartOptionsElectricityConsumption: null,
    chartOptionsElectricityConsumptionLoading: false,
    chartCo2Emission: null,
    chartCo2EmissionLoading: false,
    chartCommercialTrade: null,
    chartCommercialTradeLoading: false,
    limitDateStart: null,
    dateStart: null,
    limitDateEnd: null,
    dateEnd: null,
    error: false,
    loading: false,
  }),
  getters: {
    getLoading() {
      return this.loading;
    },
    getIsAllChartsLoaded() {
      return (
        this.limitDateEnd &&
        this.chartOptionsEco2MixLoading &&
        this.chartCommercialTradeLoading &&
        this.chartCo2EmissionLoading &&
        this.chartOptionsElectricityConsumptionLoading
      );
    },
  },
  actions: {
    setLoading(value) {
      this.loading = value;
    },
    setChartLoading(value, key) {
      key = key + 'Loading';
      this[key] = value;
    },
    setChartOption(value, key) {
      this[key] = value;
      this.setChartLoading(false, key);
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
            import.meta.env.VITE_API_ENDPOINT_ECO2MIX +
            '/' +
            import.meta.env.VITE_API_PATH_LAST_RECORD
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

          const keys = ['dateStart', 'limitDateEnd', 'limitDateStart', 'dateEnd', 'dateStart'];
          keys.forEach((key) => this.setSelectDate(lastDateAvailable, key));
          this.setLoading(false);
          this.getECO2mixRealTimeData(lastDateAvailable, lastDateAvailable);
        }
      } catch (error) {
        this.setError(true);
        console.error(error);
      }
    },

    /* TODO : MOVE TO API, and fetch only the chart's option */
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
          borderRadius: 20,
          type: 'area',
        },
        subtitle: {
          text: 'Source: <a id="link-source" href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
          align: 'left',
        },
        title: {
          text: "La production d'électricité par filière",
          align: 'center',
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
          xDateFormat: '%d-%m-%y %H:%M',
          followPointer: false,
          split: true,
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
        },
        series: seriesElictricityProduction,
        credits: {
          enabled: false,
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: isRangeLongerThanTwoWeeks(this.dateStart, this.dateEnd),
            },
          },
        },
      };

      /* Electricity consumption chart */
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
        chart: {
          borderRadius: 20,
        },
        title: {
          text: 'Consommation électrique en France',
          align: 'center',
        },
        loading: {
          hideDuration: 1000,
          showDuration: 1000,
        },
        subtitle: {
          text: 'Source: <a id="link-source"href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
          align: 'left',
        },
        yAxis: {
          title: {
            text: 'Consommation nationale (MWh)',
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
        credits: {
          enabled: false,
        },
        tooltip: {
          followPointer: true,
          xDateFormat: '%d-%m-%y %H:%M',
          shared: true,
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
        exporting: {
          buttons: {
            contextButton: {
              menuItems: isRangeLongerThanTwoWeeks(this.dateStart, this.dateEnd),
            },
          },
        },
      };

      /* Co2 rate chart */
      const seriesCo2Rate = [
        {
          name: 'Taux de Co2',

          data: values.map((item) => [timeStampTotimeStampPlus2(item.timeStamp), item.taux_co2]),
        },
      ];

      const chartOptionsCo2Rate = {
        chart: {
          borderRadius: 20,
          type: 'line',
        },
        title: {
          text: 'Émissions de CO2 par kWh produit en France',
          align: 'center',
        },
        subtitle: {
          text: 'Source: <a id="link-source"href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
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
          xDateFormat: '%d-%m-%y %H:%M',
          followPointer: true,
          shared: true,
        },
        credits: {
          enabled: false,
        },
        series: seriesCo2Rate,
        exporting: {
          buttons: {
            contextButton: {
              menuItems: isRangeLongerThanTwoWeeks(this.dateStart, this.dateEnd),
            },
          },
        },
      };

      /* Trade chart */
      const categories = values.map((item) => {
        return format(Date.parse(item.date_heure), 'dd-MM');
      });

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

      const aggregatedData = [];

      values.forEach((item) => {
        const {
          date,
          ech_comm_angleterre,
          ech_comm_espagne,
          ech_comm_italie,
          ech_comm_suisse,
          ech_comm_allemagne_belgique,
        } = item;

        const index = aggregatedData.findIndex((e) => e.date === date);
        if (index == -1) {
          let newItem = {
            date,
            ech_comm_angleterre,
            ech_comm_espagne,
            ech_comm_italie,
            ech_comm_suisse,
            ech_comm_allemagne_belgique,
          };
          return aggregatedData.push(newItem);
        }

        const tradeProperties = {
          date,
          ech_comm_angleterre,
          ech_comm_espagne,
          ech_comm_italie,
          ech_comm_suisse,
          ech_comm_allemagne_belgique,
        };

        // Compute each values properties
        for (const key in tradeProperties) {
          if (key !== 'date' && key !== 'date_heure' && tradeProperties[key] !== null) {
            let value = parseInt(tradeProperties[key]);
            aggregatedData[index][key] = +aggregatedData[index][key] + value;
          }
        }
      });

      //Data is grouped by dates
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
          borderRadius: 20,
          type: 'column',
        },
        title: {
          text: 'Echanges commerciaux avec les pays frontaliers',
          align: 'center',
        },
        subtitle: {
          text: 'Source: <a id="link-source"href="https://odre.opendatasoft.com/explore/dataset/eco2mix-national-tr/information/?disjunctive.nature" target="_blank">ODRE</a>',
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
        exporting: {
          buttons: {
            contextButton: {
              menuItems: isRangeLongerThanTwoWeeks(this.dateStart, this.dateEnd),
            },
          },
        },
      };

      return {
        chartOptionsEco2Mix,
        chartOptionsElectricityConsumption,
        chartOptionsCo2Rate,
        configurationChartCommercialTrade,
      };
    },

    async fetchECO2mixRealTimeData(start = this.dateStart, end = this.dateEnd) {
      const url = new URL(
        import.meta.env.VITE_API_URL +
          import.meta.env.VITE_API_ENDPOINT_ECO2MIX +
          '/' +
          import.meta.env.VITE_API_PATH_TOTAL_PRODUCTION
      );
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
      this.setChartLoading(true, 'chartOptionsEco2Mix');
      this.setChartLoading(true, 'chartOptionsElectricityConsumption');
      this.setChartLoading(true, 'chartCo2Emission');
      this.setChartLoading(true, 'chartCommercialTrade');
      try {
        const result = await this.fetchECO2mixRealTimeData(start, end);

        if (Array.isArray(result.data) && result.data.length > 0) {
          const data = this.transformDataForChartEco2mix(result.data);
          const {
            chartOptionsEco2Mix,
            chartOptionsElectricityConsumption,
            chartOptionsCo2Rate,
            configurationChartCommercialTrade,
          } = data;
          this.setChartOption(chartOptionsEco2Mix, 'chartOptionsEco2Mix');
          this.setChartOption(
            chartOptionsElectricityConsumption,
            'chartOptionsElectricityConsumption'
          );
          this.setChartOption(chartOptionsCo2Rate, 'chartCo2Emission');
          this.setChartOption(configurationChartCommercialTrade, 'chartCommercialTrade');

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
  },
});
