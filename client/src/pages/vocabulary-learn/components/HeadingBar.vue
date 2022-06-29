<template>
  <div class="container-fluid">
    <div class="heading-bar container d-flex justify-content-between align-items-center">
      <div class="d-flex gap-2">
        <img src="@/assets/images/icons/close.svg" @click="exit" />
        <div class="title">UNIT 01</div>
      </div>
      <el-button class="button-test-now" type="primary">{{ t('vocabularyLearn.heading.testNow') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const exit = () => {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
.container-fluid {
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: $color-primary;
}

.heading-bar {}

.title {
  font-size: 28px;
  color: $color-white;
}

.button-test-now {
  padding: 18px;
  color: $color-primary  !important;
  @include set-background-color($color-white);
  border-radius: 8px;
  cursor: pointer;
}
</style>