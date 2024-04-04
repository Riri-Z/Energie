import { createRouter, createWebHistory } from 'vue-router';
import FrenchMap from '@/views/FrenchMap.vue';
import ChartsView from '../views/ChartsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ChartsView
    },
    {
      path: '/frenchMap',
      name: 'FrenchMap',
      component: FrenchMap
    }
  ]
});

export default router;
