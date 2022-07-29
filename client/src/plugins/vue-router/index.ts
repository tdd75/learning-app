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
import VocabularyLearnPage from '@/pages/vocabulary-learn/VocabularyLearnPage.vue';
import VocabularyTestPage from '@/pages/vocabulary-test/VocabularyTestPage.vue';
import GrammarPage from '@/pages/grammar/GrammarPage.vue';
import GrammarLearnPage from '@/pages/grammar-learn/GrammarLearnPage.vue';
import GrammarProgressPage from '@/pages/grammar-progress/GrammarProgressPage.vue';
import DialoguePage from '@/pages/dialogue/DialoguePage.vue';
import GrammarTestPage from '../../pages/grarmmar-test/GrammarTestPage.vue';

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
        path: '/home',
        redirect: '/',
      },
      {
        path: '/vocabulary',
        name: PageName.VOCABULARY_PAGE,
        component: VocabularyPage,
        meta: {
          title: i18n.global.t('app.title.vocabulary'),
          requiresAuth: true,
        },
      },
      {
        path: '/grammar',
        name: PageName.GRAMMAR_PAGE,
        component: GrammarPage,
        meta: {
          title: i18n.global.t('app.title.grammar'),
          requiresAuth: true,
        },
      },
      {
        path: '/grammar-progress',
        name: PageName.GRAMMAR_PROGRESS_PAGE,
        component: GrammarProgressPage,
        meta: {
          title: i18n.global.t('app.title.grammarProgress'),
          requiresAuth: true,
        },
      },
      {
        path: '/grammar/learn/:id',
        name: PageName.GRAMMAR_LEARN_PAGE,
        component: GrammarLearnPage,
        meta: {
          title: i18n.global.t('app.title.grammarLearn'),
          requiresAuth: true,
        },
      },
      // {
      //   path: '/dialogue',
      //   name: PageName.DIALOGUE_PAGE,
      //   component: DialoguePage,
      //   meta: {
      //     title: i18n.global.t('app.title.dialogue'),
      //   },
      // },
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
  {
    path: '/vocabulary/learn/:id',
    name: PageName.VOCABULARY_LEARN_PAGE,
    component: VocabularyLearnPage,
    meta: {
      title: i18n.global.t('app.title.vocabularyLearn'),
      requiresAuth: true,
    },
  },
  {
    path: '/vocabulary/test/:id',
    name: PageName.VOCABULARY_TEST_PAGE,
    component: VocabularyTestPage,
    meta: {
      title: i18n.global.t('app.title.vocabularyTest'),
      requiresAuth: true,
    },
  },
  {
    path: '/grammar/test/:topic',
    name: PageName.GRAMMAR_TEST_PAGE,
    component: GrammarTestPage,
    meta: {
      title: i18n.global.t('app.title.grammarTest'),
      requiresAuth: true,
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
    const loggedIn = localStorage.getItem('token');
    if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
      next('/login');
    }
    next();
  },
);

export default router;
