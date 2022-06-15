import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { PageName } from '../../common/constants';
import MainLayoutVue from '../../layouts/MainLayout.vue';
import HomePageVue from '../../pages/home/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayoutVue,
    children: [
      {
        path: '/',
        name: PageName.HOME_PAGE,
        component: HomePageVue,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
