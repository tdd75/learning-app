<template>
  <router-link class="router-link" :to="{
    name: PageName.VOCABULARY_LEARN_PAGE,
    params: {
      id: lessonId
    }
  }">
    <div class="card-lesson d-flex flex-column align-items-center">
      <img class="card-lesson__image" src="@/assets/images/img/vocab1.jpg">
      <div class="card-lesson__title">
        {{ t('vocabulary.card.lesson', {
            lessonId: lessonId
          })
        }}
      </div>
      <div class="mb-2">
        <el-progress :percentage="ratioToPercentage(countLearned)" :stroke-width="14" color="#5cc046"
          :show-text="false" />
      </div>
      <div class="learned">{{ t('vocabulary.card.learned', { ratio: countLearned }) }}</div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PageName } from '../../../common/constants';
import { ratioToPercentage } from '../../../common/helpers';


const { t } = useI18n();

const props = defineProps({
  lessonId: {
    type: Number,
    required: true,
  },
  countLearned: {
    type: String,
    required: true,
  }
})

</script>

<style lang="scss" scoped>
.card-lesson {
  width: 225px;
  height: 265px;
  padding: 20px;
  background-color: $color-grey;
  border-radius: 8px;
  border: 1px solid $color-grey-1;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 8px 2px $color-grey-1;

  }

  &__image {
    width: auto;
    height: 125px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  &__title {
    margin-bottom: 8px;
    font-size: 20px;
  }

  .el-progress--line {
    width: 140px;
  }

  .learned {
    font-size: 14px;
    color: $color-dark-grey-1;
  }
}
</style>