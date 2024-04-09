import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DateTime } from 'luxon';
import { BASE_ODRE_URL, ECO2_MIX_NATIONAL_DATASET_PER_DAY } from '@/utils/constants';

export const useMixEnergieStore = defineStore('mixEnergie', () => {
  const chartOptionsConsoElecGaz = ref(null);

  /**
   * Fetch data to init 'chartOptionsConsoElecGaz' and allow display first chart
   */
  const getConsoElecGaz = async () => {
    try {
      let response = await fetch('http://localhost:3000/total_conso_gaz_elec', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`An error has occured: ${response})`);
      }
      const data = await response.json();
      const resultTotal = data.reduce((acc, element) => {
        const { annee, filiere, consototale } = element;
        if (!acc[annee]) {
          acc[annee] = { consoElectrique: 0, consoGaz: 0 };
        }
        if (filiere === 'Electricite') {
          acc[annee].consoElectrique += consototale;
        } else if (filiere === 'Gaz') {
          acc[annee].consoGaz += consototale;
        }
        return acc;
      }, {});

      const yearsAvailable = Object.keys(resultTotal);
      const electriciteSerie = [];
      const gazSerie = [];

      yearsAvailable.forEach((year) => {
        electriciteSerie.push(Math.round(resultTotal[year].consoElectrique));
        gazSerie.push(Math.round(resultTotal[year].consoGaz));
      });

      const optionsChartConsoElecGaz = {
        chart: {
          type: 'column'
        },
        title: {
          text: "Consommation d'électricité et de gaz (2011 à 2021)",
          align: 'center'
        },
        xAxis: {
          categories: yearsAvailable,
          crosshair: true,
          accessibility: {
            description: 'Years'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Somme Consommation total (MWh)'
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Electricite',
            data: electriciteSerie
          },
          {
            name: 'Gaz',
            data: gazSerie
          }
        ]
      };
      chartOptionsConsoElecGaz.value = optionsChartConsoElecGaz;
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };
  /**
   * - Compute data  to display ECO2mix_daily
   * @returns {Object}
   */
  const getECO2mixRealTimeData = async () => {
    let todayDate = DateTime.now();
    let year = todayDate.c.year;
    let month = todayDate.c.month;
    let day = todayDate.c.day;

    const result = fetchECO2();

    return 'getECO2mixRealTimeData';
  };

  async function fetchConsoGazElecTotal() {
    try {
      /* URL  à mettre .env */
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      return false;
    }
  }

  async function fetchECO2(date) {
    /* %3A%222024%2F04%2F01%22 */

    const URL = BASE_ODRE_URL + ECO2_MIX_NATIONAL_DATASET_PER_DAY + '%3A';
    /*     const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`An error has occured: ${response.status})`);
        } */
    const result = 'ok';
    /* await response.json();
     */ return result;
  }
  /******END METHODS******/

  return { getConsoElecGaz, getECO2mixRealTimeData, chartOptionsConsoElecGaz };
});
