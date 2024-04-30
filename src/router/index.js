import { createRouter, createWebHistory } from 'vue-router';
import EcoMixView from '@/views/EcoMixView.vue';
import FrenchMap from '@/views/FrenchMap.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Eco2Mix',
      component: EcoMixView,
    },
    {
      path: '/national-map',
      name: 'nationalMap',
      component: FrenchMap,
    },
  ],
});

export default router;
