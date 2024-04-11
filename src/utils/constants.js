// A REVOIR LES URLS  EN FONCTION DES CHARTS SOUHAITES
export const BASE_ODRE_URL = 'https://odre.opendatasoft.com';
export const FILTERED_API_URL =
  'https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/eco2mix-national-tr/records?limit=100&refine=date_heure%3A%222023%22';
export const TOTAL_COUNT_API_URL =
  'https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/eco2mix-national-tr/records?limit=1&refine=date_heure%3A%222023%22';
export const ECO2_MIX_NATIONAL_DATASET = 'eco2mix-national-tr/';
export const ECO2_MIX_NATIONAL_DATASET_PER_DAY =
  '/api/explore/v2.1/catalog/datasets/eco2mix-national-tr/records?select=consommation%2Cfioul%2Cgaz%2Cnucleaire%2Ceolien%2Chydraulique%2Cbioenergies%2Ctaux_co2&limit=100&refine=date_heure';
export const DATA_LIMIT = 100;
export const SELECT_FIELDS =
  'records?select=fioul%2C%20charbon%2Cgaz%2Cnucleaire%2Cdate%2Cconsommation';

/* Limite database for now */
export const LIMIT_DATE_DATA = 'April 08, 2024 23:59:59';
