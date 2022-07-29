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
        name: isLoginPage ? PageName.REGISTER_PAGE : PageName.LOGIN_PAGE
      }">
        <el-button type="primary" class="button-redirect">
          {{ t(`auth.header.${isLoginPage ? 'register' : 'login'}`) }}
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { PageName } from '../../../common/constants';

const { t } = useI18n();
const props = defineProps({
  isLoginPage: {
    type: Boolean,
    required: true,
  }
})
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

.button-redirect {
  color: $color-white;
  background-color: $color-primary;
}
</style>