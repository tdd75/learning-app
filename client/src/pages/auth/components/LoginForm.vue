<template>
  <el-card class="login-card" :body-style="{ padding: '50px' }">
    <div class="login-card__content d-flex flex-column align-items-center">

      <div class="login-card__logo d-flex justify-content-center">
        <img src="@/assets/images/logo/logo_no_bgr.png">
      </div>

      <div class="login-form d-flex flex-column align-items-center">
        <el-input class="input-email" v-model="email" type="email" :prefix-icon="IconUser"
          :placeholder="t('auth.login.placeholder.email')" @keydown.enter="submitLogin">
        </el-input>
        <el-input class="input-password" v-model="password" type="password" :prefix-icon="IconLock"
          :placeholder="t('auth.login.placeholder.password')" @keydown.enter="submitLogin">
        </el-input>
      </div>

      <div class="error-message" v-if="errorMessage.trim() !== ''">{{ errorMessage }}</div>

      <div class="forgot-password" @click="store.$patch({
        isShowForgotPassword: true
      })">
        {{ t('auth.login.forgotPassword') }}
      </div>

      <el-button type="primary" class="button-submit" @click="submitLogin">
        {{ t('auth.login.submit') }}
      </el-button>

      <div class="no-account">
        {{ t('auth.login.register.noAccount') }}
        <router-link :to="{
          name: PageName.REGISTER_PAGE
        }" class="link">
          {{ t('auth.login.register.redirect') }}
        </router-link>
      </div>

    </div>
  </el-card>
  <ForgotPassword />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';


import { User as IconUser } from '@element-plus/icons-vue';
import { Lock as IconLock } from '@element-plus/icons-vue';
import { PageName } from '../../../common/constants';
import ForgotPassword from './ForgotPassword.vue';
import { useAuthStore } from '../store';

const router = useRouter();
const store = useAuthStore();
const { t } = useI18n();
const errorMessage = ref('');

const initialValues = {
  email: '',
  password: '',
};

const validations = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const { handleSubmit, errors } = useForm({
  validationSchema: validations,
  initialValues: initialValues,
});

const submitLogin = handleSubmit(async ({ email, password }) => {
  const error = await store.login(email!, password!);
  if (error) {
    errorMessage.value = error;
  } else {
    router.push({
      name: PageName.HOME_PAGE
    })
  }
});

const { value: email } = useField('email');
const { value: password } = useField('password');


</script>

<style lang="scss" scoped>
.login-card {
  display: block;
  margin: 15vh auto;
  width: 450px;
  height: fit-content;

  &__logo {
    margin-bottom: 30px;

    img {
      width: 150px;
      height: auto;
    }
  }
}

.login-form {
  gap: 16px;
  margin-bottom: 16px;

  .el-input {
    width: 320px;
    height: 40px;
  }
}

.button-submit {
  font-size: 18px;
  margin-bottom: 12px;
}

.forgot-password {
  margin-bottom: 10px;
  color: $color-primary;
  cursor: pointer;
}

.no-account {
  .link {
    color: $color-primary;
  }
}
</style>