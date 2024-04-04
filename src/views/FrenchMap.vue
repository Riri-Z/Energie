<!--The page provides an overview of mix-energie consumption on the map of France. -->

<script setup>
import frenchMap from '@highcharts/map-collection/countries/fr/fr-all.topo.json';
const chartOption = {
  chart: {
    map: frenchMap
  },
  title: {
    text: 'Highmaps basic demo'
  },
  subtitle: {
    text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>'
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      alignTo: 'spacingBox'
    }
  },
  colorAxis: {
    min: 0
  },
  series: [
    {
      name: 'Random data',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      allAreas: false,
      data: [
        ['fr-cor', 10],
        ['fr-bre', 11],
        ['fr-pdl', 12],
        ['fr-pac', 13],
        ['fr-occ', 14],
        ['fr-naq', 15],
        ['fr-bfc', 16],
        ['fr-cvl', 17],
        ['fr-idf', 18],
        ['fr-hdf', 19],
        ['fr-ara', 20],
        ['fr-ges', 21],
        ['fr-nor', 22],
        ['fr-lre', 23],
        ['fr-may', 24],
        ['fr-gf', 25],
        ['fr-mq', 26],
        ['fr-gua', 27]
      ]
    }
  ]
};
</script>

<template>
  <div>
    <h1>Overview french map</h1>
    <highcharts
      :constructorType="`mapChart`"
      class="hc"
      :options="chartOption"
      ref="chart"
    ></highcharts>
  </div>
</template>

<style></style>
