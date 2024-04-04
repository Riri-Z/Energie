import { createRouter, createWebHistory } from 'vue-router';
import FrenchMap from '@/views/FrenchMap.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/frenchMap',
      name: 'FrenchMap',
      component: FrenchMap
    }
  ]
});

export default router;
