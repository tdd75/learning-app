<template>
  <div class="question-card d-flex justify-content-center">
    <div class="question">{{ t('grammarTest.question') }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style lang="scss" scoped>
.question-card {
  padding-top: 12px;
  padding-bottom: 20px;
  background-color: $color-white;
  border-radius: 4px;
}

.question {
  font-size: 14px;
  color: $color-dark-grey-1;
}
</style>