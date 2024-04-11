import { defineStore } from 'pinia';
import { LIMIT_DATE_DATA } from '@/utils/constants';
import { isoStringToUtC2, timeStampTotimeStampPlus2 } from '@/utils/convertDate';
const todayDate = new Date(LIMIT_DATE_DATA);

export const useEco2mixStore = defineStore('eco2mix', {
  state: () => ({
    chartOptionsEco2Mix: null,
    limitDateStart: new Date(LIMIT_DATE_DATA),
    dateStart: new Date(todayDate.setHours(0, 0, 0, 0)),
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
    },
    selectdateEnd(newValue) {
      this.dateEnd = newValue;
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
      const data = await response.json();

      if (Array.isArray(data.data) && data.data.length > 0) {
        const seriesData = [
          {
            name: 'Fioul',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.fioul
            ])
          },
          {
            name: 'Charbon',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.charbon
            ])
          },
          {
            name: 'Gaz',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.gaz
            ])
          },
          {
            name: 'nucleaire',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.nucleaire
            ])
          },
          {
            name: 'eolien',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.eolien
            ])
          },
          {
            name: 'solaire',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.solaire
            ])
          },
          {
            name: 'hydraulique',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.hydraulique
            ])
          },
          {
            name: 'pompage',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.pompage
            ])
          },
          {
            name: 'bioenergies',
            data: data.data.map((item) => [
              timeStampTotimeStampPlus2(Date.parse(item.date_heure)),
              item.bioenergies
            ])
          }
        ];

        const chartConfiguration = {
          chart: {
            type: 'area'
          },
          title: {
            text: "Production d'énergie",
            align: 'left'
          },
          subtitle: {
            text:
              'Source: ' +
              '<a href="https://www.ssb.no/en/statbank/table/09288/"' +
              'target="_blank">SSB</a>',
            align: 'left'
          },
          yAxis: {
            title: {
              useHTML: true,
              text: 'Million tonnes CO<sub>2</sub>-equivalents'
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
          series: seriesData
        };

        this.chartOptionsEco2Mix = chartConfiguration;

        console.log('chartConfiguration', chartConfiguration);
        return 'getECO2mixRealTimeData';
      }
    }
  }
});
