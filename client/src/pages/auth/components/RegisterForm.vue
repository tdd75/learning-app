<template>
  <el-card class="register-card" :body-style="{ padding: '50px' }">
    <div class="register-card__content d-flex flex-column align-items-center">

      <div class="register-card__logo d-flex justify-content-center">
        <img src="@/assets/images/logo/logo_no_bgr.png">
      </div>

      <!-- "email":"tranducduy7520@gmail.com",
    "username":"tdd75",
    "password":"123456",
    "firstName":"Duy",
    "lastName":"Tran" -->


      <div class="register-form d-flex flex-column align-items-center">
        <el-input class="input-email" v-model="email" type="email" :prefix-icon="IconUser" autocomplete="new-password"
          :placeholder="t('auth.register.placeholder.email')" @keydown.enter="submitRegister">
        </el-input>
        <el-input class="input-username" v-model="username" type="text" :prefix-icon="IconUser"
          :placeholder="t('auth.register.placeholder.username')" @keydown.enter="submitRegister">
        </el-input>
        <el-input class="input-firstname" v-model="firstName" type="text" :prefix-icon="IconUserFilled"
          :placeholder="t('auth.register.placeholder.firstName')" @keydown.enter="submitRegister">
        </el-input>
        <el-input class="input-lastname" v-model="lastName" type="text" :prefix-icon="IconUserFilled"
          :placeholder="t('auth.register.placeholder.lastName')" @keydown.enter="submitRegister">
        </el-input>
        <el-input class="input-password" v-model="password" type="password" :prefix-icon="IconLock"
          autocomplete="new-password" :placeholder="t('auth.register.placeholder.password')"
          @keydown.enter="submitRegister">
        </el-input>
        <el-input class="input-password" v-model="repeatPassword" type="password" :prefix-icon="IconLock"
          :placeholder="t('auth.register.placeholder.repeatPassword')" @keydown.enter="submitRegister">
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
        }" class="link">
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


import { User as IconUser, UserFilled as IconUserFilled, Lock as IconLock } from '@element-plus/icons-vue';
import { PageName } from '../../../common/constants';
import { useAuthStore } from '../store';

const router = useRouter();
const store = useAuthStore();
const { t } = useI18n();
const errorMessage = ref('');

const initialValues = {
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
};

const validations = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required(),
  password: yup.string().required(),
  repeatPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
});

const { handleSubmit, errors } = useForm({
  validationSchema: validations,
  initialValues: initialValues,
});

const submitRegister = handleSubmit(async ({ email, username, password, firstName, lastName }) => {
  const error = await store.register(email!, username!, password!, firstName!, lastName!);
  if (error) {
    errorMessage.value = error;
  } else {
    router.push({
      name: PageName.LOGIN_PAGE
    })
  }
});

const { value: email } = useField('email');
const { value: username } = useField('username');
const { value: password } = useField('password');
const { value: repeatPassword } = useField('repeatPassword');
const { value: firstName } = useField('firstName');
const { value: lastName } = useField('lastName');

</script>

<style lang="scss" scoped>
.register-card {
  display: block;
  margin: 5vh auto;
  width: 550px;
  height: fit-content;

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
  margin-bottom: 20px;

  .el-input {
    width: 400px;
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

.have-account {
  .link {
    color: $color-primary;
  }
}
</style>