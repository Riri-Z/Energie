<script setup>
import Highcharts from 'highcharts';
import Maps from 'highcharts/modules/map';
import exporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';
import { Chart } from 'highcharts-vue';

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

// data to display
const props = defineProps({
  chartOptions: Object,
  constructorType: String,
});
</script>

<template>
  <div class="chart-container">
    <Chart
      v-if="props.chartOptions"
      :constructorType="props.constructorType"
      :options="props.chartOptions"
    ></Chart>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  margin: 0.5rem;
}
@media only screen and (max-width: $screen-sm) {
  .chart-container {
    width: 90%;
  }
}

@media only screen and (max-width: $screen-dp) {
  .chart-container {
    width: 100%;
  }
}
</style>
