<template>
  <el-card class="register-card" :body-style="{ padding: '50px' }">
    <div class="register-card__content d-flex flex-column align-items-center">

      <div class="register-card__logo d-flex justify-content-center">
        <img src="@/assets/images/logo/logo_no_bgr.png">
      </div>

      <div class="register-form d-flex flex-column align-items-center">
        <el-input class="input-email" v-model="email" type="email" :prefix-icon="IconUser"
          :placeholder="`${t('auth.register.placeholder.email')}`" @keydown.enter="submitRegister">
        </el-input>
        <el-input class="input-password" v-model="password" type="password" :prefix-icon="IconLock"
          :placeholder="`${t('auth.register.placeholder.password')}`" @keydown.enter="submitRegister">
        </el-input>
      </div>

      <div class="error-message" v-if="errorMessage.trim() !== ''">{{ errorMessage }}</div>

      <el-button type="primary" class="button-submit" @click="submitRegister">
        {{ t('auth.register.submit') }}
      </el-button>

      <div class="have-account">
        {{ t('auth.register.register.haveAccount') }}
        <router-link :to="{
          name: PageName.LOGIN_PAGE
        }">
          {{ t('auth.register.register.redirect') }}
        </router-link>
      </div>

    </div>
  </el-card>
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

const submitRegister = handleSubmit(async ({ email, password }) => {
  console.log(email, password);

  // const error = await store.register(email!, password!);

  // if (error) {
  //   errorMessage.value = error;
  // }

});

const { value: email } = useField('email');
const { value: password } = useField('password');


</script>

<style lang="scss" scoped>
.register-card {
  display: block;
  margin: 10vh auto;
  width: 450px;
  height: 450px;

  &__logo {
    margin-bottom: 30px;

    img {
      width: 150px;
      height: auto;
    }
  }
}

.register-form {
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
</style>