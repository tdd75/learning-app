import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { PageName } from '../../common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import HomePage from '@/pages/home/HomePage.vue';
import AuthPage from '@/pages/auth/AuthPage.vue';

import i18n from '@/plugins/vue-i18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    meta: {
      title: i18n.global.t('app.title'),
    },
    children: [
      {
        path: '/',
        name: PageName.HOME_PAGE,
        component: HomePage,
      },
    ],
  },
  {
    path: '/login',
    name: PageName.LOGIN_PAGE,
    component: AuthPage,
  },
  {
    path: '/register',
    name: PageName.REGISTER_PAGE,
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
