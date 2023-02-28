import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

interface LazyModule<T = unknown> {
  default: T
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/scan',
    name: 'scan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: (): Promise<LazyModule> => import(/* webpackChunkName: "scan" */ '../views/ScanView.vue'),
  },
  {
    path: '/results',
    name: 'results',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: (): Promise<LazyModule> => import(/* webpackChunkName: "scan" */ '../views/ResultsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
