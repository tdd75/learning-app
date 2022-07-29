<template>
  <el-dialog v-model="store.isShowForgotPassword" width="30%" top="25vh" :title="t('auth.forgotPasswordDialog.title')">
    <template #default>
      <div class="enter-email">{{ t('auth.forgotPasswordDialog.enterEmail') }}</div>
      <el-input class="input-email" v-model="email" />
      <el-dialog v-model="isShowEnterOtp" width="30%" top="30vh" :title="t('auth.forgotPasswordDialog.enterOtp')"
        append-to-body>
        <div class="d-flex flex-column align-items-center">
          <v-otp-input ref="inputOtp" class="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
            :is-input-num="true" @on-complete="handleOnComplete" />
        </div>
        <div class="button-resend-otp d-flex justify-content-end">
          <div class="d-flex align-items-center gap-2">
            <div class="count-down-timer" v-show="countDown > 0">{{ t('auth.forgotPasswordDialog.countDown', {
                remain:
                  countDown
              })
            }}</div>
            <el-button type="primary" @click="sendOtp" :disabled="countDown !== 0">
              {{ t('auth.forgotPasswordDialog.resendOtp') }}
            </el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog v-model="isShowChangePassword" width="30%" top="30vh" title="Nhập mật khẩu mới" append-to-body>
        <div class="d-flex flex-column gap-3">
          <el-input v-model="newPassword" placeholder="Mật khẩu mới" type="password"></el-input>
          <el-input v-model="repeatNewPassword" placeholder="Nhập lại mật khẩu" type="password"></el-input>
          <el-button type="primary" @click="changeForgotPassword">Đổi mật khẩu</el-button>
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
        <el-button type="primary" @click="sendOtp">
          {{ t('auth.forgotPasswordDialog.sendOtp') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../store';
import VOtpInput from 'vue3-otp-input';
import { OTP_TIME_LIVE } from '../constants';
import * as yup from 'yup';
import { showErrorNotification, showSuccessNotification } from '@/common/helpers';
import { debounce } from 'lodash';


const authStore = useAuthStore();

const { t } = useI18n()
const store = useAuthStore();
const isShowEnterOtp = ref(false);
const isShowChangePassword = ref(false);

const email = ref('');
const inputOtp = ref(null);
const newPassword = ref('');
const repeatNewPassword = ref('');
let countDown = ref(OTP_TIME_LIVE);

const handleOnComplete = async (value: string) => {
  const error = await authStore.verifyOtp(value);
  if (!error) {
    isShowEnterOtp.value = false;
    isShowChangePassword.value = true;
  } else {
    showErrorNotification('Thất bại', 'Mã OTP không hợp lệ.')
  }
};

const changeForgotPassword = async () => {
  if (newPassword.value !== repeatNewPassword.value) {
    showErrorNotification('Thất bại', 'Nhập lại mật khẩu không trùng khớp.');
    return;
  }
  const error = await authStore.changeForgotPassword(newPassword.value);
  if (!error) {
    showSuccessNotification('Thành công', 'Thay đổi mật khẩu thành công.');
    isShowChangePassword.value = false;
    store.isShowForgotPassword = false;
  }
  else {
    showErrorNotification('Thất bại', 'Địa chỉ email không tại.');
  }
}

const sendOtp = async () => {
  const error = await authStore.forgotPassword(email.value);
  if (!error) {
    isShowEnterOtp.value = true;
    setTimeout(() => {
      showSuccessNotification('Yêu cầu thành công', 'Mã OTP đã được gửi đến hòm thư email của bạn.');
    }, 200);
  }
  else {
    showErrorNotification('Thất bại', 'Địa chỉ email không tại.')
  }

  countDown.value = OTP_TIME_LIVE;

  const countDownInterval = setInterval(() => {
    if (countDown.value === 0) {
      clearInterval(countDownInterval);
    } else {
      countDown.value--;
    }
  }, 1000);
}


// watch(() => isShowEnterOtp.value, (currentValue, oldValue) => {
//   if (currentValue === true) {
//   }
// }, {
//   immediate: true
// })

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

    &:disabled {
      opacity: 0.7;
    }
  }
}

.count-down-timer {
  font-weight: 500;
}
</style>