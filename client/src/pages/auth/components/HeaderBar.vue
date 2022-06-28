<template>
  <div class="header-bar container-fluid">
    <div class="header-bar__content container d-flex justify-content-between">
      <router-link class="button-back router-link" :to="{
        name: PageName.HOME_PAGE
      }">
        <img class="button-back__icon me-2 mb-1" src="@/assets/images/icons/previous.png">
        <span class="button-back__text">{{ t('auth.header.home') }}</span>
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
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PageName } from '../../../common/constants';

const { t } = useI18n();

</script>

<style lang="scss" scoped>
.header-bar {
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid $color-grey;
}

.button-back {
  &__icon {
    width: auto;
    height: 24px;
  }

  &__text {
    font-size: 18px;
    color: $color-primary;
  }
}

.button-register {
  color: $color-white;
  background-color: $color-primary;
}
</style>