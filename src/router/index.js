import { createRouter, createWebHistory } from 'vue-router';
import EcoMixView from '@/views/EcoMixView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Eco2Mix',
      component: EcoMixView,
    },
  ],
});

export default router;
