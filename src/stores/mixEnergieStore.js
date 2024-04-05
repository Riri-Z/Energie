import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { TOTAL_COUNT_API_URL, FILTERED_API_URL, DATA_LIMIT } from '@/utils/constants';
import conso_elec_gaz from '@/utils/conso-elec-gaz-annuelle-par-secteur-dactivite-agregee-region.json';

export const useMixEnergieStore = defineStore('mixEnergie', () => {
  /* PROPERTIES */
  let mixEnergyData = ref([]);
  let nbrResult = ref(null);
  /* END PROPERTIES */

  /* COMPUTED */
  /* END COMPUTED */

  /* METHODS */
  const getAllAvailableMixEnergyData = async () => {
    await getTotalCount();

    if (typeof nbrResult.value === 'number') {
      console.log('called');
      /*

A REVOIR PAR RAPPORT AUX URLS

      do {
        try {
          const response = await fetch(FILTERED_API_URL);
          if (response.status !== 200 || !response.ok) {
            return console.error('Response error is :', response);
          }

          response
            .json()
            .then((res) => {
              mixEnergyData.value = [...mixEnergyData.value, res.results];
            })
            .catch((err) => console.error(err));
        } catch (error) {
          console.error('Something failed while fetching data', error);
        }
      } while (mixEnergyData.value.length < nbrResult.value);
 */
      /* for (
        let index = mixEnergyData.value.length;
        index < nbrResult.value.length;
        index = index + mixEnergyData.value.length
      ) {
        try {
          const response = await fetch(FILTERED_API_URL);
          if (response.status !== 200 || !response.ok) {
            return console.error('Response error is :', response);
          }

          response
            .json()
            .then((res) => {
              mixEnergyData.value = [...mixEnergyData.value, res.results];
            })
            .catch((err) => console.error(err));
        } catch (error) {
          console.error('Something failed while fetching data', error);
        }
      } */
    }
  };

  const getTotalCount = async () => {
    try {
      const response = await fetch(TOTAL_COUNT_API_URL);
      console.log('response', response);
      if (response.status !== 200 || !response.ok) {
        return console.error('Response error is :', response);
      }
      const result = await response.json();
      nbrResult.value = result.total_count;
      console.log('nbrResult.value', nbrResult.value);
    } catch (error) {
      console.error('Something failed while fetching data', error);
    }
  };

  const getConsoElecGaz = () => {
    console.log('called!!!!');
    return formatConsoElecGaz(conso_elec_gaz.data);
  };

  const formatConsoElecGaz = (data) => {
    /* unité MW */

    let resultTotal = {};

    let yearsAvailable = [];
    let electriciteSerie = [];
    let gazSerie = [];
    data.forEach((element) => {
      const annee = element.annee;
      const filiere = element.filiere;
      const consommation = element.consototale;
      if (!yearsAvailable.includes(annee)) {
        yearsAvailable.push(annee);
      }
      if (!resultTotal[annee]) {
        resultTotal[annee] = { consoElectrique: 0, consoGaz: 0 };
      }
      if (filiere === 'Electricite') {
        resultTotal[annee].consoElectrique += consommation;
        electriciteSerie.push(Math.round(consommation));
      } else if (filiere === 'Gaz') {
        resultTotal[annee].consoGaz += consommation;
        gazSerie.push(Math.round(consommation));
      }
    });


    let optionsChartConsoElecGaz = {
      chart: {
        type: 'series'
      },
      title: {
        text: "Consommation d'electricité et de gaz ",
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
          text: 'MGW'
        }
      },
      tooltip: {
        valueSuffix: 'MGW'
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
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
        },
      ]
    };
    return { resultTotal, optionsChartConsoElecGaz };
  };
  /* END METHODS */

  return { mixEnergyData, nbrResult, getAllAvailableMixEnergyData, getConsoElecGaz };
});

/*
Exemple retour API sans options :
{
    "total_count": 64896,
    "results": [
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-12",
            "heure": "18:15",
            "date_heure": "2023-09-12T16:15:00+00:00",
            "consommation": 47083,
            "prevision_j1": 47750,
            "prevision_j": 47800,
            "fioul": 598,
            "charbon": 11,
            "gaz": 3877,
            "nucleaire": 38253,
            "eolien": 1825,
            "eolien_terrestre": "1586",
            "eolien_offshore": "239",
            "solaire": 2483,
            "hydraulique": 5950,
            "pompage": 0,
            "bioenergies": 844,
            "ech_physiques": -6753,
            "taux_co2": 47,
            "ech_comm_angleterre": null,
            "ech_comm_espagne": null,
            "ech_comm_italie": null,
            "ech_comm_suisse": null,
            "ech_comm_allemagne_belgique": null,
            "fioul_tac": 485,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 411,
            "gaz_cogen": 326,
            "gaz_ccg": 3141,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2992,
            "hydraulique_lacs": 1467,
            "hydraulique_step_turbinage": 1492,
            "bioenergies_dechets": 78,
            "bioenergies_biomasse": 516,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-7",
            "destockage_batterie": "2"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-12",
            "heure": "19:00",
            "date_heure": "2023-09-12T17:00:00+00:00",
            "consommation": 48512,
            "prevision_j1": 48300,
            "prevision_j": 48700,
            "fioul": 746,
            "charbon": 11,
            "gaz": 4359,
            "nucleaire": 38506,
            "eolien": 1586,
            "eolien_terrestre": "1397",
            "eolien_offshore": "189",
            "solaire": 1160,
            "hydraulique": 6947,
            "pompage": -29,
            "bioenergies": 830,
            "ech_physiques": -5594,
            "taux_co2": 53,
            "ech_comm_angleterre": "505",
            "ech_comm_espagne": 1075,
            "ech_comm_italie": -1544,
            "ech_comm_suisse": -1106,
            "ech_comm_allemagne_belgique": "-1976",
            "fioul_tac": 633,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 525,
            "gaz_cogen": 325,
            "gaz_ccg": 3510,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 3175,
            "hydraulique_lacs": 1619,
            "hydraulique_step_turbinage": 2153,
            "bioenergies_dechets": 64,
            "bioenergies_biomasse": 516,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-14",
            "destockage_batterie": "4"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-12",
            "heure": "20:00",
            "date_heure": "2023-09-12T18:00:00+00:00",
            "consommation": 47656,
            "prevision_j1": 47000,
            "prevision_j": 47300,
            "fioul": 526,
            "charbon": 11,
            "gaz": 3282,
            "nucleaire": 38865,
            "eolien": 1410,
            "eolien_terrestre": "1240",
            "eolien_offshore": "170",
            "solaire": 282,
            "hydraulique": 5850,
            "pompage": -58,
            "bioenergies": 831,
            "ech_physiques": -3338,
            "taux_co2": 44,
            "ech_comm_angleterre": "910",
            "ech_comm_espagne": 585,
            "ech_comm_italie": -1544,
            "ech_comm_suisse": -905,
            "ech_comm_allemagne_belgique": "-3349",
            "fioul_tac": 413,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 232,
            "gaz_cogen": 307,
            "gaz_ccg": 2743,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 3137,
            "hydraulique_lacs": 1469,
            "hydraulique_step_turbinage": 1244,
            "bioenergies_dechets": 62,
            "bioenergies_biomasse": 519,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-8",
            "destockage_batterie": "2"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-12",
            "heure": "21:30",
            "date_heure": "2023-09-12T19:30:00+00:00",
            "consommation": 44680,
            "prevision_j1": 44800,
            "prevision_j": 45000,
            "fioul": 522,
            "charbon": 11,
            "gaz": 2912,
            "nucleaire": 39498,
            "eolien": 1351,
            "eolien_terrestre": "1105",
            "eolien_offshore": "245",
            "solaire": 0,
            "hydraulique": 4365,
            "pompage": 0,
            "bioenergies": 835,
            "ech_physiques": -4804,
            "taux_co2": 42,
            "ech_comm_angleterre": "855",
            "ech_comm_espagne": -1204,
            "ech_comm_italie": -1086,
            "ech_comm_suisse": -752,
            "ech_comm_allemagne_belgique": "-2191",
            "fioul_tac": 409,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 238,
            "gaz_cogen": 291,
            "gaz_ccg": 2384,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2894,
            "hydraulique_lacs": 1224,
            "hydraulique_step_turbinage": 247,
            "bioenergies_dechets": 66,
            "bioenergies_biomasse": 518,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-12",
            "destockage_batterie": "3"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-12",
            "heure": "23:15",
            "date_heure": "2023-09-12T21:15:00+00:00",
            "consommation": 43841,
            "prevision_j1": 45100,
            "prevision_j": 45200,
            "fioul": 771,
            "charbon": 11,
            "gaz": 2745,
            "nucleaire": 38930,
            "eolien": 1797,
            "eolien_terrestre": "1451",
            "eolien_offshore": "345",
            "solaire": 0,
            "hydraulique": 5022,
            "pompage": -2,
            "bioenergies": 851,
            "ech_physiques": -6283,
            "taux_co2": 44,
            "ech_comm_angleterre": null,
            "ech_comm_espagne": null,
            "ech_comm_italie": null,
            "ech_comm_suisse": null,
            "ech_comm_allemagne_belgique": null,
            "fioul_tac": 658,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 347,
            "gaz_cogen": 278,
            "gaz_ccg": 2120,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2904,
            "hydraulique_lacs": 1413,
            "hydraulique_step_turbinage": 705,
            "bioenergies_dechets": 85,
            "bioenergies_biomasse": 515,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-2",
            "destockage_batterie": "1"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-13",
            "heure": "01:15",
            "date_heure": "2023-09-12T23:15:00+00:00",
            "consommation": 38476,
            "prevision_j1": 38750,
            "prevision_j": 38650,
            "fioul": 114,
            "charbon": 11,
            "gaz": 2609,
            "nucleaire": 39274,
            "eolien": 1666,
            "eolien_terrestre": "1459",
            "eolien_offshore": "207",
            "solaire": 0,
            "hydraulique": 4402,
            "pompage": -2,
            "bioenergies": 856,
            "ech_physiques": -10456,
            "taux_co2": 33,
            "ech_comm_angleterre": null,
            "ech_comm_espagne": null,
            "ech_comm_italie": null,
            "ech_comm_suisse": null,
            "ech_comm_allemagne_belgique": null,
            "fioul_tac": 1,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 127,
            "gaz_cogen": 278,
            "gaz_ccg": 2204,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2673,
            "hydraulique_lacs": 899,
            "hydraulique_step_turbinage": 831,
            "bioenergies_dechets": 87,
            "bioenergies_biomasse": 519,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-1",
            "destockage_batterie": "2"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-13",
            "heure": "02:15",
            "date_heure": "2023-09-13T00:15:00+00:00",
            "consommation": 37865,
            "prevision_j1": 37650,
            "prevision_j": 37850,
            "fioul": 113,
            "charbon": 11,
            "gaz": 2540,
            "nucleaire": 39244,
            "eolien": 1526,
            "eolien_terrestre": "1368",
            "eolien_offshore": "158",
            "solaire": 0,
            "hydraulique": 3458,
            "pompage": -4,
            "bioenergies": 855,
            "ech_physiques": -9876,
            "taux_co2": 34,
            "ech_comm_angleterre": null,
            "ech_comm_espagne": null,
            "ech_comm_italie": null,
            "ech_comm_suisse": null,
            "ech_comm_allemagne_belgique": null,
            "fioul_tac": 0,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 144,
            "gaz_cogen": 279,
            "gaz_ccg": 2117,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2575,
            "hydraulique_lacs": 474,
            "hydraulique_step_turbinage": 409,
            "bioenergies_dechets": 86,
            "bioenergies_biomasse": 518,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-7",
            "destockage_batterie": "4"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-13",
            "heure": "04:15",
            "date_heure": "2023-09-13T02:15:00+00:00",
            "consommation": 34764,
            "prevision_j1": 34400,
            "prevision_j": 34850,
            "fioul": 114,
            "charbon": 11,
            "gaz": 2813,
            "nucleaire": 39121,
            "eolien": 1520,
            "eolien_terrestre": "1441",
            "eolien_offshore": "79",
            "solaire": 0,
            "hydraulique": 2833,
            "pompage": -879,
            "bioenergies": 860,
            "ech_physiques": -11624,
            "taux_co2": 36,
            "ech_comm_angleterre": null,
            "ech_comm_espagne": null,
            "ech_comm_italie": null,
            "ech_comm_suisse": null,
            "ech_comm_allemagne_belgique": null,
            "fioul_tac": 1,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 124,
            "gaz_cogen": 277,
            "gaz_ccg": 2412,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2367,
            "hydraulique_lacs": 230,
            "hydraulique_step_turbinage": 236,
            "bioenergies_dechets": 91,
            "bioenergies_biomasse": 519,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-6",
            "destockage_batterie": "1"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-13",
            "heure": "06:45",
            "date_heure": "2023-09-13T04:45:00+00:00",
            "consommation": 41382,
            "prevision_j1": 41050,
            "prevision_j": 41500,
            "fioul": 114,
            "charbon": 11,
            "gaz": 3795,
            "nucleaire": 39489,
            "eolien": 1377,
            "eolien_terrestre": "1269",
            "eolien_offshore": "107",
            "solaire": 0,
            "hydraulique": 3832,
            "pompage": -1,
            "bioenergies": 840,
            "ech_physiques": -8076,
            "taux_co2": 43,
            "ech_comm_angleterre": null,
            "ech_comm_espagne": null,
            "ech_comm_italie": null,
            "ech_comm_suisse": null,
            "ech_comm_allemagne_belgique": null,
            "fioul_tac": 1,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 0,
            "gaz_cogen": 285,
            "gaz_ccg": 3511,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2684,
            "hydraulique_lacs": 800,
            "hydraulique_step_turbinage": 348,
            "bioenergies_dechets": 70,
            "bioenergies_biomasse": 519,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-3",
            "destockage_batterie": "5"
        },
        {
            "perimetre": "France",
            "nature": "Données temps réel",
            "date": "2023-09-13",
            "heure": "08:00",
            "date_heure": "2023-09-13T06:00:00+00:00",
            "consommation": 45123,
            "prevision_j1": 44600,
            "prevision_j": 45300,
            "fioul": 114,
            "charbon": 11,
            "gaz": 3957,
            "nucleaire": 39503,
            "eolien": 1336,
            "eolien_terrestre": "1209",
            "eolien_offshore": "128",
            "solaire": 363,
            "hydraulique": 5310,
            "pompage": -59,
            "bioenergies": 832,
            "ech_physiques": -6239,
            "taux_co2": 43,
            "ech_comm_angleterre": "-704",
            "ech_comm_espagne": 1800,
            "ech_comm_italie": -1544,
            "ech_comm_suisse": -2041,
            "ech_comm_allemagne_belgique": "-3151",
            "fioul_tac": 1,
            "fioul_cogen": 113,
            "fioul_autres": 0,
            "gaz_tac": 0,
            "gaz_cogen": 307,
            "gaz_ccg": 3651,
            "gaz_autres": 0,
            "hydraulique_fil_eau_eclusee": 2872,
            "hydraulique_lacs": 1029,
            "hydraulique_step_turbinage": 1409,
            "bioenergies_dechets": 71,
            "bioenergies_biomasse": 511,
            "bioenergies_biogaz": 250,
            "stockage_batterie": "-13",
            "destockage_batterie": "7"
        }
    ]
}

*/
