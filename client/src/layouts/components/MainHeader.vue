<template>
  <div class="container-fluid">
    <div class="main-header container d-flex justify-content-between align-items-center">
      <div class="logo d-flex align-items-center">
        <router-link class="router-link" :to="{
          name: PageName.HOME_PAGE
        }">
          <img src="@/assets/images/logo/logo_no_bgr.png" />
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <div class="navigations d-flex">
          <div class="navigations__item" v-for="navigation in navigationList" :key="navigation.title">
            <router-link class="router-link" :to="navigation.to">
              {{ navigation.title }}
            </router-link>
          </div>
        </div>
        <div class="button-auth d-flex">
          <router-link class="router-link" :to="{
            name: PageName.LOGIN_PAGE
          }">
            <el-button class="button-login">
              {{ t('app.header.auth.login') }}
            </el-button>
          </router-link>
          <router-link class="router-link" :to="{
            name: PageName.REGISTER_PAGE
          }">
            <el-button class="button-register">
              {{ t('app.header.auth.register') }}
            </el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PageName } from '../../common/constants';

const { t } = useI18n()

const navigationList = [
  {
    title: t('app.header.navigations.home'),
    to: {
      name: PageName.HOME_PAGE
    }
  },
  {
    title: t('app.header.navigations.vocabulary'),
    to: {
      name: PageName.VOCABULARY_PAGE
    }
  },
  {
    title: t('app.header.navigations.grammar'),
    to: {
      name: PageName.GRAMMAR_PAGE
    }
  },
  {
    title: t('app.header.navigations.dialogue'),
    to: {
      name: PageName.DIALOGUE_PAGE
    }
  }
];
</script>

<style lang="scss" scoped>
.container-fluid {
  border-bottom: 2px solid $color-grey;
}

.main-header {
  height: fit-content;
  padding-top: 12px;
  padding-bottom: 12px;
}

.logo {
  width: fit-content;

  img {
    width: auto;
    height: 28px;
  }
}

.navigations {
  gap: 25px;
  margin-right: 40px;

  &__item {
    color: $color-dark-grey;
  }
}

.button-auth {
  gap: 10px;

  .button-login,
  .button-register {
    width: fit-content;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .button-login {
    color: $color-white;
    background-color: $color-primary;
  }

  .button-register {
    color: $color-primary;
    background-color: $color-grey;
  }
}

@media only screen and (max-width: map-get($grid-breakpoints, md)) {
  .navigations {
    display: none !important;
  }
}
</style>