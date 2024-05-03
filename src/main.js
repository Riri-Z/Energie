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

Maps(Highcharts);
exporting(Highcharts);
accessibility(Highcharts);
const app = createApp(App);
app.use(router);
app.use(HighchartsVue);
app.use(createPinia());
app.mount('#app');
