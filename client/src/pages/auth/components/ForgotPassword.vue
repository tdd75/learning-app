<template>
  <el-dialog v-model="store.isShowForgotPassword" width="30%" top="25vh"
    :title="`${t('auth.forgotPasswordDialog.title')}`">
    <template #default>
      <div class="enter-email">{{ t('auth.forgotPasswordDialog.enterEmail') }}</div>
      <el-input class="input-email" v-model="email" />
      <el-dialog v-model="isShowEnterOtp" width="30%" top="30vh" :title="`${t('auth.forgotPasswordDialog.enterOtp')}`"
        append-to-body>
        <div class="d-flex d-flex flex-column align-items-center">
          <v-otp-input ref="inputOtp" class="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
            :is-input-num="true" @on-change="handleOnChange" @on-complete="handleOnComplete" />
        </div>
        <div class="button-resend-otp d-flex justify-content-end">
          <div class="d-flex align-items-center gap-2">
            <div class="count-down-timer">{{ t('auth.forgotPasswordDialog.countDown', { remain: 120 }) }}</div>
            <el-button type="primary" @click="isShowEnterOtp = true">
              {{ t('auth.forgotPasswordDialog.resendOtp') }}
            </el-button>
          </div>

        </div>
      </el-dialog>
    </template>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" class="button-cancel" @click="store.$patch({
          isShowForgotPassword: false
        })">
          {{ t('auth.forgotPasswordDialog.cancel') }}
        </el-button>
        <el-button type="primary" @click="isShowEnterOtp = true">
          {{ t('auth.forgotPasswordDialog.sendOtp') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../store';
import VOtpInput from 'vue3-otp-input';
import { setInterval } from 'timers/promises';
import { OTP_TIME_LIVE } from '../constants';

const { t } = useI18n()
const store = useAuthStore();

const isShowEnterOtp = ref(false);
const email = ref('');
const inputOtp = ref(null);
const remainTime = ref(0);

const handleOnComplete = (value: string) => {
  console.log('OTP completed: ', value);
};

const handleOnChange = (value: string) => {
  console.log('OTP changed: ', value);
};

remainTime.value = OTP_TIME_LIVE;
// let countDown = setInterval(function () {
//   remainTime.value -= 1;
//   if (remainTime.value = 0) {
//     clearInterval(this);
//   }
// }, 1000);
</script>

<style lang="scss" scoped>
.button-cancel {
  @include set-background-color($color-light-grey);
  color: $color-primary  !important;
  border: 1px solid $color-primary;
}

.enter-email {
  margin-bottom: 8px;
}

.input-code {
  width: 40%;
}

:deep(.otp-input) {
  margin-bottom: 20px;

  input {
    width: 50px;
    height: 50px;
    padding-left: 20px;
    font-size: 20px;
    border: 1px solid $color-grey-1;
    border-radius: 8px;
  }

  div+div {
    margin-left: 20px;
  }
}

.button-resend-otp {
  button {
    color: $color-dark-grey  !important;
    background-color: $color-white  !important;
    border: 2px solid $color-grey;
  }
}

.count-down-timer {
  font-weight: 500;
}
</style>