import '@/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import Highcharts from 'highcharts';
import Maps from 'highcharts/modules/map';
import exporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';

Highcharts.setOptions({
  lang: {
    months: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    printChart: 'Imprimer',
    viewFullscreen: 'Afficher en plein écran',
    downloadPNG: 'Télécharger au format PNG',
    downloadJPEG: 'Télécharger au format JPEG',
    downloadPDF: 'Télécharger au format PDF',
    downloadSVG: 'Télécharger au format SVG',
  },
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: true,
          halo: {
            size: 0,
          },
        },
      },
    },
  },
});

Maps(Highcharts);
exporting(Highcharts);
accessibility(Highcharts);
const app = createApp(App);
app.use(router);
app.use(HighchartsVue);
app.use(createPinia());
app.mount('#app');
