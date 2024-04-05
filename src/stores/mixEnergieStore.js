import { defineStore } from 'pinia';
import consoElecGaz from '@/utils/conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-region.json';

export const useMixEnergieStore = defineStore('mixEnergie', () => {
  /******PROPERTIES******/
  /******END PROPERTIES******/

  /******COMPUTED******/
  /******END COMPUTED******/

  /******METHODS******/
  /**
   * - Compute data from 'conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-region.json' to send configuration to display elec & gaz consumptions between 2011 - 2021
   * - unity is MWH
   * - TODO : Transfer data to an API and then retrieve it from the API.
   * @returns {Object}
   */
  const getConsoElecGaz = () => {
    const data = consoElecGaz.data;

    const resultTotal = {};
    const electriciteSerie = [];
    const gazSerie = [];

    data.forEach((element) => {
      const year = element.annee;
      const sector = element.filiere;
      const consumption = element.consototale;

      if (!resultTotal[year]) {
        resultTotal[year] = { consoElectrique: 0, consoGaz: 0 };
      }
      if (sector === 'Electricite') {
        resultTotal[year].consoElectrique += consumption;
      } else if (sector === 'Gaz') {
        resultTotal[year].consoGaz += consumption;
      }
    });
    const yearsAvailable = Object.keys(resultTotal);

    for (const result in resultTotal) {
      const consoGaz = resultTotal[result].consoGaz;
      gazSerie.push(Math.round(consoGaz));
      const consoElectrique = resultTotal[result].consoElectrique;
      electriciteSerie.push(Math.round(consoElectrique));
    }

    const optionsChartConsoElecGaz = {
      chart: {
        type: 'column'
      },
      title: {
        text: "Consommation d'électricité et de gaz de 2011 à 2021 ",
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
    return { resultTotal, optionsChartConsoElecGaz };
  };

  /******END METHODS******/

  return { getConsoElecGaz };
});
