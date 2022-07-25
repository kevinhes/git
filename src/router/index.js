import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/forntview/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import(/* webpackChunkName: "about" */ '../views/forntview/Index.vue'),
      },
    ],
  },
  {
    path: '/loginpage',
    component: () => import('../views/backstage/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
