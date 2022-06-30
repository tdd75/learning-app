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
        path: '/home',
        redirect: '/',
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
        path: '/grammar/learn/:id',
        name: PageName.GRAMMAR_LEARN_PAGE,
        component: GrammarLearnPage,
        meta: {
          title: i18n.global.t('app.title.grammarLearn'),
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
    },
  },
  {
    path: '/vocabulary/test/:id',
    name: PageName.VOCABULARY_TEST_PAGE,
    component: VocabularyTestPage,
    meta: {
      title: i18n.global.t('app.title.vocabularyTest'),
    },
  },
  {
    path: '/grammar/test/:id',
    name: PageName.GRAMMAR_TEST_PAGE,
    component: GrammarLearnPage,
    meta: {
      title: i18n.global.t('app.title.grammarLearn'),
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
