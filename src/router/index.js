import { createRouter, createWebHistory } from 'vue-router';
import FrenchMap from '@/views/FrenchMap.vue';
import HomeView from '../views/HomeView.vue';
import EcoMixView from '@/views/EcoMixView.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    /*    {
         path: '/',
         name: 'Home',
         component: HomeView
       }, */
    {
      path: '/',
      name: 'Eco2Mix',
      component: EcoMixView
    },
    {
      path: '/frenchMap',
      name: 'FrenchMap',
      component: FrenchMap
    }
  ]
});

export default router;
