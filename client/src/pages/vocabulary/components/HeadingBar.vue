<template>
  <div class="heading-bar d-flex justify-content-between align-items-center">
    <div class="">
      <span class="title">{{ t('vocabulary.heading.title') }}</span>
      <span class="count-lesson">{{ t('vocabulary.heading.countLesson', { count: 62 }) }}</span>
    </div>
    <div class="learning-progress">
      <div class="bar">
        <el-progress :percentage="25" :stroke-width="10" color="#5cc046" :show-text="false" />
      </div>
      <div class="learned">{{ t('vocabulary.heading.learned', { ratio: '25 / 62' }) }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style lang="scss" scoped>
.heading-bar {
  padding: 20px 0;
  margin-bottom: 35px;
  border-bottom: 2px solid $color-grey;
}

.title {
  margin-right: 8px;
  font-size: 26px;
  font-weight: 500;
  color: $color-primary;
}

.count-lesson {
  font-size: 18px;
  font-weight: 500;
  color: $color-dark-grey;
}

.learning-progress {
  .bar {
    margin-bottom: 4px;

    .el-progress--line {
      width: 150px;
    }
  }

  .learned {
    font-size: 14px;
    color: $color-dark-grey;
  }
}
</style>