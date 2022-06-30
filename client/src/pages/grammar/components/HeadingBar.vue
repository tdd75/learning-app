<template>
  <div class="heading-bar d-flex justify-content-between align-items-center">
    <div class="">
      <span class="title">{{ t('grammar.heading.title') }}</span>
      <span class="count-lesson">{{ t('grammar.heading.totalChapter', { totalChapter: totalChapter }) }}</span>
    </div>
    <div class="learning-progress d-flex flex-column align-items-end">
      <div class="bar">
        <el-progress :percentage="ratioToPercentage(progress)" :stroke-width="10" color="#5cc046" :show-text="false" />
      </div>
      <div class="learned">{{ t('grammar.heading.learned', { progress: progress }) }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ratioToPercentage } from '../../../common/helpers';

const { t } = useI18n();
const props = defineProps({
  totalChapter: {
    type: Number,
    required: true,
  },
  progress: {
    type: String,
    required: true
  }
})

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
      width: 140px;
    }
  }

  :deep(.el-progress-bar__outer) {
    background-color: $color-white;
  }

  .learned {
    font-size: 14px;
    color: $color-dark-grey;
  }
}
</style>