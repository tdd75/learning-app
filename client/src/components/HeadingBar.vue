<template>
  <div class="container-fluid">
    <div class="heading-bar container d-flex justify-content-between align-items-center">
      <div class="d-flex gap-2">
        <img class="button-exit" src="@/assets/images/icons/close.svg" @click="exit" />
        <div class="title">{{ title }}</div>
      </div>
      <router-link :to="to" class="router-link">
        <el-button class="button-test-now" type="primary">{{ buttonLabel }}</el-button>

      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { PageName } from '../common/constants';

const props = defineProps({
  buttonLabel: String,
  title: String,
  to: Object,
  pageName: {
    type: String,
    required: true
  }
});

const { t } = useI18n();
const router = useRouter();

const exit = () => {
  router.push({
    name: props.pageName,
  });
}
</script>

<style lang="scss" scoped>
.container-fluid {
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: $color-primary;
}

.title {
  font-size: 24px;
  color: $color-white;
}

.button-exit {
  cursor: pointer;
}

.button-test-now {
  padding: 18px;
  font-weight: 500;
  color: $color-primary  !important;
  @include set-background-color($color-white);
  border-radius: 8px;
  cursor: pointer;
}
</style>