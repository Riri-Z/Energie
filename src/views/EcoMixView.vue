<template>
  <div class="eco-mix-view-content">
    <h1 class="eco-mix-view-content-mix-energie-title">Données éCO2mix nationales temps réel</h1>
    <p class="eco-mix-view-content-mix-energie-description">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>
    <section>
      <div class="eco-mix-view-content-selection-periode">
        <div class="eco-mix-view-content-selection-periode-start">
          <p>Début</p>
          <Datepicker v-model="dateStart" :upper-limit="limitDateStart" />
        </div>
        <div class="eco-mix-view-content-selection-periode-end">
          <p>Fin</p>
          <Datepicker v-model="dateEnd" :upper-limit="limitDateEnd" />
        </div>
      </div>
      <button @click="updateChart">FETCH</button>
    </section>

    <section class="chart">
      <ChartComponent :chartOptions="fake_data" />
    </section>
  </div>
</template>

<script setup>
import Datepicker from 'vue3-datepicker';
import ChartComponent from '@/components/ChartComponent.vue';
import { ref, watch } from 'vue';
import { useEco2mixStore } from '@/stores/eco2mixStore';

const eco2MixStore = useEco2mixStore();
const dateStart = ref(eco2MixStore.dateStart);
const dateEnd = ref(eco2MixStore.dateEnd);
const limitDateStart = ref(eco2MixStore.limitDateStart);
const limitDateEnd = ref(eco2MixStore.limitDateEnd);

/*
TODO :
  - selection de la période
  - Fetch de l'api pour récupérer les data à afficher en fonction de la période
  - afficher le composant chart pour visualiser les data
*/
const updateChart = () => {
  eco2MixStore.getECO2mixRealTimeData();
};

// Fonction à appeler lorsque dateEnd change
const ondateEndChange = () => {
  console.log('La valeur de dateEnd a changé :', dateEnd);
  return eco2MixStore.selectdateEnd(dateEnd);
};
const ondateStartChange = () => {
  console.log('La valeur de dateEnd a changé :', dateStart);
  return eco2MixStore.selectdateStart(dateStart);
};

watch(dateEnd, () => {
  ondateEndChange();
});
watch(dateStart, () => {
  ondateStartChange();
});
const fake_data = {
  chart: {
    type: 'area'
  },
  title: {
    text: 'Production, consumption and trade surplus of electrical power',
    align: 'left'
  },
  subtitle: {
    text:
      'Source: <a ' +
      'href="https://www.ssb.no/energi-og-industri/energi/statistikk/elektrisitet/artikler/lavere-kraftproduksjon"' +
      ' target="_blank">SSB</a>',
    align: 'left'
  },
  xAxis: {
    categories: [
      'Q1 2019',
      'Q2 2019',
      'Q3 2019',
      'Q4 2019',
      'Q1 2020',
      'Q2 2020',
      'Q3 2020',
      'Q4 2020',
      'Q1 2021',
      'Q2 2021',
      'Q3 2021'
    ]
  },
  yAxis: {
    title: {
      text: 'TWh'
    }
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: 'Total production',
      data: [37.8, 29.3, 30.8, 36.8, 40.5, 35.3, 34.9, 43.6, 45.7, 35.9, 32.7]
    },
    {
      name: 'Gross consumption',
      data: [39.9, 29.9, 26.7, 38.1, 39.3, 30.2, 27.5, 36.7, 42.7, 31.4, 27.5]
    },
    {
      name: 'Trade surplus',
      data: [-2.2, -0.6, 4.1, -1.3, 1.2, 5.1, 7.4, 6.9, 2.9, 4.5, 5.2]
    }
  ]
};
</script>

<style lang="scss" scoped>
.eco-mix-view-content {
  &-selection-periode {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
}
</style>
