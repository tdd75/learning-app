<template>
  <el-card class="login-card" :body-style="{ padding: '50px' }">
    <div class="login-card__content d-flex flex-column align-items-center">
      <div class="login-card__logo d-flex justify-content-center">
        <img src="@/assets/images/logo/logo_no_bgr.png">
      </div>
      <el-input class="input-email" :prefix-icon="IconUser" :placeholder="`${t('auth.login.placeholder.email')}`">
      </el-input>
      <el-input class="input-password" :prefix-icon="IconLock" :placeholder="`${t('auth.login.placeholder.password')}`">
      </el-input>
      <div class="forgot-password">
        {{ t('auth.login.forgotPassword') }}
      </div>
      <el-button class="button-submit">
        {{ t('auth.login.submit') }}
      </el-button>
      <div class="d-flex justify-content-center">
        <span>
          {{ t('auth.login.register.noAccount') }}
          <router-link :to="{
            name: PageName.REGISTER_PAGE
          }">
            {{ t('auth.login.register.redirect') }}
          </router-link>
        </span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { User as IconUser } from '@element-plus/icons-vue';
import { Lock as IconLock } from '@element-plus/icons-vue';
import { PageName } from '../../../common/constants';

const { t } = useI18n();

</script>

<style lang="scss" scoped>
.login-card {
  display: block;
  margin: 10vh auto;
  width: 450px;
  height: 500px;

  &__logo {
    margin-bottom: 30px;

    img {
      width: 150px;
      height: auto;
    }
  }
}

.el-input {
  margin-bottom: 20px;
  width: 320px;
  height: 40px;
}

.button-submit {
  font-size: 18px;
  margin-bottom: 12px;
}

.forgot-password {
  margin-bottom: 10px;
  text-decoration: underline;
  color: $color-primary;
  cursor: pointer;
}
</style>