import { defineStore } from 'pinia';
import { ref } from 'vue';

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

  return { getConsoElecGaz, chartOptionsConsoElecGaz };
});
