import { createRouter, createWebHistory } from 'vue-router';
import FrenchMap from '@/views/FrenchMap.vue';
import EcoMixView from '@/views/EcoMixView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Eco2Mix',
      component: EcoMixView,
    },
    {
      path: '/frenchMap',
      name: 'FrenchMap',
      component: FrenchMap,
    },
  ],
});

export default router;
