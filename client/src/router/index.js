import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index.vue';
import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'index',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/AboutView.vue')
        },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      component: NotFound,
    },
  ]
})

export default router
