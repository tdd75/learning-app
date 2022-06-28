import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

import { PageName } from '../../common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import HomePage from '@/pages/home/HomePage.vue';
import AuthPage from '@/pages/auth/AuthPage.vue';
import VocabularyPage from '@/pages/vocabulary/VocabularyPage.vue';
import GrammarPage from '@/pages/grammar/GrammarPage.vue';
import DialoguePage from '@/pages/dialogue/DialoguePage.vue';

import i18n from '@/plugins/vue-i18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: PageName.HOME_PAGE,
        component: HomePage,
        meta: {
          title: i18n.global.t('app.title.default'),
        },
      },
      {
        path: '/vocabulary',
        name: PageName.VOCABULARY_PAGE,
        component: VocabularyPage,
        meta: {
          title: i18n.global.t('app.title.vocabulary'),
        },
      },
      {
        path: '/grammar',
        name: PageName.GRAMMAR_PAGE,
        component: GrammarPage,
        meta: {
          title: i18n.global.t('app.title.grammar'),
        },
      },
      {
        path: '/dialogue',
        name: PageName.DIALOGUE_PAGE,
        component: DialoguePage,
        meta: {
          title: i18n.global.t('app.title.dialogue'),
        },
      },
    ],
  },
  {
    path: '/login',
    name: PageName.LOGIN_PAGE,
    component: AuthPage,
    meta: {
      title: i18n.global.t('app.title.login'),
    },
  },
  {
    path: '/register',
    name: PageName.REGISTER_PAGE,
    component: AuthPage,
    meta: {
      title: i18n.global.t('app.title.register'),
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    document.title = to.meta.title as string;
    next();
    return;
  },
);

export default router;
